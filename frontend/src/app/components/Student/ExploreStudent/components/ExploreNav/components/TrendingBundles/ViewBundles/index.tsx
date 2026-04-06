"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { ChevronDown, Clock, GraduationCap, BookOpen, Users, Layers } from "lucide-react"

// Product type definition
type Product = {
  id: string
  title: string
  image: string
  level: "Beginner" | "Intermediate" | "Advanced"
  type: "course" | "session"
  duration: string
  students: string
  units: string
}

// Payment plan type definition
type PaymentPlan = {
  name: string
  details: string
}

// Props for the ViewBundles component
interface ViewBundlesProps {
  bundleTitle?: string
  bundleImage?: string
  productCount?: number
  products?: Product[]
  paymentPlans?: PaymentPlan[]
}

export default function ViewBundles({
  bundleTitle = "Web Development Master Bundle",
  bundleImage = "https://i.ibb.co/jZjZ7ZRd/butterfly.webp",
  productCount = 5,
  products = [
    {
      id: "1",
      title: "The Complete Web Development Bootcamp",
      image: "https://i.ibb.co/BHcDXgQt/product5.webp",
      level: "Beginner",
      type: "course",
      duration: "2.5 hrs",
      students: "15.2K",
      units: "5",
    },
    {
      id: "2",
      title: "Advanced JavaScript Concepts",
      image: "https://i.ibb.co/BHcDXgQt/product5.webp",
      level: "Advanced",
      type: "course",
      duration: "3.5 hrs",
      students: "12.8K",
      units: "8",
    },
    {
      id: "3",
      title: "React Native Masterclass",
      image: "https://i.ibb.co/BHcDXgQt/product5.webp",
      level: "Intermediate",
      type: "course",
      duration: "4 hrs",
      students: "9.5K",
      units: "6",
    },
    {
      id: "4",
      title: "UI/UX Design Workshop",
      image: "https://i.ibb.co/BHcDXgQt/product5.webp",
      level: "Beginner",
      type: "session",
      duration: "1.5 hrs",
      students: "8.3K",
      units: "4",
    },
    {
      id: "5",
      title: "Design Systems Architecture",
      image: "https://i.ibb.co/BHcDXgQt/product5.webp",
      level: "Advanced",
      type: "session",
      duration: "2 hrs",
      students: "7.1K",
      units: "3",
    },

      {
      id: "6",
      title: "Design Systems Architecture",
      image: "https://i.ibb.co/BHcDXgQt/product5.webp",
      level: "Advanced",
      type: "session",
      duration: "2 hrs",
      students: "7.1K",
      units: "3",
    },
  ],
  paymentPlans = [
    {
      name: "PAY ONCE",
      details: "One-time payment of $499.99",
    },
    {
      name: "Silver Bundle Plan",
      details: "5 payments of $110/month (Total: $550)",
    },
    {
      name: "Gold Bundle Plan",
      details: "10 payments of $60/month (Total: $600)",
    },
  ],
}: ViewBundlesProps) {
  const [isOpen, setIsOpen] = useState(false)
  const drawerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [startY, setStartY] = useState(0)
  const [currentY, setCurrentY] = useState(0)
  const [isDragging, setIsDragging] = useState(false)

  // Handle opening the drawer
  const openDrawer = () => {
    setIsOpen(true)
    document.body.style.overflow = "hidden"
  }

  // Handle closing the drawer
  const closeDrawer = () => {
    setIsOpen(false)
    document.body.style.overflow = ""

    if (contentRef.current) {
      contentRef.current.style.transform = ""
      contentRef.current.style.transition = "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
    }
  }

  // Handle click outside to close
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === drawerRef.current) {
      closeDrawer()
    }
  }

  // Touch handlers for drawer
  const handleTouchStart = (e: React.TouchEvent) => {
    setStartY(e.touches[0].clientY)
    setIsDragging(true)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return

    const currentTouchY = e.touches[0].clientY
    setCurrentY(currentTouchY)
    const deltaY = currentTouchY - startY

    if (deltaY > 0 && contentRef.current) {
      contentRef.current.style.transform = `translateY(${deltaY}px)`
      contentRef.current.style.transition = "none"
    }
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
    const deltaY = currentY - startY

    if (deltaY > 100) {
      closeDrawer()
    } else if (contentRef.current) {
      contentRef.current.style.transform = ""
      contentRef.current.style.transition = "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
    }
  }

  // Clean up overflow style when component unmounts
  useEffect(() => {
    return () => {
      document.body.style.overflow = ""
    }
  }, [])

  return (
    <>
      <button
        onClick={openDrawer}
        className="flex items-center justify-center gap-1.5 w-full py-3 bg-transparent border-none cursor-pointer text-gray-500 text-sm font-semibold"
      >
        View All
        <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200" />
      </button>

      <div
        ref={drawerRef}
        className={`fixed inset-0 bg-black/50 z-50 flex justify-center transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={handleOverlayClick}
      >
        <div
          ref={contentRef}
          className="fixed bottom-0 w-full max-w-[300px] bg-white rounded-t-2xl transition-transform duration-400 z-[51] overflow-hidden max-h-[90vh] flex flex-col"
          style={{
            transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
            transform: isOpen ? "translateY(0)" : "translateY(100%)",
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="w-8 h-1 bg-gray-200 rounded-full mx-auto my-2"></div>

          <div className="px-3 pb-3 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <Image
                src={bundleImage || "/placeholder.svg"}
                alt="Bundle cover"
                width={60}
                height={60}
                className="rounded-lg object-cover"
              />
              <div>
                <h2 className="text-base font-semibold mb-1 text-gray-900">{bundleTitle}</h2>
                <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-xl text-xs font-semibold bg-gray-200 text-gray-700">
                  <Layers className="w-3 h-3" />
                  {productCount} Products
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-3">
            {products.map((product) => (
              <div key={product.id} className="flex gap-3 p-3 bg-white border border-gray-200 rounded-lg mb-2">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.title}
                  width={60}
                  height={40}
                  className="rounded-md object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-[#13C4CC] mb-0.5 whitespace-nowrap overflow-hidden text-ellipsis">
                    {product.title}
                  </h3>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-semibold text-gray-900 mb-1">{product.level}</span>
                    <div
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-xl text-xs font-semibold w-fit ${
                        product.type === "course" ? "bg-blue-100 text-blue-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      {product.type === "course" ? (
                        <>
                          <BookOpen className="w-3.5 h-3.5" />
                          Course
                        </>
                      ) : (
                        <>
                          <GraduationCap className="w-3.5 h-3.5" />
                          1:1 Session
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-3 mt-2">
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock className="w-3.5 h-3.5 text-gray-500" />
                      <span className="font-semibold text-gray-900">{product.duration}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Users className="w-3.5 h-3.5 text-gray-500" />
                      <span className="font-semibold text-gray-900">{product.students}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Layers className="w-3.5 h-3.5 text-gray-500" />
                      <span className="font-semibold text-gray-900">{product.units}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 border-t border-gray-200 bg-gray-50">
            {paymentPlans.map((plan, index) => (
              <div key={index} className="bg-white p-3 rounded-lg border border-gray-200 mb-2 last:mb-0">
                <div className="font-semibold text-gray-900 mb-0.5 text-sm">{plan.name}</div>
                <div className="text-xs text-gray-500">{plan.details}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

