"use client";

import type React from "react";
import Image from "next/image";
import { useState } from "react";
import { Search, Globe, Twitter, Facebook, Linkedin } from "lucide-react";

interface Member {
  id: number;
  name: string;
  avatar: string;
  achievements: string[];
  bio: string;
  joined: string;
  location: string;
}

const members: Member[] = [
  {
    id: 1,
    name: "Sarah Mitchell",
    avatar: "https://i.ibb.co/YP71Tb6/profile9.jpg",
    achievements: [
      "Advanced Chemistry Expert",
      "Research Publication Lead",
      "Department Head",
    ],
    bio: "Leading researcher in organic chemistry with over 15 years of experience in academic research and industry collaborations. Specialized in developing sustainable chemical processes and mentoring graduate students. Published author of multiple peer-reviewed papers.",
    joined: "Dec 15, 2024",
    location: "Boston, MA",
  },
  {
    id: 2,
    name: "Michael Chen",
    avatar: "https://i.ibb.co/YP71Tb6/profile9.jpg",
    achievements: [
      "Quantum Physics Specialist",
      "Research Grant Lead",
      "Innovation Award Winner",
    ],
    bio: "Distinguished physicist specializing in quantum mechanics and particle physics. Lead researcher on multiple groundbreaking projects at CERN and other international facilities. Passionate about making complex physics concepts accessible to students.",
    joined: "Nov 30, 2024",
    location: "Berkeley, CA",
  },
  {
    id: 3,
    name: "Emma Thompson",
    avatar: "https://i.ibb.co/YP71Tb6/profile9.jpg",
    achievements: [
      "Molecular Biology Pioneer",
      "Gene Therapy Expert",
      "Teaching Excellence Award",
    ],
    bio: "Pioneering researcher in molecular biology and genetics with a focus on innovative therapeutic approaches. Leads a dynamic research team exploring breakthrough treatments for genetic disorders. Committed to mentoring the next generation of scientists.",
    joined: "Jan 5, 2025",
    location: "Cambridge, MA",
  },
];

