"use client"
import { useIsMobile } from "@/hooks/use-mobile"
import type React from "react"

import PaginationMenu from "../PaginationMenu"
import { useState } from "react"
import { Plus, X } from "lucide-react"
import {showNotification} from "@/app/components/ui/notification"
import Notification from "@/app/components/ui/notification"

// Define TypeScript interfaces for our data
interface PayoutEntry {
  id: string
  amount: number
  type: "payout" | "request"
  status: "paid" | "pending" | "rejected"
  unpaidAmount: number
  paidAmount: number
  date: string
}

// Define pagination state interface
interface PaginationState {
  currentPage: number
  itemsPerPage: number
  totalItems: number
}

const PayoutHistory = () => {
  const isMobile = useIsMobile()
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [requestAmount, setRequestAmount] = useState<number | "">("")
  const [amountError, setAmountError] = useState("")

  // Pagination state
  const [pagination, setPagination] = useState<PaginationState>({
    currentPage: 1,
    itemsPerPage: 8,
    totalItems: 120,
  })

  // Sample data - in a real app, this would come from an API
  const [payoutData, setPayoutData] = useState<PayoutEntry[]>([
    {
      id: "PO-2024-001",
      amount: 2450.0,
      type: "payout",
      status: "paid",
      unpaidAmount: 0,
      paidAmount: 2450.0,
      date: "2024-04-15",
    },
    {
      id: "PO-2024-002",
      amount: 1850.0,
      type: "request",
      status: "pending",
      unpaidAmount: 1850.0,
      paidAmount: 0,
      date: "2024-04-10",
    },
  ])

  // Available balance for withdrawal
  const availableBalance = 750.0
  const totalBalance = 1250.0

  const openBottomSheet = () => {
    setIsBottomSheetOpen(true)
  }

  const closeBottomSheet = () => {
    setIsBottomSheetOpen(false)
  }

  const handlePageChange = (page: number) => {
    setPagination((prev) => ({
      ...prev,
      currentPage: page,
    }))

    // In a real app, you would fetch data for the new page here
    // fetchPayoutData(page, pagination.itemsPerPage)
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === "" ? "" : Number(e.target.value);
    setRequestAmount(value);
    
    if (typeof value === "number") {
      if (value > availableBalance) {
        setAmountError(`Amount cannot exceed available balance of $${availableBalance.toFixed(2)}`);
      } else if (value <= 0) {
        setAmountError("Amount must be greater than 0");
      } else {
        setAmountError("");
      }
    } else {
      setAmountError("");
    }
  };

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (typeof requestAmount === "number" && requestAmount > availableBalance) {
      setAmountError(`Amount cannot exceed available balance of $${availableBalance.toFixed(2)}`);
      return;
    }
    
    showNotification('Processing your request...', 'info');
     
    setTimeout(() => {
    if (
      typeof requestAmount === 'number' &&
      requestAmount > 0 &&
      requestAmount <= availableBalance
    ) {
      // In a real app, you would submit this to an API
      console.log(`Submitting payout request for $${requestAmount}`);

      // Add the new request to our data
      const newRequest: PayoutEntry = {
        id: `PO-2024-${payoutData.length + 1}`.padStart(11, '0'),
        amount: requestAmount,
        type: 'request',
        status: 'pending',
        unpaidAmount: requestAmount,
        paidAmount: 0,
        date: new Date().toISOString().split('T')[0],
      };

      setPayoutData([newRequest, ...payoutData]);
      setRequestAmount('');

      // Close modals
      setIsBottomSheetOpen(false);
      setIsDialogOpen(false);

      // Show success notification after 3 seconds
      showNotification(
        `Payout request for $${requestAmount.toFixed(2)} has been submitted successfully`,
        'success'
      );
    }
  }, 2000); 
    
  }

  // Calculate pagination values
  const startItem = (pagination.currentPage - 1) * pagination.itemsPerPage + 1
  const endItem = Math.min(startItem + pagination.itemsPerPage - 1, pagination.totalItems)

  return (
    <>
    
      {isMobile ? (
        <div className="mb-20 overflow-hidden rounded-2xl bg-white ">
          <div className="border-b border-gray-200 p-4">
            <h2 className="mb-3 text-lg font-semibold text-[#262B3D]">Payout History</h2>
            <button
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#02C5AF] px-3 py-3 text-sm font-semibold text-white transition hover:bg-[#009ECB]"
              onClick={openBottomSheet}
            >
              <Plus className="h-5 w-5" />
              Request Payout
            </button>
          </div>

          {/* Payout Entries - Map through data */}
          {payoutData.map((entry) => (
            <div key={entry.id} className="border-b border-gray-200 p-4">
              <div className="flex gap-4">
                <div
                  className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg ${
                    entry.type === "payout" ? "bg-[#E5FEF0] text-[#12B76A]" : "bg-[#FEF3C7] text-[#B45309]/60"
                  }`}
                >
                  {entry.type === "payout" ? (
                    <svg width="20" height="20" viewBox="0 0 256 256" fill="currentColor">
                      <path d="M149.61,85.71l-89.6,88a8,8,0,0,1-11.22,0L10.39,136a8,8,0,1,1,11.22-11.41L54.4,156.79l84-82.5a8,8,0,1,1,11.22,11.42Zm96.1-11.32a8,8,0,0,0-11.32-.1l-84,82.5-18.83-18.5a8,8,0,0,0-11.21,11.42l24.43,24a8,8,0,0,0,11.22,0l89.6-88A8,8,0,0,0,245.71,74.39Z"></path>
                    </svg>
                  ) : (
                    <Plus className="h-5 w-5 border-2 rounded-full border-[#B45309]/60" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="mb-2 flex items-start justify-between gap-2">
                    <span className="text-sm font-semibold text-gray-900">#{entry.id}</span>
                    <span className="text-sm font-semibold text-gray-900">${entry.amount.toFixed(2)}</span>
                  </div>
                  <div className="mb-2 flex items-center justify-between">
                    <div
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                        entry.type === "payout" ? "bg-[#E5FEF0] text-[#12B76A]" : "bg-[#FEF3C7] text-[#B45309]"
                      }`}
                    >
                      {entry.type === "payout" ? "Payout" : "Request"}
                    </div>
                    <div
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                        entry.status === "paid"
                          ? "bg-[#E5FEF0] text-[#12B76A]"
                          : entry.status === "pending"
                            ? "bg-[#F3E8FF] text-[#7E22CE]"
                            : "bg-[#FEE2E2] text-[#B91C1C]"
                      }`}
                    >
                      {entry.status.toUpperCase()}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="flex flex-col gap-1">
                      <span className="text-xs text-gray-500">Status</span>
                      <span className="text-xs font-semibold text-gray-900">
                        {entry.status === "paid" ? "Completed" : entry.status === "pending" ? "Pending" : "Rejected"}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-xs text-gray-500">Unpaid</span>
                      <span className="text-xs font-semibold text-gray-900">${entry.unpaidAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-xs text-gray-500">Paid</span>
                      <span className="text-xs font-semibold text-gray-900">${entry.paidAmount.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Bottom Sheet Modal */}
          <div
            className={`fixed inset-x-0 bottom-0 z-50 max-h-[90vh] w-full transform overflow-auto rounded-t-[20px] bg-white transition-transform duration-300 ease-in-out ${
              isBottomSheetOpen ? "translate-y-0" : "translate-y-full"
            }`}
          >
            <div className="sticky top-0 z-10 border-b border-gray-200 bg-white p-4">
              <h3 className="text-center text-base font-semibold text-[#262B3D]">Request Payout</h3>
              <button className="absolute right-4 top-1/2 -translate-y-1/2 p-2" onClick={closeBottomSheet}>
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            <div className="p-5">
              <div className="mt-6 text-center text-3xl font-bold text-[#262B3D]">${availableBalance.toFixed(2)}</div>
              <p className="mb-8 mt-2 text-center text-sm text-gray-500">
                ${availableBalance.toFixed(2)} available for withdrawal (${totalBalance.toFixed(2)} total)
              </p>
              <form onSubmit={handleRequestSubmit}>
                <div className="mb-6">
                  <label htmlFor="payoutAmount" className="mb-2 block text-sm font-semibold text-gray-900">
                    Request Amount
                  </label>
                  <input
                    type="number"
                    id="payoutAmount"
                    className={`w-full rounded-lg border p-3 text-base focus:outline-none focus:ring-2 focus:ring-opacity-10 ${
                      amountError ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-[#02C5AF] focus:ring-[#02C5AF]'
                    }`}
                    placeholder="Enter amount"
                    min="0.01"
                    step="0.01"
                    max={availableBalance}
                    value={requestAmount}
                    onChange={handleAmountChange}
                    required
                  />
                  {amountError && (
                    <p className="mt-2 text-sm text-red-600">{amountError}</p>
                  )}
                </div>
                <div className="sticky bottom-0 flex gap-3 border-t border-gray-200 bg-gray-50 p-4">
                  <button
                    type="button"
                    className="flex-1 rounded-lg border border-gray-200 bg-white px-3 py-3 text-sm font-semibold text-gray-900 transition hover:bg-gray-100"
                    onClick={closeBottomSheet}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 rounded-lg bg-[#02C5AF] px-3 py-3 text-sm font-semibold text-white transition hover:bg-[#009ECB]"
                  >
                    Submit Request
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Overlay */}
          {isBottomSheetOpen && (
            <div className="fixed inset-0 z-40 bg-black/50 transition-opacity" onClick={closeBottomSheet} />
          )}

          {/* Mobile Pagination */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <div className="text-xs text-gray-500">
                Showing{" "}
                <span className="font-semibold text-gray-900">
                  {startItem}-{endItem}
                </span>{" "}
                of <span className="font-semibold text-gray-900">{pagination.totalItems}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="w-8 h-8 border border-gray-200 rounded-md flex items-center justify-center text-gray-500"
                  onClick={() => pagination.currentPage > 1 && handlePageChange(pagination.currentPage - 1)}
                  disabled={pagination.currentPage === 1}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4">
                    <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                {[1, 2, 3]
                  .slice(0, Math.min(3, Math.ceil(pagination.totalItems / pagination.itemsPerPage)))
                  .map((page) => (
                    <button
                      key={page}
                      className={`w-8 h-8 border rounded-md flex items-center justify-center ${
                        pagination.currentPage === page
                           ? "bg-[#333] text-white border-[#333]"
                        : "bg-[#fff] border-[#e0e0e0] hover:bg-[#f5f5f5]"
                      }`}
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </button>
					
                  ))}
                <button
                  className="w-8 h-8 border border-gray-200 rounded-md flex items-center justify-center text-gray-500"
                  onClick={() =>
                    pagination.currentPage < Math.ceil(pagination.totalItems / pagination.itemsPerPage) &&
                    handlePageChange(pagination.currentPage + 1)
                  }
                  disabled={pagination.currentPage >= Math.ceil(pagination.totalItems / pagination.itemsPerPage)}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4">
                    <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-[1220px] mx-auto">
          <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
             
              <h2 className="text-xl font-semibold text-slate-800">Payout History </h2>
              <button
                onClick={() => setIsDialogOpen(true)}
                className="bg-teal-500 hover:bg-sky-600 text-white py-2.5 px-5 rounded-md font-semibold cursor-pointer transition-all duration-200 hover:-translate-y-0.5"
              >
                Request Payout
              </button>
            </div>
             <Notification />

            <table className="w-full border-separate border-spacing-y-3">
              
              <thead>
                <tr>
                  <th className="text-left pb-3 px-4 text-gray-500 font-semibold text-sm">Amount</th>
                  <th className="text-left pb-3 px-4 text-gray-500 font-semibold text-sm">Type</th>
                  <th className="text-left pb-3 px-4 text-gray-500 font-semibold text-sm">Status</th>
                  <th className="text-left pb-3 px-4 text-gray-500 font-semibold text-sm">Request ID</th>
                  <th className="text-left pb-3 px-4 text-gray-500 font-semibold text-sm">Unpaid</th>
                  <th className="text-left pb-3 px-4 text-gray-500 font-semibold text-sm">Paid</th>
                </tr>
              </thead>
              <tbody>
                {payoutData.map((entry) => (
                  <tr
                    key={entry.id}
                    data-payout-id={entry.id}
                    className="shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 rounded-lg"
                  >
                    <td className="p-4 bg-white font-normal">${entry.amount.toFixed(2)}</td>
                    <td className="p-4 bg-white">
                      <div
                        className={`inline-flex items-center gap-2 py-1.5 px-3 rounded-full text-sm font-semibold ${
                          entry.type === "payout" ? "bg-green-100 text-green-700" : "bg-green-100 text-green-700"
                        }`}
                      >
                        <span
                          className={`w-5 h-5 rounded-full flex items-center justify-center ${
                            entry.type === "payout" ? "bg-green-200" : "bg-green-200"
                          }`}
                        >
                          {entry.type === "payout" ? (
                            <svg viewBox="0 0 256 256" fill="currentColor" height="16" width="16">
                              <path d="M149.61,85.71l-89.6,88a8,8,0,0,1-11.22,0L10.39,136a8,8,0,1,1,11.22-11.41L54.4,156.79l84-82.5a8,8,0,1,1,11.22,11.42Zm96.1-11.32a8,8,0,0,0-11.32-.1l-84,82.5-18.83-18.5a8,8,0,0,0-11.21,11.42l24.43,24a8,8,0,0,0,11.22,0l89.6-88A8,8,0,0,0,245.71,74.39Z"></path>
                            </svg>
                          ) : (
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                              <path d="M1 6L4.5 9.5L11 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                          )}
                        </span>
                        {entry.type === "payout" ? "Payout" : "Request"}
                      </div>
                    </td>
                    <td className="p-4 bg-white">
                      <div
                        className={`inline-flex items-center gap-1.5 py-1 px-2.5 rounded-full text-sm font-semibold ${
                          entry.status === "paid"
                            ? "bg-green-100 text-green-700"
                            : entry.status === "pending"
                              ? "bg-amber-100 text-amber-600"
                              : "bg-red-100 text-red-600"
                        }`}
                      >
                        {entry.status.toUpperCase()}
                      </div>
                    </td>
                    <td className="p-4 bg-white font-normal">#{entry.id}</td>
                    <td className="p-4 bg-white font-normal">${entry.unpaidAmount.toFixed(2)}</td>
                    <td className="p-4 bg-white font-normal">${entry.paidAmount.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Desktop Pagination */}
            <div className="flex justify-between items-center mt-6 pt-6 border-t border-gray-200 max-sm:hidden">
              <div className="flex items-center gap-6">
                <div className="text-gray-500 text-sm">
                  Showing{" "}
                  <strong className="text-gray-800 font-semibold">
                    {startItem}-{endItem}
                  </strong>{" "}
                  of <strong className="text-gray-800 font-semibold">{pagination.totalItems}</strong> products
                </div>
                <PaginationMenu
                  currentPage={pagination.currentPage}
                  totalPages={Math.ceil(pagination.totalItems / pagination.itemsPerPage)}
                  onPageChange={handlePageChange}
                />
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="w-8 h-8 border border-gray-200 rounded-md flex items-center justify-center cursor-pointer bg-white text-gray-800 transition-all duration-200 hover:bg-gray-100"
                  onClick={() => pagination.currentPage > 1 && handlePageChange(pagination.currentPage - 1)}
                  disabled={pagination.currentPage === 1}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4">
                    <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                {[1, 2].map((page) => (
                  <button
                    key={page}
                    className={`w-8 h-8 border rounded-md flex items-center justify-center cursor-pointer transition-all duration-200 ${
                      pagination.currentPage === page
                        ? "bg-[#333] text-white border-[#333]"
                        : "bg-[#fff] border-[#e0e0e0] hover:bg-[#f5f5f5]"
                    }`}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                ))}
                <button
                  className="w-8 h-8 border border-gray-100 rounded-md flex items-center justify-center cursor-pointer bg-white text-gray-800 transition-all duration-200 hover:bg-gray-100"
                  onClick={() =>
                    pagination.currentPage < Math.ceil(pagination.totalItems / pagination.itemsPerPage) &&
                    handlePageChange(pagination.currentPage + 1)
                  }
                  disabled={pagination.currentPage >= Math.ceil(pagination.totalItems / pagination.itemsPerPage)}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4">
                    <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Dialog */}
      {!isMobile && isDialogOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setIsDialogOpen(false)} />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="border-b border-gray-200 p-4 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-[#262B3D]">Request Payout</h3>
              <button onClick={() => setIsDialogOpen(false)} className="p-2">
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            <div className="p-5">
              <div className="mt-6 text-center text-3xl font-bold text-[#262B3D]">${availableBalance.toFixed(2)}</div>
              <p className="mb-8 mt-2 text-center text-sm text-gray-500">
                ${availableBalance} available for withdrawal (${totalBalance} total)
                <span className="text-[#02C5AF] hover:text-[#009ECB] font-medium cursor-pointer underline ml-1"  onClick={() => setRequestAmount(Number(availableBalance.toFixed(2)))}>Withdraw max</span>

              </p>
              <form onSubmit={handleRequestSubmit}>
                <div className="mb-6">
                  <label htmlFor="desktopPayoutAmount" className="mb-2 block text-sm font-semibold text-gray-900">
                    Request Amount
                  </label>
                  <input
                    type="number"
                    id="desktopPayoutAmount"
                    className={`w-full rounded-lg border p-3 text-base focus:outline-none focus:ring-2 focus:ring-opacity-10 ${
                      amountError ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-[#02C5AF] focus:ring-[#02C5AF]'
                    }`}
                    placeholder="Enter amount"
                    min="0.01"
                    step="0.01"
                    max={availableBalance}
                    value={requestAmount}
                    onChange={handleAmountChange}
                    required
                  />
                  {amountError && (
                    <p className="mt-2 text-sm text-red-600">{amountError}</p>
                  )}
                </div>
                <div className="flex gap-3 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    className="flex-1 rounded-lg border border-gray-200 bg-white px-3 py-3 text-sm font-semibold text-gray-900 transition hover:bg-gray-100"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 rounded-lg bg-[#02C5AF] px-3 py-3 text-sm font-semibold text-white transition hover:bg-[#009ECB]"
                  >
                    Submit Request
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default PayoutHistory
