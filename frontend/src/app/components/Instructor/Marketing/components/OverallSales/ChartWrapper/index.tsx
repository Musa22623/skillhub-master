'use client';

import React, { useEffect, useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface ChartWrapperProps {
  data: import('chart.js').ChartData<'line'>;
}

const ChartWrapper: React.FC<ChartWrapperProps> = ({ data }) => {
  const isMobile = useIsMobile();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [ChartComponent, setChartComponent] = useState<React.ComponentType<any> | null>(null);

  useEffect(() => {
    // Dynamically import Chart.js and react-chartjs-2 only on client side
    const loadChart = async () => {
      try {
        // Import Chart.js first
        const ChartJS = await import('chart.js');
        
        // Register all required components
        ChartJS.Chart.register(
          ChartJS.CategoryScale,
          ChartJS.LinearScale,
          ChartJS.PointElement,
          ChartJS.LineElement,
          ChartJS.Title,
          ChartJS.Tooltip,
          ChartJS.Filler,
          ChartJS.Legend
        );
        
        // Then import the Line component from react-chartjs-2
        const { Line } = await import('react-chartjs-2');
        
        // Set the component
        setChartComponent(Line);
      } catch (error) {
        console.error("Failed to load Chart.js:", error);
      }
    };
    
    loadChart();
  }, []);

  if (!ChartComponent) {
    return <div className="h-[340px] w-full" />;
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      mode: 'index',
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'white',
        titleColor: '#142E53',
        bodyColor: '#3B6E91',
        titleFont: {
          size: 14,
          weight: 'bold',
          family: '-apple-system',
        },
        bodyFont: {
          size: 13,
          weight: 'normal',
          family: '-apple-system',
        },
        padding: {
          x: 16,
          y: 12,
        },
        borderColor: 'rgba(20, 46, 83, 0.1)',
        borderWidth: 1,
        displayColors: true,
        boxPadding: 6,
        callbacks: {
          label: (context: import('chart.js').TooltipItem<'line'>) =>
            `${context.dataset.label}: $${context.raw?.toLocaleString()}`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(59, 110, 145, 0.08)',
          drawBorder: false,
          lineWidth: 1,
        },
        border: {
          display: false,
        },
        ticks: {
          callback: (tickValue: number) =>
            `$${Number(tickValue).toLocaleString()}`,
          font: {
            size: 11,
            family: '-apple-system',
          },
          color: '#3B6E91',
          padding: 8,
        },
      },
      x: {
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
        ticks: {
          font: {
            size: 11,
            family: '-apple-system',
          },
          color: '#3B6E91',
          padding: 8,
          maxRotation: isMobile ? 0 : 50,
          autoSkip: true,
          maxTicksLimit: isMobile ? 5 : undefined,
        },
      },
    },
    elements: {
      point: {
        radius: 0,
        hoverRadius: 6,
        hitRadius: 6,
        borderWidth: 2,
        hoverBorderWidth: 2,
        backgroundColor: 'white',
      },
      line: {
        borderWidth: 2,
        tension: 0.4, // Decrease tension to make lines less curved
      },
    },
  };

  return <ChartComponent options={options} data={data} />;
};

export default ChartWrapper;