export default function DiscussionBoard() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMembers = members.filter((member) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      member.name.toLowerCase().includes(searchLower) ||
      member.bio.toLowerCase().includes(searchLower) ||
      member.location.toLowerCase().includes(searchLower)
    );
  });

  const sidebarLinks = [
    { icon: "💎", text: "1-on-1 4DCI Mentorship" },
    { icon: "✍️", text: "4D Copywriting Academy 2.0" },
    { icon: "🗺️", text: "4D Copywriters Map" },
  ];
  const communityStats = [
    { label: "Learners", value: "44.8k" },
    { label: "Posts", value: "2.4k" },
    { label: "Mods", value: "4" },
  ];

  function SocialIcon({
    icon,
    tooltip,
  }: {
    icon: React.ReactNode;
    tooltip: string;
  }) {
    return (
      <div className="group relative">
        <a
          href="#"
          className="w-8 h-8 bg-[#F8F9FD] rounded-md flex items-center justify-center transition-all hover:bg-[#EDF2F7] text-[#4F4F4F]"
        >
          {icon}
        </a>
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-[#262B3D] text-white px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all mb-2">
          {tooltip}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full  p-4 relative">
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] relative">
        {/* Left Column: Posts */}
        <div className="flex justify-center min-h-screen">
          <div className="w-full max-w-3xl bg-white rounded-xl pr-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <h1 className="text-2xl font-semibold text-[#262B3D]">
                Members Directory
              </h1>
              <div className="relative w-full sm:w-[300px]">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#3B6E91]" />
                <input
                  type="text"
                  placeholder="Search members..."
                  className="w-full py-2.5 pl-10 pr-4 border border-gray-200 rounded-lg text-sm transition-all focus:outline-none focus:border-[#3B6E91] focus:ring-2 focus:ring-[#3B6E91] focus:ring-opacity-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-col gap-5">
              {filteredMembers.map((member) => (
                <div
                  key={member.id}
                  className="border border-gray-200 rounded-xl p-5 transition-all hover:shadow-md"
                >
                  <div className="flex flex-col sm:flex-row gap-4 mb-4">
                    <Image
                      src={member.avatar || "/placeholder.svg"}
                      alt={member.name}
                      className="w-20 h-20 rounded-full object-cover"
                      width={20}
                      height={20}
                    />
                    <div className="flex-1">
                      <div className="text-xl font-semibold text-[#262B3D] mb-2">
                        {member.name}
                      </div>
                      <div className="text-sm text-[#3B6E91] flex flex-wrap gap-2 mb-4">
                        {member.achievements.map((achievement, index) => (
                          <span key={index}>
                            ◇ {achievement}
                            {index < member.achievements.length - 1 ? "" : ""}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-3">
                    <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] gap-4">
                      <div className="text-xs font-semibold text-[#262B3D] uppercase tracking-wider">
                        Bio
                      </div>
                      <div className="text-sm text-[#3B6E91] leading-relaxed">
                        {member.bio}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] gap-4">
                      <div className="text-xs font-semibold text-[#262B3D] uppercase tracking-wider">
                        Joined
                      </div>
                      <div className="text-sm text-[#3B6E91]">
                        {member.joined}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] gap-4">
                      <div className="text-xs font-semibold text-[#262B3D] uppercase tracking-wider">
                        Location
                      </div>
                      <div className="text-sm text-[#3B6E91]">
                        {member.location}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] gap-4">
                      <div className="text-xs font-semibold text-[#262B3D] uppercase tracking-wider">
                        Social
                      </div>
                      <div className="flex gap-2 mt-1">
                        <SocialIcon
                          icon={<Globe className="w-[18px] h-[18px]" />}
                          tooltip="Website"
                        />
                        <SocialIcon
                          icon={<Twitter className="w-[18px] h-[18px]" />}
                          tooltip="Twitter (X)"
                        />
                        <SocialIcon
                          icon={<Facebook className="w-[18px] h-[18px]" />}
                          tooltip="Facebook"
                        />
                        <SocialIcon
                          icon={<Linkedin className="w-[18px] h-[18px]" />}
                          tooltip="LinkedIn"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {filteredMembers.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No members found matching your search.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Sidebar */}
        <div className="border border-[#E0E0E0] rounded-xl overflow-hidden h-fit">
          <div className="w-full h-40 relative">
            <Image
              src="https://i.ibb.co/jJ4GHXP/img1.jpg"
              alt="School Banner"
              width={300}
              height={160}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="p-4">
            <h2 className="text-lg font-semibold text-[#262B3D] mb-3">
              The 4D Copywriting Community
            </h2>
            <p className="text-sm text-[#3B6E91] leading-relaxed mb-4">
              The best place to be to become a full-time freelance copywriter.
              Join our community of passionate writers and learn from
              experienced professionals.
            </p>

            {/* Sidebar Links */}
            <div className="flex flex-col gap-3 mb-6">
              {sidebarLinks.map((link, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="flex items-center gap-2 text-[#142E53] no-underline text-sm font-semibold"
                >
                  <span>{link.icon}</span>
                  {link.text}
                </a>
              ))}
            </div>

            {/* Community Stats */}
            <div className="grid grid-cols-3 gap-0 mb-6 text-center relative">
              {communityStats.map((stat, idx) => (
                <div key={idx} className="relative px-3">
                  <div className="text-xs text-[#3B6E91] mb-1 font-semibold">
                    {stat.label}
                  </div>
                  <div className="text-lg font-semibold text-[#262B3D]">
                    {stat.value}
                  </div>
                  {idx < communityStats.length - 1 && (
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 h-[70%] w-px bg-[#E0E0E0]"></div>
                  )}
                </div>
              ))}
            </div>

            {/* Member Avatars */}
            <div className="flex flex-wrap gap-1 mb-4">
              {[...Array(8)].map((_, idx) => (
                <div key={idx} className="w-8 h-8 rounded-full overflow-hidden">
                  <Image
                    src="https://i.ibb.co/S3QRdcX/AVATAR-Citra-Gunasiwi-for-Paperpillar.jpg"
                    alt={`Member ${idx + 1}`}
                    width={32}
                    height={32}
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

            {/* View Discussions Button */}
            <button className="w-full py-3 bg-[#02C5AF] text-white text-center border-none rounded-md font-semibold cursor-pointer transition hover:bg-[#00b19d]">
              VIEW DISCUSSIONS
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
