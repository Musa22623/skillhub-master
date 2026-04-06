"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Award,
  BookOpen,
 
  Clock,
  MoreHorizontal,
  Users,
} from "lucide-react";
import { BlueStarSvg } from "@/app/components/svg";

interface CourseCardProps {
  title: string;
  author: string;
  image: string;
  price: string;
  originalPrice: string;
  rating: number;
  reviews: number;
  level: string;
  duration: string;
  students: string;
  productType: string;
  points: string[];
}

export function CourseCard({
  title,
  author,
  image,
  price,
  originalPrice,
  rating,
  reviews,
 productType,
  duration,
  students,

}: CourseCardProps) {
  const [, setIsHovered] = useState(false);

  return (
    <div
      className="relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card Header */}
      <div className="flex items-center justify-between border-b bg-gray-50 px-4 py-3">
        <div className="flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
          <BookOpen className="h-4 w-4" />
          <span>{productType.charAt(0).toUpperCase() + productType.slice(1)}</span>
          {/* <span>
            {" "}
            {productType.charAt(0).toUpperCase() + productType.slice(1)}
          </span> */}
        </div>
        <button className="text-gray-500">
          <MoreHorizontal className="h-5 w-5" />
        </button>
      </div>

      {/* Card Content */}
      <div className="relative flex w-full">
        <div className="mb-4 w-34 h-22 flex-none mx-3 mt-4 ">
          <Image
            src={image || "/placeholder.svg?height=160&width=280"}
            alt={title}
            width={146}
            height={94}
            className="object-cover w-full h-full rounded-xl"
          />
        </div>

        <div className="p-3">
          <h3 className=" text-md font-semibold text-gray-800 line-clamp-2">
            {title} 
          </h3>
          <p className="mb-0.5 text-sm font-semibold text-[#3B6E91]"> {author}</p>

          {/* <div className="mb-4 flex items-center gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-1.5">
              <Users className="h-4 w-4 text-gray-600" />
              <span>{students}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-gray-600" />
              <span>{duration}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <BookOpen className="h-4 w-4 text-gray-600" />
              <span>{level}</span>
            </div>
          </div> */}

          <div className="mb-4 flex items-baseline gap-2">
            <span className="text-lg font-semibold text-teal-500">{price}</span>
            <span className="text-sm text-gray-500 line-through">
              {originalPrice}
            </span>
          </div>

         
        </div>

        {/* Hover Overlay */}
        {/* {isHovered && (
          <div className="absolute inset-0 flex flex-col justify-between bg-white/98 p-5">
            <div>
              <h3 className="mb-3 text-base font-semibold text-gray-800">{title}</h3>

              <div className="mb-2 flex items-center gap-4 text-xs text-gray-500">
                <div className="group relative flex items-center gap-1.5">
                  <BookOpen className="h-4 w-4 text-teal-500" />
                  <span>16 Units</span>
                  <div className="invisible absolute -left-2 bottom-full mb-2 rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-all group-hover:visible group-hover:opacity-100">
                    16 Learning Units
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <Award className="h-4 w-4 text-teal-500" />
                  <span>Certificate</span>
                </div>
              </div>

              <p className="mb-3 text-sm text-gray-500">by {author}</p>

              <div className="mb-1 h-px bg-gray-200"></div>

              <h4 className="mb-2 mt-3 text-xs font-semibold text-gray-800">What you'll learn</h4>

              <div className="space-y-2">
                {points.map((point, index) => (
                  <div key={index} className="group relative flex gap-2 text-xs text-gray-600">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-teal-500" />
                    <p className="line-clamp-2">{point}</p>
                    <div className="invisible absolute -left-2 top-0 w-60 rounded bg-gray-800 px-3 py-2 text-xs text-white opacity-0 transition-all group-hover:visible group-hover:opacity-100">
                      {point}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button className="flex-1 rounded-lg bg-gray-100 py-2.5 text-sm font-semibold text-gray-800 transition-colors hover:bg-gray-200">
                More Info
              </button>
              <button className="flex-1 rounded-lg bg-teal-500 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-teal-600">
                Buy Now
              </button>
            </div>
          </div>
        )} */}
      </div>

 {/* Card Footer */}
 <div className="flex items-center justify-between border-t bg-gray-50 px-4 py-3">
            <div className="flex items-center gap-1">
              <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-teal-500 bg-white">
                <Award className="h-3.5 w-3.5 text-teal-500" />
              </div>
              <div className="flex h-7 w-7 -ml-2 items-center justify-center rounded-full border-2 border-teal-500 bg-white">
                <BookOpen className="h-3.5 w-3.5 text-teal-500" />
              </div>
            </div>
            
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-1.5">
              <Users className="h-4 w-4 text-gray-600" />
              <span>{students}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-gray-600" />
              <span>{duration}</span>
            </div>
          
          </div>

            <div className=" items-center flex gap-1">
              <div>
                <BlueStarSvg  className="w-3.5 h-3.5 fill-teal-500 " />
              </div>
             <div className="flex">
             <span className="text-sm font-semibold text-gray-800">
                {rating}
              </span>
              <span className="text-xs text-gray-500 flex items-center">({reviews})</span>
             </div>
            </div>
          </div>
    </div>
  );
}
