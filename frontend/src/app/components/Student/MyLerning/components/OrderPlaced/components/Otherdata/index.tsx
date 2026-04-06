"use client";

import Image from "next/image";
import { CalendarSvg, PaidDollerSvg, VideoSvg, RightSvg, CommunitySvg, TreeVerticalDots, StudentSvg, Dashboard1Svg } from "@/app/components/svg";
import { productsData } from './components/productsData';

export default function ProductList() {
  return (
    <>
      <div className="bg-white shadow-sm rounded-lg p-2 sm:p-4 my-6 sm:my-10">
        {productsData.map((product) => (
          <div key={product.id} className="flex flex-col border border-gray-200 rounded-lg overflow-hidden transition-colors duration-200 hover:border-gray-300 mt-4 first:mt-0">
            <div className="flex flex-col sm:flex-row p-3 sm:p-4 w-full">
              {/* Image - Full width on mobile, fixed width on larger screens */}
              <Image
                alt={product.title}
                loading="lazy"
                width="150"
                height="80"
                className="object-cover rounded-lg mb-3 sm:mb-0 sm:mr-4 w-full sm:w-[150px] h-48 sm:h-[80px]"
                src={product.image}
              />
              
              <div className="flex-1 min-w-0 flex flex-col justify-between">
                <h3 className="text-md font-semibold text-gray-900 mb-2 sm:mb-auto leading-6">
                  {product.title}
                </h3>
                
                <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                  <div className="flex items-center gap-2">
                    <span className={`py-1 px-3.5 rounded-2xl text-xs font-semibold whitespace-nowrap leading-4 ${product.typeClass}`}>
                      {product.type}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-3 sm:gap-4 pl-0 sm:pl-3 w-full sm:w-auto my-2 sm:my-0">
                    {product.price && (
                      <div className="flex items-center gap-1.5">
                        <div>
                          <PaidDollerSvg className="w-4 h-4 shrink-0" />
                        </div>
                        <span className="text-sm leading-5 text-gray-500 font-semibold">
                          {product.price.toFixed(2)}
                        </span>
                      </div>
                    )}
                    
                    {product.modules && (
                      <div className="flex items-center gap-1.5">
                        <div className="text-gray-600">
                          <Dashboard1Svg className="size-3" />
                        </div>
                        <span className="text-sm leading-5 text-gray-500 font-semibold">
                          {product.modules}
                        </span>
                      </div>
                    )}
                    
                    {product.expiryDate && (
                      <div className="flex items-center gap-1.5">
                        <div>
                          <CalendarSvg className="w-4 h-4 shrink-0" />
                        </div>
                        <span className="text-sm leading-5 text-gray-500 font-semibold">
                          Expires {product.expiryDate}
                        </span>
                      </div>
                    )}
                    
                    {product.certificateCount && (
                      <div className="flex items-center gap-1.5">
                        <div className="text-gray-500">
                          <CalendarSvg className="w-4 h-4" />
                        </div>
                        <span className="text-sm leading-5 text-gray-500 font-semibold">
                          {product.certificateCount}
                        </span>
                      </div>
                    )}
                    
                    {product.issueDate && (
                      <div className="flex items-center gap-1.5">
                        <div>
                          <CalendarSvg className="w-4 h-4 shrink-0" />
                        </div>
                        <span className="text-sm leading-5 text-gray-500 font-semibold">
                          Issued {product.issueDate}
                        </span>
                      </div>
                    )}
                    
                    {product.progress !== undefined && (
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm leading-5 text-gray-500 font-semibold">
                          Progress:
                        </span>
                        <div className="relative w-6 h-6">
                          <svg viewBox="0 0 24 24" className="w-6 h-6 -rotate-90">
                            <circle
                              className="stroke-gray-200"
                              cx="12"
                              cy="12"
                              r="10"
                              fill="none"
                              strokeWidth="2.5"
                            />
                            <circle
                              className="stroke-cyan-500"
                              cx="12"
                              cy="12"
                              r="10"
                              fill="none"
                              strokeWidth="2.5"
                              strokeDasharray="62.8318530718"
                              strokeDashoffset={`${62.8318530718 * (1 - product.progress / 100)}`}
                              strokeLinecap="round"
                            />
                          </svg>
                        </div>
                        <span className="text-gray-500">{product.progress}%</span>
                      </div>
                    )}
                    
                    {product.lessons && (
                      <div className="flex items-center gap-1.5">
                        <div className="text-gray-600">
                          <Dashboard1Svg className="size-3" />
                        </div>
                        <span className="text-sm leading-5 text-gray-500 font-semibold">
                          {product.lessons}
                        </span>
                      </div>
                    )}
                    
                    {product.duration && (
                      <div className="flex items-center gap-1.5">
                        <div className="relative w-4 h-4 bg-white rounded-full flex items-center justify-center shrink-0">
                          <div className="absolute top-0 left-0 w-full h-full border-[1.5px] rounded-full b-black"></div>
                          <div className="relative w-3.5 h-3.5 flex items-center justify-center">
                            <PaidDollerSvg className="size-3" />
                          </div>
                        </div>
                        <span className="text-sm leading-5 text-gray-500 font-semibold">
                          {product.duration}
                        </span>
                      </div>
                    )}
                    
                    {product.rating && (
                      <div className="flex items-center gap-1.5">
                        <div className="text-gray-600">
                          <StudentSvg className="size-4" />
                        </div>
                        <div className="relative group flex items-center gap-1">
                          <span className="text-gray-500">
                            {product.rating.score}
                          </span>
                          <div className="absolute -top-10 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1.5 px-3 rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-10">
                            Rated {product.rating.score} stars on {product.rating.date}
                            <div className="absolute top-[85%] left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45" />
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {product.lastActive && (
                      <div className="flex items-center gap-1.5">
                        <div>
                          <CalendarSvg className="size-4" />
                        </div>
                        <span className="text-sm leading-5 text-gray-500 font-semibold">
                          Last Active {product.lastActive}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Action buttons - Full width on mobile, fixed width on larger screens */}
              <div className="product-actions flex items-center mt-4 sm:mt-0 sm:ml-4 sm:pl-4 border-t pt-3 sm:pt-0 sm:border-t-0 sm:border-l border-gray-200">
                <button className="flex-1 sm:w-[140px] sm:flex-none py-2 px-4 sm:px-0 bg-cyan-500 text-white border-none text-sm rounded-md font-semibold cursor-pointer text-center transition-all duration-200 ease-in-out hover:bg-cyan-600 active:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-50">
                  View Outline
                </button>
                <button className="ml-3 w-8 h-8 border border-gray-200 rounded-md flex items-center justify-center cursor-pointer transition-colors duration-200 hover:bg-gray-50">
                  <TreeVerticalDots className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            </div>
            
            {product.links && product.links.length > 0 && (
              <div className="bg-gray-50 border-t border-gray-200 px-3 sm:px-4 py-2 flex flex-col gap-2 rounded-b-lg">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  {product.links.map((link, index) => (
                    <div key={index} className="linked-item flex items-center gap-2 cursor-pointer py-1.5 sm:py-0.5 px-1 -mx-1 -my-0.5 rounded-sm transition-colors duration-200 ease-in-out group">
                      <div className="relative w-4 h-4 bg-white rounded-full flex items-center justify-center shrink-0">
                        <div className="absolute top-0 left-0 w-full h-full border-[1.5px] border-cyan-400 rounded-full bg-gradient-to-br from-cyan-100/20 via-cyan-100/20 to-transparent"></div>
                        <div className="relative w-3.5 h-3.5 text-cyan-400 flex items-center justify-center">
                          {link.type === 'session' ? (
                            <VideoSvg className="size-3" fill="#00d3f3" />
                          ) : (
                            <CommunitySvg className="size-3" />
                          )}
                        </div>
                      </div>
                      <div className="flex flex-wrap sm:flex-nowrap items-center gap-1 sm:gap-2 text-xs text-gray-500 flex-1">
                        <span className="text-gray-500">{link.title}</span>
                        <div className="flex flex-wrap sm:flex-nowrap items-center gap-1 w-full sm:w-auto">
                          <span className="text-gray-900 font-semibold group-hover:text-cyan-400 group-hover:underline">
                            {link.items.join(' • ')}
                          </span>
                          <span className="text-gray-500 relative pl-0 sm:pl-2 group-hover:text-cyan-400 group-hover:underline">
                            {link.count} {link.type === 'session' ? 'sessions' : 'Communities'}
                          </span>
                        </div>
                      </div>
                      <div className="w-4 h-4 text-gray-500">
                        <RightSvg className="size-4" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}