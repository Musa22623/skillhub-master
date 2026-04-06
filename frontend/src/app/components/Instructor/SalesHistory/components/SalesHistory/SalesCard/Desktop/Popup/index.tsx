"use client";

import {
  CheckCircle,
  CheckCkeck,
  CircleDollerSvg,

  ClockIconnew,
  UserAndDoller,
} from "@/app/components/svg";
import { X } from "lucide-react";
import { useEffect } from "react";

interface Transaction {
  id: string;
  transactionId: string;
  date: string;
  amount: string;
  type: string;
  description: string;
  status: string;
  maturationDate: string;
  index:number;
  item:string;
}

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: Transaction;
}

export default function TransactionModal({
  isOpen,
  onClose,
  transaction,
}: TransactionModalProps) {
  // Close modal when Escape key is pressed
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);

    // Prevent scrolling when modal is open
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div
        className="bg-white rounded-lg shadow-lg w-full max-w-lg size-130 overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Transaction Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-9 space-y-6">
          <div className="flex items-center space-x-6 bg-gray-50 p-3 hover:bg-gray-100 rounded-lg">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-gray-500">
              <CheckCircle fill="white" />
            </div>
            <div>
              <p className="text-sm text-gray-500">ID</p>
              <p className="font-semibold text-sm">#{transaction.id}</p>
            </div>
          </div>

          <div className="flex items-center space-x-6 bg-gray-50 p-3 hover:bg-gray-100 rounded-lg">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-gray-500">
              <CheckCircle fill="white" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Transaction ID</p>
              <p className="font-semibold text-sm">
                #{transaction.transactionId}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-6 bg-gray-50 p-3 hover:bg-gray-100 rounded-lg">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-green-500">
              <CheckCkeck fill="gray" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Payment Status</p>
              <p className="font-medium">{transaction.status}</p>
            </div>
          </div>

          <div className="flex items-center space-x-6 bg-gray-50 p-3 hover:bg-gray-100 rounded-lg">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-gray-500">
              <ClockIconnew className="w-24 h-24" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Maturation Date</p>
              <p className="font-medium">{transaction.maturationDate}</p>
            </div>
          </div>

          <div className="flex items-center space-x-6 bg-gray-50 p-3 hover:bg-gray-100 rounded-lg">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-gray-500">
              <CircleDollerSvg fill="white" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Payout Status</p>
              <p className="font-medium">Pending</p>
            </div>
          </div>

          <div className="flex items-center space-x-6 bg-gray-50 p-3 hover:bg-gray-100 rounded-lg">
            <div className="flex items-center justify-center w-6 h-6  bg-white text-gray-500">
              <UserAndDoller/>
            </div>
            <div className=" rounded-xl  p-6 w-full">
            <h2 className=" text-sm  mb-4 text-gray-500">
              Commission Split
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img
                    src="https://i.ibb.co/dJh6T3K/AVATAR-midtone-ux-instrgram.jpg"
                    className="w-8 h-8 rounded-full"
                    alt="Sarah"
                  />
                  <span className="text-gray-800">Sarah Johnson</span>
                </div>
                <span className="text-gray-600 fle">$299.50 (50%)</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img
                    src="https://i.ibb.co/N5kLzSd/AVATAR-couponcodefinder.jpg"
                    className="w-8 h-8 rounded-full"
                    alt="Michael"
                  />
                  <span className="text-gray-800">Michael Chen</span>
                </div>
                <span className="text-gray-600">$179.70 (30%)</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img
                    src="https://i.ibb.co/QjGXmRr/AVATAR-laurentfa.png"
                    className="w-8 h-8 rounded-full"
                    alt="Emily"
                  />
                  <span className="text-gray-800">Emily Rodriguez</span>
                </div>
                <span className="text-gray-600">$119.80 (20%)</span>
              </div>
            </div>
          </div>
          </div>
         {transaction.item === "Subscription" ? 
            <div>
                        <div className="flex items-center gap-4 p-4 bg-[#F9FAFB] rounded-lg mb-4 transition-colors hover:bg-[#F3F4F6]">
                            <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center text-[#142E53]">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="w-5 h-5">
                                    <path d="M10 13.333C13.6819 13.333 16.6667 10.3482 16.6667 6.66634C16.6667 2.98444 13.6819 -0.000335693 10 -0.000335693C6.31814 -0.000335693 3.33337 2.98444 3.33337 6.66634C3.33337 10.3482 6.31814 13.333 10 13.333Z" stroke="currentColor" strokeWidth="1.5"/>
                                    <path d="M1.0417 18.3333C1.91837 16.7917 3.15005 15.4896 4.62505 14.5471C6.10005 13.6046 7.77505 13.0533 9.50005 12.9429C11.2251 12.8325 12.9501 13.1667 14.5251 13.9167C16.1001 14.6667 17.4751 15.8125 18.5417 17.2708" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                                </svg>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="text-[13px] text-[#142E53] mb-1 font-sans">Total Subscribers</div>
                                <div className="text-[14px] #262B3D font-medium font-sans">1,247</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 p-4 bg-[#F9FAFB] rounded-lg mb-4 transition-colors hover:bg-[#F3F4F6]">
                            <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center text-[#142E53]">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="w-5 h-5">
                                    <path d="M9.99996 18.3333C14.6023 18.3333 18.3333 14.6024 18.3333 10C18.3333 5.39763 14.6023 1.66667 9.99996 1.66667C5.39763 1.66667 1.66667 5.39763 1.66667 10C1.66667 14.6024 5.39763 18.3333 9.99996 18.3333Z" stroke="currentColor" strokeWidth="1.5"/>
                                    <path d="M10 5V10L13.3333 11.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                                </svg>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="text-[13px] text-[#142E53] mb-1 font-sans">Total Watch Time</div>
                                <div className="text-[14px] #262B3D font-medium font-sans">284,567 minutes</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 p-4 bg-[#F9FAFB] rounded-lg mb-4 transition-colors hover:bg-[#F3F4F6]">
                            <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center text-[#142E53]">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="w-5 h-5">
                                    <path d="M10 5.83333V14.1667M5.83337 10H14.1667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                                    <path d="M7.50033 17.5H12.5003C16.667 17.5 18.3337 15.8333 18.3337 11.6667V8.33333C18.3337 4.16667 16.667 2.5 12.5003 2.5H7.50033C3.33366 2.5 1.66699 4.16667 1.66699 8.33333V11.6667C1.66699 15.8333 3.33366 17.5 7.50033 17.5Z" stroke="currentColor" strokeWidth="1.5"/>
                                </svg>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="text-[13px] text-[#142E53] mb-1 font-sans">Average Earnings Per Min</div>
                                <div className="text-[14px] #262B3D font-medium font-sans">$1.29 earned per minute</div>
                            </div>
                        </div>
                    </div>
          : ""}
        </div>
      </div>
    </div>
  );
}
