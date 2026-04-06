"use client";
import React, { useState } from "react";
import Image from "next/image";
import Avatar1 from "@/assets/avatar/AVATAR-1.png";
import Avatar2 from "@/assets/avatar/AVATAR-2.jpg";
import Avatar3 from "@/assets/avatar/AVATAR-3.jpg";
import PaginationMenu from "@/app/components/Instructor/Marketing/components/PaginationMenu";
import { LeftPagination, RightPagination } from "@/app/components/svg";

const teamMembers = [
  {
    id: 1,

    name: "William Kulp",
    email: "william@example.com",
    status: "Pending",
    lastActive: "October 29, 2024",
    usage: "Unlimited",
    image: Avatar1,
    role: "Admin",
  },
  {
    id: 2,
    name: "Sarah Chen",
    email: "sarah@example.com",
    status: "Rejected",
    lastActive: "October 28, 2024",
    usage: "Unlimited",
    image: Avatar2,
  },
  {
    id: 3,
    name: "Michael Park",
    email: "michael@example.com",

    status: "Accepted",
    lastActive: "October 30, 2024",
    usage: "Unlimited",
    image: Avatar3,
  },
];

const Team = () => {
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isInstructorPopupOpen, setIsInstructorPopupOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("team"); // Default active tab
  const [isPrimary, setIsPrimary] = useState(false);

  const toggleDropdown = (id: number) => {
    setOpenDropdown((prev) => (prev === id ? null : id));
  };

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };
  const handleOpenInstructorPopup = () => {
    setIsInstructorPopupOpen(true);
  };

  const handleCloseInstructorPopup = () => {
    setIsInstructorPopupOpen(false);
  };
  return (
    <div className="w-full mx-auto p-6 bg-white shadow-md rounded-lg mb-6">
      {/* Header Section */}
      <div className="relative">
        {/* Bottom border line */}
        <div className="absolute bottom-0 left-0 w-full border-b-2 border-gray-300 z-0" />

        {/* Tabs */}
        <div className="fflex space-x-6 relative z-10 mb-4">
          <button
            className={`font-bold text-base pb-2 border-b-2 ${
              activeTab === "team"
                ? "text-teal-600 border-teal-600"
                : "text-black border-transparent"
            }`}
            onClick={() => setActiveTab("team")}
          >
            Team
          </button>
          <button
            className={`font-bold text-base pb-2 border-b-2 ${
              activeTab === "co-instructors"
                ? "text-teal-600 border-teal-600"
                : "text-black border-transparent"
            }`}
            onClick={() => setActiveTab("co-instructors")}
          >
            Co-Instructors
          </button>
        </div>
      </div>

      {/* Dynamic Heading and Button */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">
          {activeTab === "team" ? "Team Members" : "Instructors"}
        </h2>

        {activeTab === "team" ? (
          <button
            className="bg-black text-xs text-white px-4 py-3 rounded-lg hover:bg-gray-800 transition"
            onClick={handleOpenPopup}
          >
            Add Member
          </button>
        ) : (
          <button
            className="bg-black text-xs text-white px-4 py-3 rounded-lg hover:bg-gray-800 transition"
            onClick={handleOpenInstructorPopup}
          >
            Add Instructor
          </button>
        )}
      </div>

      {/* Add member model start */}

      {isPopupOpen && (
        <div className="fixed inset-0 bg-black/30  flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-120 relative z-50">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Add Team Member
              </h2>
              <Image
                src="/img/close.png"
                alt="Close"
                
                width={24}
                height={24}
                className="cursor-pointer filter grayscale brightness-0 opacity-60 hover:opacity-100 transition-opacity"
                onClick={handleClosePopup}
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-sm text-gray-600">First Name</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md mt-2"
                  placeholder="Enter first name"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600">Last Name</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md mt-2"
                  placeholder="Enter last name"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="text-sm text-gray-600">Email</label>
              <input
                type="email"
                className="w-full p-2 border rounded-md mt-2"
                placeholder="Enter email"
              />
            </div>

            <div className="flex items-center mb-4">
              <input type="checkbox" id="admin" className="mr-2" />
              <label htmlFor="admin" className="text-sm text-gray-600">
                Admin access
              </label>
            </div>

            <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition font-bold">
              Send Invitation
            </button>
          </div>
        </div>
      )}
      {/* Add member model end */}

      {/* Add instructor model start */}
      {isInstructorPopupOpen && (
        <div className="fixed inset-0 bg-black/30  flex justify-center items-center z-50 mt-0">
          <div className="bg-white p-6 rounded-lg shadow-lg w-120 relative z-50">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Add Instructor
              </h2>
              <button
                onClick={handleCloseInstructorPopup}
                className="text-gray-500 hover:text-gray-800"
              >
                <Image
                  src="/img/close.png"
                  alt="Close"
                  width={24}
                  height={24}
                  className="cursor-pointer filter grayscale brightness-0 opacity-60 hover:opacity-100 transition-opacity"
                  onClick={handleClosePopup}
                />
              </button>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-sm text-gray-600">First Name</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md mt-1"
                  placeholder="Enter first name"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600">Last Name</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md mt-1"
                  placeholder="Enter last name"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="text-sm text-gray-600">Email</label>
              <input
                type="email"
                className="w-full p-2 border rounded-md mt-1"
                placeholder="Enter email"
              />
            </div>

            {/* Permissions */}
            <div className="mb-4">
              <label className="text-sm font-semibold text-gray-800">
                Permissions
              </label>
              <div className="flex items-center mt-2">
                <label className="flex items-center cursor-pointer">
                  <div className="relative w-10 h-5">
                    <input
                      type="checkbox"
                      id="primary"
                      className="sr-only peer"
                      checked={isPrimary}
                      onChange={() => setIsPrimary(!isPrimary)}
                    />
                    <div className="w-10 h-5 bg-gray-300 rounded-full peer-checked:bg-blue-500 transition-colors"></div>
                    <div className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-md transform transition-transform peer-checked:translate-x-5"></div>
                  </div>
                  <span className="ml-3 text-sm text-gray-600">
                    Set as Primary
                  </span>
                </label>
              </div>
            </div>
            {/* Revenue Allocation */}
            <div className="mb-4">
              <label className="text-sm font-semibold text-gray-800">
                Revenue Allocation
              </label>
              <div className="flex items-center mt-2">
                <input
                  type="number"
                  className="w-20 p-2 border rounded-md"
                  placeholder="0.0"
                />
                <span className="ml-2">%</span>
              </div>
            </div>

            {/* Additional Permissions */}
            <div className="mb-4">
              <label className="text-sm font-semibold text-gray-800">
                Additional Permissions
              </label>
              <div className="mt-2 space-y-2">
                <div>
                  <input type="checkbox" id="create-course" />{" "}
                  <label htmlFor="create-course">Create Course</label>
                </div>
                <div>
                  <input type="checkbox" id="view-sales" />{" "}
                  <label htmlFor="view-sales">View Sales History</label>
                </div>
                <div>
                  <input type="checkbox" id="view-progress" />{" "}
                  <label htmlFor="view-progress">View Student Progress</label>
                </div>
                <div>
                  <input type="checkbox" id="moderate" />{" "}
                  <label htmlFor="moderate">
                    Moderate Community (of assigned courses)
                  </label>
                </div>
                <div>
                  <input type="checkbox" id="manage-promotions" />{" "}
                  <label htmlFor="manage-promotions">Manage Promotions</label>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition font-bold">
              Send Invitation
            </button>
          </div>
        </div>
      )}
      {/* Add instructor model end */}

      {/* Filters */}
      <div className="flex justify-between bg-white p-3 rounded-lg mb-4">
        {/* First Two Dropdowns in a Group */}
        <div className="flex space-x-4">
          <select className="border px-4 py-3 pr-12 rounded-md outline-none focus:ring focus:ring-teal-300 text-sm">
            <option>All Status</option>
            <option>Accepted</option>
            <option>Pending</option>
            <option>Rejected</option>
          </select>

          <select className="border px-4 py-3 pr-8 rounded-md outline-none focus:ring focus:ring-teal-300 text-sm">
            <option>Sort by Name A-Z</option>
            <option>Sort by Email A-Z</option>
            <option>Sort by Last Active</option>
          </select>
        </div>

        {/* Last Dropdown Pushed to End */}
        <select className="border px-4 py-3 pr-8 rounded-md outline-none focus:ring focus:ring-teal-300 text-sm">
          <option value="Bulk Actions">Bulk Actions</option>
          <option value="Delete">Delete</option>
          <option value="Resend Invitation">Resend Invitation</option>
        </select>
      </div>

      {/* Table */}
      <div>
        <table className="w-full text-left border-collapse">
          {/* Table Head */}
          <thead>
            <tr className="bg-gray-100 text-gray-500 ">
              <th className="p-4">
                <input type="checkbox" className="w-3 h-3" />
              </th>
              <th className="p-3 font-semibold">NAME</th>
              <th className="p-3 font-semibold">STATUS</th>
              <th className="p-3 font-semibold">LAST ACTIVE</th>
              <th className="p-3 font-semibold">ACTIVITY LOG</th>
              <th className="p-3 font-semibold">ACTIONS</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {teamMembers.map((member) => (
              <tr
                key={member.id}
                className="border-b hover:bg-gray-50 transition duration-200"
              >
                <td className="p-4">
                  <input type="checkbox" className="w-3 h-3" />
                </td>
                <td className="p-4 flex items-center space-x-3">
                  <div className="flex items-center space-x-3">
                    <Image
                      src={member.image}
                      alt={member.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <div className="flex items-center space-x-2 gap-3">
                        <p className="font-semibold">{member.name}</p>
                        {member.role === "Admin" && (
                          <span className="bg-blue-100 text-gray-700 text-xs font-semibold px-3 py-1 rounded-full">
                            Admin
                          </span>
                        )}
                      </div>
                      <p className="text-gray-500 text-sm">{member.email}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      member.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : member.status === "Rejected"
                        ? "bg-red-100 text-red-600"
                        : member.status === "Accepted"
                        ? "bg-green-100 text-green-600"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {member.status}
                  </span>
                </td>
                <td className="p-4">{member.lastActive}</td>

                <td className="p-4">
                  <button className="bg-white flex items-center px-4 py-2 rounded-md hover:bg-gray-300 transition border border-gray text-sm">
                    View
                  </button>
                </td>

                <td className="p-3 relative">
                  {/* Manage Button */}
                  <button
                    className="bg-white flex items-center gap-2 px-4 py-2 rounded-md hover:bg-gray-300 transition border border-gray text-sm"
                    onClick={() => toggleDropdown(member.id)}
                  >
                    Manage
                    <Image
                      alt="Edit"
                      height={16}
                      src="/img/down.png"
                      width={16}
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {openDropdown === member.id && (
                    <div className="absolute top-12 left-0 bg-white shadow-md rounded-md w-40 z-10">
                      <ul className="py-2 text-sm text-gray-700">
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                          Edit
                        </li>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                          Delete
                        </li>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                          Resend Invitation
                        </li>
                      </ul>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between items-center mt-6 pt-6 max-sm:hidden p-3">
        <div className="flex items-center gap-6">
          <div className="text-[#666] text-sm">
            Showing <strong className="text-[#333] font-semibold">1-8</strong>{" "}
            of <strong className="text-[#333] font-semibold">120</strong> emails
          </div>
          <PaginationMenu />
        </div>

        <div className="flex items-center gap-2">
          <button className="w-8 h-8 border border-[#e0e0e0] rounded-md flex items-center justify-center cursor-pointer bg-white text-[#333]transition-all duration-200 hover:bg-[#f5f5f5]">
            <LeftPagination />
          </button>
          <button className="w-8 h-8 border rounded-md flex items-center justify-center cursor-pointer transition-all duration-200 bg-[#333] text-white border-[#333]">
            1
          </button>
          <button className="w-8 h-8 border rounded-md flex items-center justify-center cursor-pointer transition-all duration-200  border-[#333]">
            2
          </button>

          <button className="w-8 h-8 border border-[#e0e0e0] rounded-md flex items-center justify-center cursor-pointer bg-white text-[#333] transition-all duration-200 hover:bg-[#f5f5f5]">
            <RightPagination />
          </button>
        </div>
      </div>
        
      </div>
     
    </div>
    
  );
};


export default Team;
