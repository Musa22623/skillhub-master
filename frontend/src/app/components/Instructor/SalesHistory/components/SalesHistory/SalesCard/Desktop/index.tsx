"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import {
  CertificateSvgN,
  CommunitySvg1,
  RightSvg,
  WrongSvg,
  CourseIcon,
  BundleSvg,
  EventSvg,
  SubscriptionSvg,
  CertificateSvgPre,
} from "@/app/components/svg"
import Popup from "./Popup"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface SalesCardProps {
  time: string
  total_amount: number
  transactions: number
  rows: Array<{
    type: string[]
    image: string
    title: string
    amount: number
    status: "Completed" | "Refunded"
    payout: "Rejected" | "Paid" | "Requested" | "Not Eligible" | "Pending"
  }>
}

const SalesCard: React.FC<SalesCardProps> = ({ time, total_amount, transactions, rows }) => {
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, ] = useState(5)

  // Popup state
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  interface Transaction {
    id: string
    transactionId: string
    date: string
    amount: string
    type: string
    description: string
    status: string
    maturationDate: string
     index:number
     item:string
  }

  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)

  // Status badge mappings
  const statusClassMap: Record<string, string> = {
    Completed: "bg-green-100 text-green-800",
    Refunded: "bg-red-100 text-red-800",
  }

  // Payout status mappings
  const payoutClassMap: Record<string, string> = {
    Rejected: "bg-red-100 text-red-600",
    Paid: "bg-emerald-100 text-emerald-700",
    Requested: "bg-amber-100 text-amber-700",
    "Not Eligible": "bg-red-100 text-red-800",
    Pending: "bg-purple-100 text-purple-700",
  }

  // Product type SVG mappings
  const svgMap: Record<string, React.ReactNode> = {
    Bundle: <BundleSvg fill="currentColor" className="w-4 h-4" />,
    "Premium Certificate": <CertificateSvgPre fill="currentColor" className="w-4 h-4" />,
    Certificate: <CertificateSvgN fill="currentColor" className="w-4 h-4" />,
    Community: <CommunitySvg1 fill="currentColor" className="w-4 h-4" />,
    Course: <CourseIcon fill="fill-blue-500" className="w-4 h-4" />,
    Event: <EventSvg fill="currentColor" className="w-4 h-4" />,
    Subscription: <SubscriptionSvg fill="currentColor" className="w-4 h-4" />,
  }

  // Product type background and text color mappings
  const typeClassMap: Record<string, string> = {
    Bundle: "bg-purple-100 text-purple-800",
    "Premium Certificate": "bg-pink-100 text-pink-800",
    Certificate: "bg-emerald-100 text-emerald-700",
    Community: "bg-amber-100 text-amber-700",
    Course: "bg-blue-100 text-blue-800",
    Event: "bg-red-100 text-red-800",
    Subscription: "bg-teal-50 text-teal-700",
  }

  // const transactionspopup = [
  //   {
  //     id: "60fa9afd0436534ae177b072",
  //     transactionId: "58fa9aeee1d2c2743072",
  //     date: "Today",
  //     amount: "Panding",
  //     type: "Visa",
  //     description: "Regular Billing Subscription",
  //     status: "Completed",
  //     maturationDate: "Jan 15, 2025",
  //     index:1,
  //   },
  //   {
  //     id: "72fb8bed0436534ae177c083",
  //     transactionId: "67fb8ceee1d2c2743083",
  //     date: "Yesterday",
  //     amount: "$1,247.00",
  //     type: "Credit",
  //     description: "Full Year Development Bundle",
  //     status: "Completed",
  //     maturationDate: "Jan 15, 2025",
  //     index:2,
  //   },
  //   {
  //     id: "83gc9cfe0436534ae177d094",
  //     transactionId: "78gc9deee1d2c2743094",
  //     date: "Four Days",
  //     amount: "$3,728.50",
  //     type: "Transfer",
  //     description: "Enterprise Subscription",
  //     status: "Pending",
  //     maturationDate: "May 20, 2025",
  //     index:3,
  //   },
  //   {
  //     id: "83gc9cfe0436534ae177d094",
  //     transactionId: "78gc9deee1d2c2743094",
  //     date: "Four Days",
  //     amount: "$3,728.50",
  //     type: "Transfer",
  //     description: "Enterprise Subscription",
  //     status: "Pending",
  //     maturationDate: "May 20, 2025",
  //     index:4,
  //   },
  //   {
  //     id: "83gc9cfe0436534ae177d094",
  //     transactionId: "78gc9deee1d2c2743094",
  //     date: "Four Days",
  //     amount: "$3,728.50",
  //     type: "Transfer",
  //     description: "Enterprise Subscription",
  //     status: "Pending",
  //     maturationDate: "May 20, 2025",
  //     index:5,
  //   },
  //   {
  //     id: "83gc9cfe0436534ae177d094",
  //     transactionId: "78gc9deee1d2c2743094",
  //     date: "Four Days",
  //     amount: "$3,728.50",
  //     type: "Transfer",
  //     description: "Enterprise Subscription",
  //     status: "Pending",
  //     maturationDate: "May 20, 2025",
  //     index:6,
  //   },
  //   {
  //     id: "83gc9cfe0436534ae177d094",
  //     transactionId: "78gc9deee1d2c2743094",
  //     date: "Four Days",
  //     amount: "$3,728.50",
  //     type: "Transfer",
  //     description: "Enterprise Subscription",
  //     status: "Pending",
  //     maturationDate: "May 20, 2025",
  //     index:7,
  //   },
  //   {
  //     id: "83gc9cfe0436534ae177d094",
  //     transactionId: "78gc9deee1d2c2743094",
  //     date: "Four Days",
  //     amount: "$3,728.50",
  //     type: "Transfer",
  //     description: "Enterprise Subscription",
  //     status: "Pending",
  //     maturationDate: "May 20, 2025",
  //     index:8,
  //   },
  // ]

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = rows.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(rows.length / itemsPerPage)

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  // Handle opening popup
  const handleOpenPopup = (index: number, item: string) => {
    // Map the row data to match the popup data structure
    // For demo purposes, we'll use the transactionspopup data
    // In a real app, you'd map the actual row data to the popup format
    const transactionspopup = [
    {
      id: "60fa9afd0436534ae177b072",
      transactionId: "58fa9aeee1d2c2743072",
      date: "Today",
      amount: "Panding",
      type: "Visa",
      description: "Regular Billing Subscription",
      status: "Completed",
      maturationDate: "Jan 15, 2025",
      index:index,
      item:item,
    }
  ]
    setSelectedTransaction(transactionspopup[0])
    setIsPopupOpen(true)
  }

  return (
    <>
      <div className="flex items-center justify-between bg-gray-100 p-3 rounded-lg mt-6 gap-4">
        <span className="font-semibold text-slate-800 text-sm">{time}</span>
        <span className="font-semibold text-slate-900">${total_amount.toFixed(2)}</span>
        <span className="text-gray-500 text-sm">{transactions} transactions</span>
      </div>

      <table className="w-full border-separate border-spacing-0 mt-2">
        <tbody>
          {currentItems.map((row, index) => (
            <tr
              key={index}
              data-transaction-id={`transaction-${index}`}
              className="border border-gray-200 shadow-sm rounded-lg relative cursor-pointer transition-all duration-200 hover:translate-y-[-2px] hover:shadow-md"
            >
              <td className="p-4" style={{ width: "530px" }}>
                <div className="flex items-start gap-4">
                  <Image
                    src={row.image || "/placeholder.svg"}
                    alt={row.title}
                    className="rounded-lg object-cover"
                    width={60}
                    height={48}
                  />
                  <div className="flex flex-col gap-2 max-w-full">
                    <div className="flex flex-wrap gap-2">
                      {row.type.map((item, typeIndex) => (
                        <div
                          key={typeIndex}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${typeClassMap[item] || "bg-gray-100 text-gray-800"}`}
                          onClick={() => handleOpenPopup(index, item)}
                        >
                          {svgMap[item] || null}
                          {item}
                        </div>
                      ))}
                    </div>
                    <span
                      className="font-semibold text-slate-800 text-sm block w-full"
                    
                    >
                      {row.title}
                    </span>
                  </div>
                </div>
              </td>
              <td className="p-4">
                <div className="text-gray-500 text-xs font-semibold mb-1">Amount</div>
                <div className={`font-semibold ${row.amount < 0 ? "" : "text-black"}`}>
                  {row.amount < 0 ? `-$${Math.abs(row.amount).toFixed(2)}` : `$${row.amount.toFixed(2)}`}
                </div>
              </td>
              <td className="p-4">
                <div className="text-gray-500 text-xs font-semibold mb-1">Status</div>
                <div
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap ${statusClassMap[row.status]}`}
                >
                  {row.status === "Completed" ? (
                    <span className="w-5 h-5 flex items-center justify-center rounded-full bg-green-200">
                      <RightSvg className="" fill="none" />
                    </span>
                  ) : (
                    <span className="w-5 h-5 flex items-center justify-center rounded-full bg-red-200">
                      <WrongSvg className="" fill="none" />
                    </span>
                  )}
                  {row.status}
                </div>
              </td>
              <td className="p-4">
                <div className="text-gray-500 text-xs font-semibold mb-1">Payout</div>
                <div
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${payoutClassMap[row.payout] || "bg-gray-100 text-gray-800"}`}
                >
                  {row.payout.toUpperCase()}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4 px-2">
          <div className="text-sm text-gray-500">
            Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, rows.length)} of {rows.length} items
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-2 rounded-md ${currentPage === 1 ? "text-gray-300 cursor-not-allowed" : "text-gray-700 hover:bg-gray-100"}`}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 rounded-md ${
                  currentPage === page ? "bg-blue-100 text-blue-700 font-medium" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-md ${currentPage === totalPages ? "text-gray-300 cursor-not-allowed" : "text-gray-700 hover:bg-gray-100"}`}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      {/* Transaction Details Popup */}
      {isPopupOpen && selectedTransaction && (
        <Popup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} transaction={selectedTransaction} />
      )}
    </>
  )
}

export default SalesCard
