"use client"

import { useEffect, useState } from "react"
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  Filler,
} from "chart.js"
import Badge from "@/app/components/ui/badge"
import SalesChart from "./OverallSalesAreaChart"
import { ChevronDown, ChevronUp } from "lucide-react"
import {useIsMobile} from '@/hooks/use-mobile';

ChartJS.register(LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale, Filler)

const getLast30Days = (): string[] => {
  const dates: string[] = []
  for (let i = 30; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    dates.push(date.toLocaleDateString("en-US", { month: "short", day: "numeric" }))
  }
  return dates
}

const generateRandomData = (min: number, max: number, count: number): number[] => {
  return Array.from({ length: count }, () => Math.floor(Math.random() * (max - min + 1)) + min)
}

const OverallSales = () => {
  const [chartData, setChartData] = useState<ChartData | null>(null)
  const [isExpanded, setIsExpanded] = useState(true)
  const isMobile = useIsMobile();

  useEffect(() => {
    const labels = getLast30Days()

    const coursesData = generateRandomData(10000, 25000, 31)
    const eventsData = generateRandomData(8000, 20000, 31)
    const communitiesData = generateRandomData(5000, 15000, 31)
    const certificatesData = generateRandomData(3000, 12000, 31)

    setChartData({
      labels,
      datasets: [
        {
          label: "Courses",
          data: coursesData,
          borderColor: "#13C4CC",
          backgroundColor: "rgba(19, 196, 204, 0.1)",
          borderWidth: 2,
          fill: true,
          cubicInterpolationMode: "monotone",
        },
        {
          label: "Events",
          data: eventsData,
          borderColor: "#02C5AF",
          backgroundColor: "rgba(2, 197, 175, 0.1)",
          borderWidth: 2,
          fill: true,
          cubicInterpolationMode: "monotone",
        },
        {
          label: "Communities",
          data: communitiesData,
          borderColor: "#009ECB",
          backgroundColor: "rgba(0, 158, 203, 0.1)",
          borderWidth: 2,
          fill: true,
          cubicInterpolationMode: "monotone",
        },
        {
          label: "Certificates",
          data: certificatesData,
          borderColor: "#3B6E91",
          backgroundColor: "rgba(59, 110, 145, 0.1)",
          borderWidth: 2,
          fill: true,
          cubicInterpolationMode: "monotone",
        },
      ],
    })
  }, [])

  interface ChartDataset {
    label: string
    data: number[]
    borderColor: string
    backgroundColor: string
    borderWidth: number
    cubicInterpolationMode: "monotone" | "default" | undefined
    fill: boolean
  }

  interface ChartData {
    labels: string[]
    datasets: ChartDataset[]
  }

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div className="bg-white rounded-[8px] overflow-hidden border border-[#e5e7eb] p-2 xs:p-6 min-md:mr-1">
      <div className="font-semibold text-[16px] flex justify-between items-center max-xs:pb-2">
        <div className="flex-1">
          <div className="text-sm text-[#262b3d] mb-2">EMAIL ANALYTICS</div>
          <div className="text-[28px] max-xs:text-2xl font-bold text-[#142e53] flex items-center gap-[12px]">
            $83,125
            <Badge color="success">+7.5%</Badge>
          </div>
        </div>
		<button
		  onClick={toggleExpand}
		  className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-[10px] cursor-pointer"
		  aria-label={isExpanded ? "Collapse" : "Expand"}
		>
		  {isMobile ? (
			isExpanded ? (
			  <ChevronUp className="text-[#000]" size={24} />
			) : (
			  <ChevronDown className="text-[#000]" size={24} />
			)
		  ) : (
			<svg fill="none" viewBox="0 0 32 32" width="24" height="24">
			  <path
			fill="#13c4cc"
			d="M9.33341 6.33333C8.89139 6.33333 8.46746 6.50892 8.1549 6.82148C7.84234 7.13404 7.66675 7.55797 7.66675 7.99999V20.734C8.17815 20.473 8.74858 20.3333 9.33341 20.3333H18C18.5523 20.3333 19 20.781 19 21.3333C19 21.8856 18.5523 22.3333 18 22.3333H9.33341C8.89139 22.3333 8.46746 22.5089 8.1549 22.8215C7.84234 23.134 7.66675 23.558 7.66675 24C7.66675 24.442 7.84234 24.8659 8.1549 25.1785C8.46746 25.4911 8.89139 25.6667 9.33341 25.6667H18C18.5523 25.6667 19 26.1144 19 26.6667C19 27.2189 18.5523 27.6667 18 27.6667H9.33341C8.36095 27.6667 7.42832 27.2804 6.74069 26.5927C6.05306 25.9051 5.66675 24.9725 5.66675 24V7.99999C5.66675 7.02753 6.05306 6.0949 6.74069 5.40727C7.42832 4.71964 8.36095 4.33333 9.33341 4.33333H25.3334C25.8857 4.33333 26.3334 4.78104 26.3334 5.33333V12.9998C26.3334 13.5521 25.8857 13.9998 25.3334 13.9998C24.7811 13.9998 24.3334 13.5521 24.3334 12.9998V6.33333H9.33341ZM11.0001 10.6667C11.0001 10.1144 11.4478 9.66666 12.0001 9.66666H20.0001C20.5524 9.66666 21.0001 10.1144 21.0001 10.6667C21.0001 11.2189 20.5524 11.6667 20.0001 11.6667H12.0001C11.4478 11.6667 11.0001 11.2189 11.0001 10.6667Z"
			clipRule="evenodd"
			fillRule="evenodd"
			  ></path>
			  <path
			fill="#13c4cc"
			d="M25.3334 16C25.8857 16 26.3334 16.4477 26.3334 17V17.3333H28.0001C28.5524 17.3333 29.0001 17.781 29.0001 18.3333C29.0001 18.8856 28.5524 19.3333 28.0001 19.3333H24.6667C24.4015 19.3333 24.1472 19.4387 23.9596 19.6262C23.7721 19.8138 23.6667 20.0681 23.6667 20.3333C23.6667 20.5985 23.7721 20.8529 23.9596 21.0404C24.1472 21.228 24.4015 21.3333 24.6667 21.3333H26.0001C26.7957 21.3333 27.5588 21.6494 28.1214 22.212C28.684 22.7746 29.0001 23.5377 29.0001 24.3333C29.0001 25.129 28.684 25.892 28.1214 26.4547C27.6379 26.9381 27.0064 27.2395 26.3334 27.3148V27.6667C26.3334 28.219 25.8857 28.6667 25.3334 28.6667C24.7811 28.6667 24.3334 28.219 24.3334 27.6667V27.3333H22.6667C22.1145 27.3333 21.6667 26.8856 21.6667 26.3333C21.6667 25.781 22.1145 25.3333 22.6667 25.3333H26.0001C26.2653 25.3333 26.5196 25.228 26.7072 25.0404C26.8947 24.8529 27.0001 24.5985 27.0001 24.3333C27.0001 24.0681 26.8947 23.8138 26.7072 23.6262C26.5196 23.4387 26.2653 23.3333 26.0001 23.3333H24.6667C23.8711 23.3333 23.108 23.0173 22.5454 22.4547C21.9828 21.892 21.6667 21.129 21.6667 20.3333C21.6667 19.5377 21.9828 18.7746 22.5454 18.212C23.0289 17.7285 23.6604 17.4271 24.3334 17.3519V17C24.3334 16.4477 24.7811 16 25.3334 16Z"
			clipRule="evenodd"
			fillRule="evenodd"
			  ></path>
			</svg>
		  )}
		</button>
      </div>
      {isExpanded && (
        <div>
          <div className="flex flex-wrap max-xs:gap-2 gap-6 mb-5 justify-start xs:justify-end max-xs:px-1 px-3 pb-1 pt-3 w-full">
            <div className="flex items-center gap-2 max-xs:text-xs text-sm text-[#3b6e91] font-semibold">
              <div className="w-[10px] h-[10px] rounded-[50%] bg-[#13c4cc]"></div>
              Sends
            </div>
            <div className="flex items-center gap-2 max-xs:text-xs text-sm text-[#3b6e91] font-semibold">
              <div className="w-[10px] h-[10px] rounded-[50%] bg-[#02c5af]"></div>
              Opens
            </div>
            <div className="flex items-center gap-2 max-xs:text-xs text-sm text-[#3b6e91] font-semibold">
              <div className="w-[10px] h-[10px] rounded-[50%] bg-[#009ecb]"></div>
              CTR
            </div>
            <div className="flex items-center gap-2 max-xs:text-xs text-sm text-[#3b6e91] font-semibold">
              <div className="w-[10px] h-[10px] rounded-[50%] bg-[#3b6e91]"></div>
              Unsubscribes
            </div>
          </div>
          <div className="max-xs:w-full max-xs:h-full">
            <div className="chart-container relative h-[340px] mt-5">
              {chartData && <SalesChart data={chartData} />}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default OverallSales
