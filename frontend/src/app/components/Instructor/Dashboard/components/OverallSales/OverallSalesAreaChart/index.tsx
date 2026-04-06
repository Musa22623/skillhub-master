'use client';

import { useEffect, useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Filler,
	Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Filler,
	Legend
);

interface SalesChartProps {
	data: import('chart.js').ChartData<'line'>;
}
// { data }: SalesChartProps

export default function SalesChart({ data }: SalesChartProps) {
	const isMobile = useIsMobile();
	const [mounted, setMounted] = useState(false);
	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}

	const options = {
		responsive: true,
		maintainAspectRatio: false,
		interaction: {
			intersect: false,
			mode: 'index' as const,
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
					weight: 'bold' as const,
					family: '-apple-system',
				},
				bodyFont: {
					size: 13,
					weight: 'normal' as const,
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
					callback: (tickValue: string | number) =>
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
			},
		},
	};

	return <Line options={options} data={data} />;
}