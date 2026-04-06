"use client"

import { useState } from "react"
import Image from "next/image"
import { CheckCheck, Clock, Plus, Award, BookOpen, CheckCircle } from "lucide-react"

// Define certificate types
type CertificateStatus = "claimed" | "completed" | "in-progress" | "not-started"

interface Certificate {
  id: string
  title: string
  level: string
  icon: "award" | "book"
  status: CertificateStatus
  progress: number
  date?: string
}

export default function CertificatesSection() {
  // State for active tab
  const [activeTab, setActiveTab] = useState<"claimed" | "in-progress" | "available">("claimed")

  // Certificate data
  const certificates: Certificate[] = [
    {
      id: "1",
      title: "Web Development Mastery",
      level: "Advanced Level",
      icon: "award",
      status: "claimed",
      progress: 100,
      date: "Issued Oct 15, 2024",
    },
    {
      id: "2",
      title: "UX Design Fundamentals",
      level: "Intermediate Level",
      icon: "book",
      status: "completed",
      progress: 100,
      date: "Completed Oct 15, 2024",
    },
    {
      id: "3",
      title: "UX Design Fundamentals",
      level: "Intermediate Level",
      icon: "book",
      status: "in-progress",
      progress: 65,
    },
    {
      id: "4",
      title: "Digital Marketing Pro",
      level: "Expert Level",
      icon: "award",
      status: "not-started",
      progress: 0,
    },
    {
      id: "5",
      title: "Data Science Essentials",
      level: "Intermediate Level",
      icon: "book",
      status: "not-started",
      progress: 0,
    },
    {
      id: "6",
      title: "Mobile App Development",
      level: "Advanced Level",
      icon: "award",
      status: "in-progress",
      progress: 45,
    },
    {
      id: "7",
      title: "AI & Machine Learning",
      level: "Expert Level",
      icon: "book",
      status: "not-started",
      progress: 0,
    },
    {
      id: "8",
      title: "Cybersecurity Fundamentals",
      level: "Beginner Level",
      icon: "award",
      status: "claimed",
      progress: 100,
      date: "Issued Sep 5, 2024",
    },
    {
      id: "9",
      title: "Cloud Computing",
      level: "Intermediate Level",
      icon: "book",
      status: "claimed",
      progress: 100,
      date: "Issued Aug 20, 2024",
    },
  ]

  // Filter certificates based on active tab
  const filteredCertificates = certificates.filter((cert) => {
    if (activeTab === "claimed") return cert.status === "claimed"
    if (activeTab === "in-progress") return cert.status === "in-progress" || cert.status === "completed"
    if (activeTab === "available") return cert.status === "not-started"
    return false
  })

  // Count certificates for each tab
  const claimedCount = certificates.filter((cert) => cert.status === "claimed").length
  const inProgressCount = certificates.filter(
    (cert) => cert.status === "in-progress" || cert.status === "completed",
  ).length
  const availableCount = certificates.filter((cert) => cert.status === "not-started").length

  return (
    <div className="">
    <div className="bg-blue-50 rounded-xl p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3">
            <Image
              src="https://i.ibb.co/jJ4GHXP/img1.jpg"
              alt="User Avatar"
              width={48}
              height={48}
              className="rounded-full object-cover"
            />
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Your Certificates</h2>
              <div className="flex gap-4 mt-1">
                <div className="flex items-center gap-1.5 text-sm text-gray-500">
                  <CheckCircle className="w-4 h-4 text-cyan-500" />
                  <span>{claimedCount} Completed</span>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-gray-500">
                  <Clock className="w-4 h-4 text-cyan-500" />
                  <span>{inProgressCount} In Progress</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-6 mb-6 pb-3 border-b border-gray-200">
        <button
          className={`text-sm font-semibold pb-3 relative ${
            activeTab === "claimed"
              ? "text-cyan-500 after:content-[''] after:absolute after:bottom-[-3px] after:left-0 after:right-0 after:h-0.5 after:bg-cyan-500 after:rounded-sm"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("claimed")}
        >
          Claimed ({claimedCount})
        </button>
        <button
          className={`text-sm font-semibold pb-3 relative ${
            activeTab === "in-progress"
              ? "text-cyan-500 after:content-[''] after:absolute after:bottom-[-3px] after:left-0 after:right-0 after:h-0.5 after:bg-cyan-500 after:rounded-sm"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("in-progress")}
        >
          In Progress ({inProgressCount})
        </button>
        <button
          className={`text-sm font-semibold pb-3 relative ${
            activeTab === "available"
              ? "text-cyan-500 after:content-[''] after:absolute after:bottom-[-3px] after:left-0 after:right-0 after:h-0.5 after:bg-cyan-500 after:rounded-sm"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("available")}
        >
          Available ({availableCount})
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCertificates.map((certificate) => (
          <div
            key={certificate.id}
            className="bg-white border border-gray-200 rounded-xl overflow-hidden transition-all duration-200 hover:translate-y-[-2px] hover:shadow-md hover:border-cyan-500"
          >
            <div className="flex items-start gap-4 p-5 border-b border-gray-200">
              <div className="w-12 h-12 flex items-center justify-center bg-cyan-50 rounded-xl flex-shrink-0">
                {certificate.icon === "award" ? (
                  <Award className="w-6 h-6 text-cyan-500" />
                ) : (
                  <BookOpen className="w-6 h-6 text-cyan-500" />
                )}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{certificate.title}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>{certificate.level}</span>
                  {certificate.date && (
                    <>
                      <span>•</span>
                      <span>{certificate.date}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="p-5">
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-gray-600">Course Progress</span>
                  <span className="text-sm font-semibold text-cyan-500">{certificate.progress}%</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-sm overflow-hidden">
                  <div
                    className="h-full bg-cyan-500 rounded-sm transition-all duration-300"
                    style={{ width: `${certificate.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 border-t border-gray-200">
              <div className="flex items-center gap-2 text-sm font-semibold">
                {certificate.status === "claimed" && (
                  <>
                    <div className="w-5 h-5 flex items-center justify-center rounded-full bg-green-50 text-green-500">
                      <CheckCheck className="w-3.5 h-3.5" />
                    </div>
                    <span>Claimed</span>
                  </>
                )}
                {certificate.status === "completed" && (
                  <>
                    <div className="w-5 h-5 flex items-center justify-center rounded-full bg-green-50 text-green-500">
                      <CheckCheck className="w-3.5 h-3.5" />
                    </div>
                    <span>Completed</span>
                  </>
                )}
                {certificate.status === "in-progress" && (
                  <>
                    <div className="w-5 h-5 flex items-center justify-center rounded-full bg-cyan-50 text-cyan-500">
                      <Clock className="w-3.5 h-3.5" />
                    </div>
                    <span>In Progress</span>
                  </>
                )}
                {certificate.status === "not-started" && (
                  <>
                    <div className="w-5 h-5 flex items-center justify-center rounded-full bg-gray-100 text-gray-500">
                      <Plus className="w-3.5 h-3.5" />
                    </div>
                    <span>Not Started</span>
                  </>
                )}
              </div>
              <div className="flex gap-3">
                {certificate.status === "claimed" && (
                  <>
                    <button className="px-4 py-2 text-sm font-semibold rounded-lg bg-cyan-50 text-cyan-500 transition-colors hover:bg-cyan-100">
                      Share
                    </button>
                    <button className="px-4 py-2 text-sm font-semibold rounded-lg bg-cyan-500 text-white transition-colors hover:bg-cyan-600">
                      View Certificate
                    </button>
                  </>
                )}
                {certificate.status === "completed" && (
                  <button className="px-4 py-2 text-sm font-semibold rounded-lg bg-cyan-500 text-white transition-colors hover:bg-cyan-600">
                    Claim Now
                  </button>
                )}
                {certificate.status === "in-progress" && (
                  <button className="px-4 py-2 text-sm font-semibold rounded-lg bg-cyan-500 text-white transition-colors hover:bg-cyan-600">
                    Continue Learning
                  </button>
                )}
                {certificate.status === "not-started" && (
                  <button className="px-4 py-2 text-sm font-semibold rounded-lg bg-cyan-500 text-white transition-colors hover:bg-cyan-600">
                    Start Course
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
  )
}
