/**
 * Web Vitals collection API endpoint for production monitoring
 */

import { NextRequest, NextResponse } from 'next/server';
import { errorMonitor } from '@/utils/oss-monitoring';

interface WebVitalData {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
  url: string;
  userAgent: string;
  timestamp: number;
  libraryVersion?: string;
}

// Rate limiting (simple in-memory for serverless)
const rateLimit = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_MAX = 100; // requests per hour
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const current = rateLimit.get(ip);

  if (!current || now > current.resetTime) {
    rateLimit.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (current.count >= RATE_LIMIT_MAX) {
    return false;
  }

  current.count++;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.ip || 'unknown';
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded' },
        { status: 429 }
      );
    }

    // Validate request
    const contentType = request.headers.get('content-type');
    if (!contentType?.includes('application/json')) {
      return NextResponse.json(
        { error: 'Content-Type must be application/json' },
        { status: 400 }
      );
    }

    const data: WebVitalData = await request.json();

    // Validate required fields
    const requiredFields = ['name', 'value', 'id', 'url'];
    for (const field of requiredFields) {
      if (!(field in data)) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Validate Web Vital names
    const validMetrics = ['CLS', 'FID', 'FCP', 'LCP', 'TTFB', 'INP'];
    if (!validMetrics.includes(data.name)) {
      return NextResponse.json(
        { error: 'Invalid metric name' },
        { status: 400 }
      );
    }

    // Process the metric
    console.log(`[Web Vitals] ${data.name}: ${data.value} (${data.rating})`);

    // In production, you might want to send this to:
    // - Google Analytics
    // - DataDog
    // - Custom analytics service
    // - Database for historical analysis

    // For now, we'll just log poor performance
    if (data.rating === 'poor') {
      errorMonitor.captureError(
        new Error(`Poor ${data.name} performance: ${data.value}`),
        {
          component: 'web-vitals',
          metric: data.name,
          value: data.value,
          url: data.url,
        }
      );
    }

    return NextResponse.json(
      { success: true, processed: data.name },
      { status: 200 }
    );

  } catch (error) {
    console.error('Web Vitals API error:', error);

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Handle preflight requests
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
