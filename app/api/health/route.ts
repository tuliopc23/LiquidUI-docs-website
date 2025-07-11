/**
 * Health check API route for production monitoring
 */

import { NextRequest, NextResponse } from 'next/server';

interface HealthCheckResponse {
  status: 'healthy' | 'unhealthy';
  timestamp: string;
  version: string;
  uptime: number;
  environment: string;
  services: {
    database: 'healthy' | 'unhealthy';
    external_apis: 'healthy' | 'unhealthy';
    npm_registry: 'healthy' | 'unhealthy';
  };
  performance: {
    memory_usage: number;
    cpu_usage: number;
  };
}

export async function GET(request: NextRequest) {
  const startTime = Date.now();

  try {
    // Check external services
    const [npmCheck] = await Promise.allSettled([
      fetch('https://registry.npmjs.org/liquidify', {
        method: 'HEAD',
        signal: AbortSignal.timeout(5000)
      }),
    ]);

    // Memory usage check
    const memoryUsage = process.memoryUsage();
    const memoryUsageMB = memoryUsage.heapUsed / 1024 / 1024;

    const healthData: HealthCheckResponse = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: process.env.NEXT_PUBLIC_APP_VERSION || '2.0.0',
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      services: {
        database: 'healthy', // Not applicable for static docs
        external_apis: 'healthy',
        npm_registry: npmCheck.status === 'fulfilled' && npmCheck.value.ok ? 'healthy' : 'unhealthy',
      },
      performance: {
        memory_usage: Math.round(memoryUsageMB),
        cpu_usage: 0, // Simplified for serverless
      },
    };

    // Determine overall health
    const hasUnhealthyServices = Object.values(healthData.services).includes('unhealthy');
    const isHighMemoryUsage = memoryUsageMB > 512; // 512MB threshold

    if (hasUnhealthyServices || isHighMemoryUsage) {
      healthData.status = 'unhealthy';
    }

    const responseTime = Date.now() - startTime;

    return NextResponse.json(
      { ...healthData, response_time_ms: responseTime },
      {
        status: healthData.status === 'healthy' ? 200 : 503,
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate',
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Health check failed:', error);

    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: 'Health check failed',
        response_time_ms: Date.now() - startTime,
      },
      {
        status: 503,
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate',
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
