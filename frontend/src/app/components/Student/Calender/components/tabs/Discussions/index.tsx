"use client";
import { useState } from 'react';
import Image from 'next/image';

export default function DiscussionBoard() {
  // const [activeTab, setActiveTab] = useState('Discussions');
  const [activeSpace, setActiveSpace] = useState('All');
  const [isSpacesExpanded, setIsSpacesExpanded] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Filter options state
  const [filterOption, setFilterOption] = useState('None');
  const [sortOption, setSortOption] = useState('Recent activity');

  
  const mainSpaces = [
    { id: 'all', name: 'All' },
    { id: 'announcements', name: '📢 Announcements' },
    { id: 'news', name: '❗️ News' },
    { id: 'weekly', name: '⭐ Weekly Review' },
    { id: 'ask', name: '❓ Ask Tyson' },
    { id: 'chat', name: '💬 Chat' },
  ];
  
  const hiddenSpaces = [
    { id: 'wins', name: '💰 Wins' },
    { id: 'hot', name: '🔥 Hot Take' },
    { id: 'copywriting', name: '📚 Copywriting' },
  ];

  const posts = [
    {
      id: 1,
      isPinned: true,
      author: {
        name: 'John Smith',
        avatar: 'https://i.ibb.co/N5kLzSd/AVATAR-couponcodefinder.jpg'
      },
      time: '7h ago',
      space: '❗️ News',
      text: "Most promo emails read like this: \"Hi there! Do you want this thing? It's on sale. Please buy it. Thanks :)\" ...They make you think businesses are allergic to making money.",
      image: '/img1.jpg',
      interactions: {
        comments: 19,
        likes: 59
      },
      mentions: [
        { name: 'Sarah Johnson', avatar: 'https://i.ibb.co/gLQM1bhc/AVATAR-midtone-ux-instrgram.jpg' },
        { name: 'Emily Davis', avatar: 'https://i.ibb.co/BKststd4/AVATAR-Dribble.jpg' },
        { name: 'Michael Brown', avatar: 'https://i.ibb.co/v4GRFBbB/AVATAR-Kostis-Kapelonis.png' }
      ]
    },
    {
      id: 2,
      isPinned: true,
      author: {
        name: 'David Wilson',
        avatar: 'https://i.ibb.co/3m3G6rWg/AVATAR-laurentfa.png'
      },
      time: '2h ago',
      space: '📢 Announcements',
      text: "The FREE 8-hour copywriting course just released on YouTube. Click here to see the most valuable copywriting video of all time. EIGHT full hours jam-packed with new knowledge.",
      image: '/coaching-image.webp',
      interactions: {
        comments: 1400,
        likes: 245
      },
      mentions: [
        { name: 'Robert Taylor', avatar: 'https://i.ibb.co/N5kLzSd/AVATAR-couponcodefinder.jpg' },
        { name: 'Lisa Anderson', avatar: 'https://i.ibb.co/gLQM1bhc/AVATAR-midtone-ux-instrgram.jpg' },
        { name: 'Jennifer White', avatar: 'https://i.ibb.co/BKststd4/AVATAR-Dribble.jpg' },
        { name: 'James Miller', avatar: 'https://i.ibb.co/v4GRFBbB/AVATAR-Kostis-Kapelonis.png' }
      ]
    },
    {
      id: 3,
      isPinned: false,
      author: {
        name: 'Emma Thompson',
        avatar: 'https://i.ibb.co/3m3G6rWg/AVATAR-laurentfa.png'
      },
      time: '4h ago',
      space: '💬 Chat',
      text: "What's your go-to snack during those long copywriting sessions? Share your favorites below!",
      hasPoll: true,
      poll: {
        title: "Favorite Fitness Snacks?",
        options: [
          { name: "Fresh Fruit", percentage: 3 },
          { name: "Veggie Sticks", percentage: 16 },
          { name: "Avocado Toast", percentage: 84 }
        ]
      },
      interactions: {
        comments: 39,
        likes: 82
      },
      mentions: [
        { name: 'Daniel Lee', avatar: 'https://i.ibb.co/S3QRdcX/AVATAR-Citra-Gunasiwi-for-Paperpillar.jpg' },
        { name: 'Sophia Garcia', avatar: 'https://i.ibb.co/BKststd4/AVATAR-Dribble.jpg' },
        { name: 'William Chen', avatar: 'https://i.ibb.co/BKststd4/AVATAR-Dribble.jpg' }
      ]
    },
    {
      id: 4,
      isPinned: false,
      author: {
        name: 'Maria Rodriguez',
        avatar: 'https://i.ibb.co/BKststd4/AVATAR-Dribble.jpg'
      },
      time: '5h ago',
      space: '⭐ Weekly Review',
      text: "Every day I see hundreds (probably thousands) of you posting new copy reviews in threads, reviewing each other's copy, and leveling up together. Just wanted to pop in and say how proud I am of this community!",
      interactions: {
        comments: 156,
        likes: 324
      },
      mentions: [
        { name: 'Alex Martinez', avatar: 'https://i.ibb.co/S3QRdcX/AVATAR-Citra-Gunasiwi-for-Paperpillar.jpg' },
        { name: 'Rachel Kim', avatar: 'https://i.ibb.co/BKststd4/AVATAR-Dribble.jpg' },
        { name: 'Thomas Wright', avatar: 'https://i.ibb.co/BKststd4/AVATAR-Dribble.jpg' }
      ]
    }
  ];

  const sidebarLinks = [
    { icon: '💎', text: '1-on-1 4DCI Mentorship' },
    { icon: '✍️', text: '4D Copywriting Academy 2.0' },
    { icon: '🗺️', text: '4D Copywriters Map' }
  ];

  const communityStats = [
    { label: 'Learners', value: '44.8k' },
    { label: 'Posts', value: '2.4k' },
    { label: 'Mods', value: '4' }
  ];

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num;
  };

  return (
    
      <div className="w-full  p-4 relative">
    

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6 relative">
          {/* Left Column: Posts */}
          <div className="relative">
            {/* Spaces Selection */}
            <div className="flex items-center gap-2 mb-6 relative overflow-hidden">
              <div className="flex flex-grow gap-2 overflow-hidden relative">
                {mainSpaces.map((space) => (
                  <button
                    key={space.id}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold flex-shrink-0 border transition-all ${
                      activeSpace === space.name
                        ? 'bg-[#262B3D] text-white border-[#262B3D]'
                        : 'bg-white text-[#3B6E91] border-[#E0E0E0] hover:bg-[#f5f5f5]'
                    }`}
                    onClick={() => setActiveSpace(space.name)}
                  >
                    {space.name}
                  </button>
                ))}
                <div className="absolute right-0 top-0 h-full w-10 bg-gradient-to-r from-transparent to-white pointer-events-none"></div>
              </div>
              
              <button
                className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold bg-transparent text-[#3B6E91] border-[#E0E0E0] border"
                onClick={() => setIsSpacesExpanded(!isSpacesExpanded)}
              >
                {isSpacesExpanded ? 'Less...' : 'More...'}
              </button>
              
              <button
                className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold bg-transparent text-[#3B6E91] border-[#E0E0E0] border relative"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <svg viewBox="0 0 512 512" className='size-5'>
                    <path d="M0 416c0 13.3 10.7 24 24 24l59.7 0c10.2 32.5 40.5 56 76.3 56s66.1-23.5 76.3-56L488 440c13.3 0 24-10.7 24-24s-10.7-24-24-24l-251.7 0c-10.2-32.5-40.5-56-76.3-56s-66.1 23.5-76.3 56L24 392c-13.3 0-24 10.7-24 24zm128 0a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zM320 256a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm32-80c-35.8 0-66.1 23.5-76.3 56L24 232c-13.3 0-24 10.7-24 24s10.7 24 24 24l251.7 0c10.2 32.5 40.5 56 76.3 56s66.1-23.5 76.3-56l59.7 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-59.7 0c-10.2-32.5-40.5-56-76.3-56zM192 128a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm76.3-56C258.1 39.5 227.8 16 192 16s-66.1 23.5-76.3 56L24 72C10.7 72 0 82.7 0 96s10.7 24 24 24l91.7 0c10.2 32.5 40.5 56 76.3 56s66.1-23.5 76.3-56L488 120c13.3 0 24-10.7 24-24s-10.7-24-24-24L268.3 72z" fill="currentColor"></path>
                </svg>
              </button>
              
              {/* Filter Tooltip */}
              {isFilterOpen && (
                <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-md p-4 min-w-[280px] z-10">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-semibold text-[#262B3D] mb-3">Filter</h3>
                      {['None', 'Pinned (3)'].map((option) => (
                        <div 
                          key={option}
                          className="flex items-center gap-2 mb-2 cursor-pointer"
                          onClick={() => setFilterOption(option)}
                        >
                          <div className={`w-[18px] h-[18px] border-2 rounded-full flex items-center justify-center relative ${
                            filterOption === option ? 'border-[#02C5AF]' : 'border-[#E0E0E0]'
                          }`}>
                            {filterOption === option && (
                              <div className="w-2.5 h-2.5 bg-[#02C5AF] rounded-full absolute"></div>
                            )}
                          </div>
                          <span className="text-sm text-[#262B3D]">{option}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-semibold text-[#262B3D] mb-3">Sort</h3>
                      {[
                        'Recent activity',
                        'Newest post',
                        'Best: Today',
                        'Best: Week',
                        'Best: Month',
                        'Best: Year',
                        'Best: All-time'
                      ].map((option) => (
                        <div 
                          key={option}
                          className="flex items-center gap-2 mb-2 cursor-pointer"
                          onClick={() => setSortOption(option)}
                        >
                          <div className={`w-[18px] h-[18px] border-2 rounded-full flex items-center justify-center relative ${
                            sortOption === option ? 'border-[#02C5AF]' : 'border-[#E0E0E0]'
                          }`}>
                            {sortOption === option && (
                              <div className="w-2.5 h-2.5 bg-[#02C5AF] rounded-full absolute"></div>
                            )}
                          </div>
                          <span className="text-sm text-[#262B3D]">{option}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Hidden Spaces */}
            {isSpacesExpanded && (
              <div className="flex flex-wrap gap-2 mb-6">
                {hiddenSpaces.map((space) => (
                  <button
                    key={space.id}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
                      activeSpace === space.name
                        ? 'bg-[#262B3D] text-white border-[#262B3D]'
                        : 'bg-white text-[#3B6E91] border-[#E0E0E0] hover:bg-[#f5f5f5]'
                    }`}
                    onClick={() => setActiveSpace(space.name)}
                  >
                    {space.name}
                  </button>
                ))}
              </div>
            )}

            {/* Posts */}
            <div className="flex flex-col gap-4">
              {posts.map((post) => (
                <div key={post.id} className="border border-[#E0E0E0] rounded-xl overflow-hidden">
                  {post.isPinned && (
                    <div className="bg-[#F0F7FF] py-2 px-4 flex items-center gap-2 font-semibold text-sm text-[#262B3D]">
                      <svg viewBox="0 0 24 24" className="w-4 h-4">
                        <path d="M16 12V4h1V2H7v2h1v8l-2 2v2h5v6h2v-6h5v-2l-2-2z"></path>
                      </svg>
                      Pinned
                    </div>
                  )}
                  <div className="p-4">
                    {/* Post Header */}
                    <div className="flex gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden relative flex-shrink-0">
                        <Image 
                          src="https://i.ibb.co/BKststd4/AVATAR-Dribble.jpg" 
                          alt={post.author.name} 
                          width={40} 
                          height={40} 
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <div className="font-semibold text-sm text-[#262B3D]">{post.author.name}</div>
                        <div className="text-xs text-[#3B6E91]">{post.time} in {post.space}</div>
                      </div>
                    </div>
                    
                    {/* Post Body */}
                    <div className="flex gap-4 justify-between items-start mb-4 relative">
                      <div className="text-sm text-[#262B3D] leading-relaxed flex-1 line-clamp-2">
                        {post.text}
                      </div>
                      {post.image && (
                        <div className="w-[120px] h-[80px] rounded-lg overflow-hidden relative flex-shrink-0">
                          <Image 
                            src="https://i.ibb.co/jJ4GHXP/img1.jpg" 
                            alt="Post image" 
                            width={120} 
                            height={80} 
                            className="object-cover"
                          />
                        </div>
                      )}
                    </div>
                    
                    {/* Poll if exists */}
                    {post.hasPoll && post.poll && (
                      <div className="bg-[#F8F9FD] border border-[#E0E0E0] rounded-lg p-4 w-full max-w-[300px] mb-4">
                        <div className="font-semibold text-sm text-[#262B3D] mb-3">{post.poll.title}</div>
                        {post.poll.options.map((option, idx) => (
                          <div key={idx} className="flex items-center gap-2 mb-2 relative">
                            <div 
                              className="absolute left-0 top-0 h-full bg-[#02C5AF] opacity-10 rounded"
                              style={{ width: `${option.percentage}%` }}
                            ></div>
                            <div className="flex-1 text-sm text-[#262B3D] z-[1]">{option.name}</div>
                            <div className="text-sm text-[#3B6E91] font-semibold">{option.percentage}%</div>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {/* Post Footer */}
                    <div className="flex items-center gap-4 pt-3 border-t border-[#E0E0E0] relative">
                      <div className="flex items-center gap-1.5 text-sm text-[#3B6E91]">
                        <svg viewBox="0 0 24 24" className="w-4 h-4">
                          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z"></path>
                        </svg>
                        {formatNumber(post.interactions.comments)}
                      </div>
                      <div className="flex items-center gap-1.5 text-sm text-[#3B6E91]">
                        <svg fill="none" viewBox="-3 -4 24 24" className="w-4 h-4">
                          <path 
                            strokeLinejoin="round" 
                            strokeLinecap="round" 
                            strokeWidth="1.5" 
                            stroke="currentColor" 
                            d="M1.304 3.64a4 4 0 016.524-1.297l.465.464a1 1 0 001.414 0l.465-.464A4 4 0 1115.828 8l-6.12 6.121a1 1 0 01-1.415 0L2.172 8a4 4 0 01-.868-4.36z"
                          ></path>
                        </svg>
                        {formatNumber(post.interactions.likes)}
                      </div>
                      
                      {/* Mentions */}
                      <div className="flex items-center h-6">
                        {post.mentions.map((mention, idx) => (
                          <div 
                            key={idx} 
                            className={`w-6 h-6 relative ${idx > 0 ? '-ml-2' : ''}`}
                          >
                            <div className="w-6 h-6 rounded-full border-2 border-white overflow-hidden relative">
                              <Image 
                                src="https://i.ibb.co/S3QRdcX/AVATAR-Citra-Gunasiwi-for-Paperpillar.jpg" 
                                alt={mention.name} 
                                width={24} 
                                height={24} 
                                className="object-cover"
                              />
                            </div>
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-[#262B3D] text-white py-1 px-2 rounded text-xs whitespace-nowrap opacity-0 invisible transition group-hover:opacity-100 group-hover:visible mb-2">
                              {mention.name}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
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
              <h2 className="text-lg font-semibold text-[#262B3D] mb-3">The 4D Copywriting Community</h2>
              <p className="text-sm text-[#3B6E91] leading-relaxed mb-4">
                The best place to be to become a full-time freelance copywriter. Join our community of passionate writers and learn from experienced professionals.
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
                    <div className="text-xs text-[#3B6E91] mb-1 font-semibold">{stat.label}</div>
                    <div className="text-lg font-semibold text-[#262B3D]">{stat.value}</div>
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
                      alt={`Member ${idx+1}`} 
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