// "use client";
// import React, { useState } from "react";
// import Finance from "@/assets/explore/finance.png";
// import Image from "next/image";

// export default function Topics() {
//   const buttons = [
//     {
//       img: Finance,
//       name: "Finance",
//     },
//     {
//       img: Finance,
//       name: "Lifestyle",
//     },
//     {
//       img: Finance,
//       name: "Entertainment",
//     },
//     {
//       img: Finance,
//       name: "Science",
//     },
//     {
//       img: Finance,
//       name: "Health",
//     },
//     {
//       img: Finance,
//       name: "Brazil",
//     },

//     {
//       img: Finance,
//       name: "Australia",
//     },
//     {
//       img: Finance,
//       name: "Switzerland",
//     },
//     {
//       img: Finance,
//       name: "Egypt",
//     },

//     {
//         img: Finance,
//         name: "France",
//       },
//       {
//         img: Finance,
//         name: "Georgia",
//       },
//       {
//         img: Finance,
//         name: "Russia",
//       },
//       {
//         img: Finance,
//         name: "italy",
//       },
 
//   ];
//   return (
//     <div className="bg-white p-8 rounded-lg shadow-sm mb-4">
//       <div className="flex items-center flex-col md:flex-row gap-4 justify-between mb-4">
//         <h1 className="text-[22px] font-bold">Topics</h1>
//       </div>
      
//       <div className="flex flex-wrap relative left-3 pt-4">
//         {buttons.map((course, index) => (
//           <div
//             key={index}
//             className="bg-gray-100 rounded-full  flex gap-2 px-5 py-2 items-center flex-wrap m-2.5"
//           >
//             {/* Course Image */}
//             <div className="relative">
//               <Image
//                 alt=""
//                 className="bg-white rounded-full p-1.5"
//                 src={course.img}
//                 width="35"
//                 height="35"
//               />
//             </div>
//             <div className="font-semibold">{course.name}</div>

//             {/* Course Stats */}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
