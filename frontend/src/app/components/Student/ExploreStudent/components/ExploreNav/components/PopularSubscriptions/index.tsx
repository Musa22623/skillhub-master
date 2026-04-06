import React from 'react';
import Image from 'next/image';
import img1 from "@/assets/explore/pricing-panel-green.png";
import img2 from "@/assets/explore/pricing-panel-blue-light.png";
import img3 from "@/assets/explore/pricing-panel-blue-dark.png";
export const PopularSubscriptions = () => {
  const subscriptionPlans = [
    {
      name: "Learn",
      description: "Start learning with our free plan. Dive into thousands of free courses (no credit card required).",
      price: "Free",
      priceDetail: "",
      titleCount: "2,000+ titles",
      videoHours: "24,000",
      videoHoursText: "hours of video",
      features: [],
      buttonText: "Downgrade",
      buttonColor: "bg-blue-400",
      bgColor: "bg-white",
      textColor: "text-gray-800",
      highlightColor: "text-blue-400",
      img :''
    },
    {
      name: "Personal",
      description: "Dive into a collection of top-rated courses in tech, business, and more",
      price: "$29",
      priceDetail: "/year",
      titleCount: "",
      features: [
        "5,000+ titles",
        "50,000 hrs of video included",
        "Unlimited standard certificates"
      ],
      buttonText: "Downgrade",
      buttonColor: "bg-white",
      buttonTextColor: "text-green-500",
      bgColor: "bg-[#6ccb7f] text-white ",
      textColor: "text-white",
      img :img1
    },
    {
      name: "Business",
      description: "Accelerate your learning journey with high-impact courses.",
      price: "$49",
      priceDetail: "/year",
      titleCount: "",
      features: [
        "10,000+ titles",
        "100,000 hrs of video included",
        "Unlimited standard certificates",
        "5+ premium certificates"
      ],
      buttonText: "Cancel",
      buttonColor: "bg-white",
      buttonTextColor: "text-blue-500",
      bgColor: "bg-[#2f97d2] text-white ",
      textColor: "text-white",
      img :img2,
    },
    {
      name: "Team",
      description: "Empower your team to develop skills in all areas of business",
      price: "$20",
      priceDetail: "/year/user",
      titleCount: "",
      showTeamSize: true,
      features: [
        "12,000+ titles",
        "120,000 hrs of audio per year",
        "Unlimited standard certificates",
        "5 premium certificates / year"
      ],
      buttonText: "Upgrade",
      buttonColor: "bg-white",
      buttonTextColor: "text-blue-700",
      bgColor: "bg-[#006bbc] text-white ",
      textColor: "text-white",
      img :img3
    }
  ];

  const teamSizes = [3, 5, 10, 25, 50, 100, 200];

  return (
    <div className="bg-white p-8 rounded-lg shadow-sm">
      <div className="flex items-center flex-col md:flex-row gap-4 justify-between mb-4">
        <h1 className="text-[22px] font-bold">Popular Instructors</h1>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      
        {subscriptionPlans.map((plan, index) => (
          
          <div 
            key={index} 
            className={`${plan.bgColor} rounded-lg shadow p-6  ${plan.textColor}`}
          >
            {plan.img && (
              <Image
                src={plan.img}
                alt={plan.name}
                width={200}
                height={200}
                className="absolute ml-[38px] -mt-[24px] "
              />
            )}
            <h2 className="text-[32px] font-bold h-[40px] my-[20px] mb-[16px] leading-[1.2] relative ">{plan.name}</h2>
            <p className="text-[16px] leading-[1.5] opacity-90 h-[72px] overflow-hidden text-ellipsis mb-[32px] relative  line-clamp-3">
              {plan.description}
            </p>
            
            <div className="mb-4">
              <div className="flex items-baseline">
                <span className="text-[48px] font-bold">{plan.price}</span>
                <span className="ml-1">{plan.priceDetail}</span>
              </div>
              {plan.titleCount && (
                <div className="text-gray-600 mt-1">{plan.titleCount}</div>
              )}
            </div>
            
            {plan.videoHours && (
              <div className="mb-8 h-[100px] flex flex-col gap-2 my-6 relative ">
                <div className={`text-[#4fbae9] text-[24px] font-semibold  ${plan.highlightColor || ''}`}>{plan.videoHours}</div>
                <div className="text-gray-600">{plan.videoHoursText}</div>
              </div>
            )}
            
            {plan.showTeamSize && (
              <div className="mb-6">
                <p className="font-semibold">Team size</p>
                <div className="flex justify-between mt-4 mb-2">
                  {teamSizes.map((size, i) => (
                    <span key={i} className="text-sm">{size}</span>
                  ))}
                </div>
                <div className="flex items-center mt-2">
                  <p className="font-semibold">3 TEAM MEMBERS <span className="inline-block ml-1 border border-white rounded-full w-5 h-5 text-center text-xs">i</span></p>
                </div>
              </div>
            )}
            
            {plan.features.length > 0 && (
              <ul className="space-y-2 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <span className="inline-block mt-1.5 mr-2 w-2 h-2 bg-white rounded-full"></span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            )}
            
            <button 
              className={`w-full py-3 px-4 ${plan.buttonColor} ${plan.buttonTextColor || 'text-white'} rounded-full font-semibold mt-auto `}
            >
              {plan.buttonText}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
