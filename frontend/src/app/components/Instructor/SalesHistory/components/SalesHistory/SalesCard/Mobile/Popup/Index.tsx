"use client";

import {
  CheckCircle,
  CheckCkeck,
  CircleDollerSvg,
  ClockIconnew,
  UserAndDoller,
} from "@/app/components/svg";
import { X } from "lucide-react";
import Image from "next/image";
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
        className="bg-white rounded-lg shadow-lg w-full max-w-lg size-100 overflow-y-auto"
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
              <p className="font-medium">{transaction.status}</p>
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
                  <Image
                  width="100"
                  height="100"
                    src="https://api.dicebear.com/7.x/big-smile/svg?seed=Sarah"
                    className="w-8 h-8 rounded-full"
                    alt="Sarah"
                  />
                  <span className="text-gray-800">Sarah Johnson</span>
                </div>
                <span className="text-gray-600 fle">$299.50 (50%)</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Image
                  width="100"
                  height="100"
                    src="https://api.dicebear.com/7.x/big-smile/svg?seed=Michael"
                    className="w-8 h-8 rounded-full"
                    alt="Michael"
                  />
                  <span className="text-gray-800">Michael Chen</span>
                </div>
                <span className="text-gray-600">$179.70 (30%)</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Image
                  width="100"
                  height="100"
                    src="https://api.dicebear.com/7.x/big-smile/svg?seed=Emily"
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
       
        </div>
      </div>
    </div>
  );
}
