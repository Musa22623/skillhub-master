import Image from 'next/image';
import React from 'react';

export default function CourseReviews() {
  return (
    <div className="flex ">
      <div className="w-full max-w-3xl flex justify-center">
        <div className="w-full max-w-3xl bg-white rounded-2xl p-4 lg:p-10 shadow-sm">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4 text-center">Course Reviews</h2>
          <p className="text-center text-gray-600 text-base mb-10">
            Read what other students think about <strong>The Complete Options Course</strong>
          </p>
          
          <div className="flex justify-between items-center bg-sky-50 rounded-xl p-4 lg:p-6 mb-6 lg:mb-10">
            <div className="flex flex-col items-start">
              <div className="text-4xl font-bold text-gray-800 mb-2 tracking-tight">4.3</div>
              <div className="text-lg font-semibold text-teal-500 mb-2">★★★★☆</div>
              <div className="text-sm text-gray-600 font-semibold">43 Reviews</div>
              <div className="flex flex-col lg:flex-row lg:gap-4 mt-1">
                <a href="#" className="text-sm text-teal-500 font-semibold flex items-center gap-1 hover:underline">
                  Write a review →
                </a>
                <a href="#" className="text-sm text-teal-500 font-semibold flex items-center gap-1 hover:underline">
                  See all 73 reviews →
                </a>
              </div>
            </div>
            
            <div className="flex-1 max-w-md pl-10">
              {[
                { stars: 5, percent: 70 },
                { stars: 4, percent: 16 },
                { stars: 3, percent: 0 },
                { stars: 2, percent: 6 },
                { stars: 1, percent: 8 }
              ].map((rating) => (
                <div key={rating.stars} className="flex items-center lg:gap-2 mb-2">
                  <span className="min-w-6 text-gray-600">{rating.stars}</span>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-teal-500" 
                      style={{ width: `${rating.percent}%` }}
                    ></div>
                  </div>
                  <span className="min-w-10 text-right text-sm text-gray-600">{rating.percent}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            {[
              {
                avatar: "https://i.ibb.co/N5kLzSd/AVATAR-couponcodefinder.jpg",
                author: "Shuwang Y.",
                rating: 4.9,
                date: "Jun 22, 2022",
                title: "Learning Python for Data Analysis and Visualization",
                content: "Ansatzweise glaubwdurch Humor oder zufällige Wörter wel che nicht einmal ansatzweiseurdig aussehen. Wenn du eine Passage des Lorem Ipsum nutzt, solltest du aufpassen."
              },
              {
                avatar: "https://i.ibb.co/gLQM1bhc/AVATAR-midtone-ux-instrgram.jpg",
                author: "Kiking A.",
                rating: 5.0,
                date: "Jun 22, 2022",
                title: "Learning Python for Data Analysis and Visualization",
                content: "Ansatzweise glaubwdurch Humor oder zufällige Wörter wel che nicht einmal ansatzweiseurdig aussehen. Wenn du eine Passage des Lorem Ipsum nutzt, solltest du aufpassen."
              }
            ].map((review, index) => (
              <div key={index} className="bg-white rounded-xl p-4 lg:p-6 shadow-sm">
                <div className="flex gap-4 mb-4">
                  <Image
                    src={review.avatar} 
                    alt={review.author} 
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="text-teal-500 font-semibold tracking-wide">{review.author}</div>
                    <div className="flex items-center gap-1 text-sm">
                      <span className="text-teal-500 font-bold">★</span>
                      <span className="text-teal-500 font-semibold">{review.rating}</span>
                      <span className="text-gray-600">{review.date}</span>
                    </div>
                  </div>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">{review.title}</h3>
                <p className="text-gray-600 text-xs lg:text-sm leading-relaxed mb-4">{review.content}</p>
                <div className="text-gray-400 text-sm mb-4">Published 3 weeks ago</div>
                <div className="flex gap-6 text-gray-600 text-sm">
                  <button className="flex items-center gap-2 cursor-pointer">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                    </svg>
                    <span className="font-semibold">Helpful</span>
                  </button>
                  <button className="flex items-center gap-2 cursor-pointer">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-3"></path>
                    </svg>
                    <span className="font-semibold">Not Helpful</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center text-sm lg:text-base mt-6 lg:mt-8">
            <a href="#" className="flex items-center gap-2 text-teal-500 font-semibold hover:underline">
              <span>VIEW ALL REVIEWS</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}