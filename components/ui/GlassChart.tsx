'use client';

import React from 'react';
import GlassEffect, { GlassEffectProps } from './GlassEffect';
import { cn } from '@/lib/utils';

export interface ChartDataPoint {
  label: string;
  value: number;
  color?: string;
}

export interface GlassChartProps
  extends Omit<GlassEffectProps, 'variant' | 'as'> {
  data: ChartDataPoint[];
  type?: 'bar' | 'line' | 'pie' | 'donut';
  title?: string;
  width?: number;
  height?: number;
  showLegend?: boolean;
  showGrid?: boolean;
  animated?: boolean;
  className?: string;
}

const GlassChart: React.FC<GlassChartProps> = ({
  data,
  type = 'bar',
  title,
  width = 400,
  height = 300,
  showLegend = true,
  showGrid = true,
  animated = true,
  className,
  ...props
}) => {
  const maxValue = Math.max(...data.map(d => d.value));
  const colors = [
    '#3B82F6',
    '#10B981',
    '#F59E0B',
    '#EF4444',
    '#8B5CF6',
    '#F97316',
  ];

  const getBarChart = () => {
    const barWidth = (width - 80) / data.length;
    const chartHeight = height - 100;

    return (
      <svg width={width} height={height} className='text-white'>
        {/* Grid lines */}
        {showGrid && (
          <g className='opacity-30'>
            {[0, 0.25, 0.5, 0.75, 1].map((ratio, index) => (
              <line
                key={index}
                x1={40}
                y1={50 + chartHeight * ratio}
                x2={width - 40}
                y2={50 + chartHeight * ratio}
                stroke='currentColor'
                strokeWidth='1'
                strokeDasharray='2,2'
              />
            ))}
          </g>
        )}

        {/* Bars */}
        {data.map((item, index) => {
          const barHeight = (item.value / maxValue) * chartHeight;
          const x = 40 + index * barWidth + barWidth * 0.1;
          const y = 50 + chartHeight - barHeight;
          const color = item.color || colors[index % colors.length];

          return (
            <g key={index}>
              <rect
                x={x}
                y={y}
                width={barWidth * 0.8}
                height={barHeight}
                fill={color}
                className={cn('opacity-80', animated && 'animate-pulse')}
                rx='4'
              />
              <text
                x={x + (barWidth * 0.8) / 2}
                y={height - 30}
                textAnchor='middle'
                fontSize='12'
                fill='currentColor'
                className='opacity-70'
              >
                {item.label}
              </text>
            </g>
          );
        })}

        {/* Y-axis labels */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio, index) => (
          <text
            key={index}
            x={35}
            y={55 + chartHeight * ratio}
            textAnchor='end'
            fontSize='10'
            fill='currentColor'
            className='opacity-70'
          >
            {Math.round(maxValue * (1 - ratio))}
          </text>
        ))}
      </svg>
    );
  };

  const getLineChart = () => {
    const pointWidth = (width - 80) / (data.length - 1);
    const chartHeight = height - 100;

    const points = data.map((item, index) => ({
      x: 40 + index * pointWidth,
      y: 50 + chartHeight - (item.value / maxValue) * chartHeight,
    }));

    const pathData = points.reduce((acc, point, index) => {
      const command = index === 0 ? 'M' : 'L';
      return `${acc} ${command} ${point.x} ${point.y}`;
    }, '');

    return (
      <svg width={width} height={height} className='text-white'>
        {/* Grid lines */}
        {showGrid && (
          <g className='opacity-30'>
            {[0, 0.25, 0.5, 0.75, 1].map((ratio, index) => (
              <line
                key={index}
                x1={40}
                y1={50 + chartHeight * ratio}
                x2={width - 40}
                y2={50 + chartHeight * ratio}
                stroke='currentColor'
                strokeWidth='1'
                strokeDasharray='2,2'
              />
            ))}
          </g>
        )}

        {/* Line */}
        <path
          d={pathData}
          stroke='#3B82F6'
          strokeWidth='2'
          fill='none'
          className={cn('opacity-80', animated && 'animate-pulse')}
        />

        {/* Points */}
        {points.map((point, index) => (
          <circle
            key={index}
            cx={point.x}
            cy={point.y}
            r='4'
            fill='#3B82F6'
            className='opacity-80'
          />
        ))}

        {/* Labels */}
        {data.map((item, index) => (
          <text
            key={index}
            x={points[index]?.x}
            y={height - 30}
            textAnchor='middle'
            fontSize='12'
            fill='currentColor'
            className='opacity-70'
          >
            {item.label}
          </text>
        ))}
      </svg>
    );
  };

  const getPieChart = () => {
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 2 - 40;
    const total = data.reduce((sum, item) => sum + item.value, 0);

    let currentAngle = -Math.PI / 2;

    return (
      <svg width={width} height={height} className='text-white'>
        {data.map((item, index) => {
          const angle = (item.value / total) * 2 * Math.PI;
          const x1 = centerX + radius * Math.cos(currentAngle);
          const y1 = centerY + radius * Math.sin(currentAngle);
          const x2 = centerX + radius * Math.cos(currentAngle + angle);
          const y2 = centerY + radius * Math.sin(currentAngle + angle);

          const largeArcFlag = angle > Math.PI ? 1 : 0;
          const color = item.color || colors[index % colors.length];

          const pathData = [
            `M ${centerX} ${centerY}`,
            `L ${x1} ${y1}`,
            `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
            'Z',
          ].join(' ');

          currentAngle += angle;

          return (
            <path
              key={index}
              d={pathData}
              fill={color}
              className={cn('opacity-80', animated && 'animate-pulse')}
            />
          );
        })}
      </svg>
    );
  };

  const renderChart = () => {
    switch (type) {
      case 'bar':
        return getBarChart();
      case 'line':
        return getLineChart();
      case 'pie':
      case 'donut':
        return getPieChart();
      default:
        return getBarChart();
    }
  };

  const renderLegend = () => {
    if (!showLegend) {
      return null;
    }

    return (
      <div className='mt-4 flex flex-wrap gap-4'>
        {data.map((item, index) => (
          <div key={index} className='flex items-center space-x-2'>
            <div
              className='w-3 h-3 rounded-full'
              style={{
                backgroundColor: item.color || colors[index % colors.length],
              }}
            />
            <span className='text-sm text-white/90'>{item.label}</span>
          </div>
        ))}
      </div>
    );
  };

  const baseClasses = cn('p-6 rounded-lg', 'backdrop-blur-xl', className);

  return (
    <GlassEffect variant='card' className={baseClasses} {...props}>
      {title && (
        <h3 className='text-lg font-semibold text-white mb-4'>{title}</h3>
      )}

      <div className='flex justify-center'>{renderChart()}</div>

      {renderLegend()}
    </GlassEffect>
  );
};

export default GlassChart;
