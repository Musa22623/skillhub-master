import { useState } from "react";
import {
  ChevronDown,
  ArrowRight,
  Clock,
  
  Video,
  Users,
  Calendar,
} from "lucide-react";
import Image from "next/image";
import { StudentSvg,TimeStampSVG,VideoSvg,StrairSvg } from "@/app/components/svg";

export default function EnrolledEvents() {
  const [isFirstSectionCollapsed, setIsFirstSectionCollapsed] = useState(false);
  const [isSecondSectionCollapsed, setIsSecondSectionCollapsed] =
    useState(false);

  const toggleFirstSection = () => {
    setIsFirstSectionCollapsed(!isFirstSectionCollapsed);
  };

  const toggleSecondSection = () => {
    setIsSecondSectionCollapsed(!isSecondSectionCollapsed);
  };

  return (
    <section className="min-h-screen">
      <div className="bg-blue-50 rounded-xl p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="rounded-full overflow-hidden">
              <Image
                src="https://i.ibb.co/gLQM1bhc/AVATAR-midtone-ux-instrgram.jpg"
                alt="avatar"
                className="w-[48px] h-[48px] rounded-[50%] object-cover"
                width={40}
                height={40}
              />
            </div>
            <h2 className="text-xl font-semibold text-gray-700">
              <span className="text-gray-500 font-normal">
                Enrolled Events by
              </span>{" "}
              <span className="text-gray-800 font-semibold">Ben Smith</span>
            </h2>
          </div>
          <button
            onClick={toggleFirstSection}
            className={`p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all duration-200 ${
              isFirstSectionCollapsed ? "rotate-180" : ""
            }`}
          >
            <ChevronDown className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <div
          className={`transition-all duration-300 overflow-hidden ${
            isFirstSectionCollapsed ? "max-h-0" : "max-h-[2000px]"
          }`}
        >
          <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-md overflow-hidden">
                <Image
                  src="https://i.ibb.co/jJ4GHXP/img1.jpg"
                  alt="3D UX Journey"
                  className="w-full h-full object-cover"
                  width={32}
                  height={32}
                />
              </div>
              <span className="font-semibold text-gray-800">
                The 3D UX Journey
              </span>
            </div>
            <a
              href="#"
              className="flex items-center gap-2 text-blue-500 hover:text-blue-700 transition-colors"
            >
              View Event
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {/* 1:1 Session Card */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 hover:transform hover:-translate-y-1 hover:shadow-md hover:border-cyan-400 transition-all duration-200">
              <div className="relative w-full h-36 bg-gray-50 rounded-xl flex items-center justify-center mb-4 overflow-hidden">
                <Calendar className="w-16 h-16 text-cyan-400" />
                <div className="absolute bottom-0 left-0 right-0 bg-black/5 py-2 px-3 text-sm text-gray-600 font-semibold text-center backdrop-blur-sm">
                  1:1 Session
                </div>
              </div>
              <h3 className="text-base font-semibold text-gray-800 mb-3 leading-tight">
                Creating Engaging Learning Journeys: UI/UX Best Practices
              </h3>
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center bg-gray-100 rounded-full px-1 py-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                    className="w-5 h-5 text-gray-600"
                    height="100%"
                    width="100%"
                  >
                    <path
                      fill="currentColor"
                      d="m15.474 11.793-5.366 5.367a1 1 0 0 1-1.414-1.414l5.366-5.367h-3.586a1 1 0 1 1 0-2h6a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0v-3.586Z"
                    ></path>
                    <path
                      fill="currentColor"
                      d="M22.938 12.914c0 5.523-4.478 10-10 10-5.523 0-10-4.477-10-10s4.477-10 10-10c5.522 0 10 4.477 10 10Zm-2 0a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z"
                      clipRule="evenodd"
                      
                    ></path>
                  </svg>
                  <span className="text-xs font-semibold text-gray-700 px-2">
                    Book Now
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5 text-gray-500">
                    <StudentSvg className="size-5 text-gray-500" />
                    <span className="text-xs font-semibold">12.5K</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span className="text-xs font-semibold">3 Resources</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Zoom Card */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 hover:transform hover:-translate-y-1 hover:shadow-md hover:border-cyan-400 transition-all duration-200">
              <div className="relative w-full h-36 bg-gray-50 rounded-xl flex items-center justify-center mb-4 overflow-hidden">
                <Video className="w-16 h-16 text-cyan-400" />
                <div className="absolute bottom-0 left-0 right-0 bg-black/5 py-2 px-3 text-sm text-gray-600 font-semibold text-center backdrop-blur-sm">
                  Zoom
                </div>
              </div>
              <h3 className="text-base font-semibold text-gray-800 mb-3 leading-tight">
                Understanding User Research and Analysis
              </h3>
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center bg-gray-100 rounded-full px-1 py-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                    className="w-5 h-5 text-gray-600"
                    height="100%"
                    width="100%"
                  >
                    <path
                      fill="currentColor"
                      d="m15.474 11.793-5.366 5.367a1 1 0 0 1-1.414-1.414l5.366-5.367h-3.586a1 1 0 1 1 0-2h6a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0v-3.586Z"
                    ></path>
                    <path
                      fill="currentColor"
                      d="M22.938 12.914c0 5.523-4.478 10-10 10-5.523 0-10-4.477-10-10s4.477-10 10-10c5.522 0 10 4.477 10 10Zm-2 0a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z"
                      clipRule="evenodd"
                      
                    ></path>
                  </svg>
                  <span className="text-xs font-semibold text-gray-700 px-2">
                    Book Now
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5 text-gray-500">
                    <StudentSvg className="w-4 h-4 text-gray-500" />
                    <span className="text-xs font-semibold">8.2K</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span className="text-xs font-semibold">5 Resources</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-md overflow-hidden">
                <Image
                  src="https://i.ibb.co/jJ4GHXP/img1.jpg"
                  alt="3D UX Journey"
                  className="w-full h-full object-cover"
                  width={32}
                  height={32}
                />
              </div>
              <span className="font-semibold text-gray-800">
                The 3D UX Journey
              </span>
            </div>
            <a
              href="#"
              className="flex items-center gap-2 text-blue-500 hover:text-blue-700 transition-colors"
            >
              View Event
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Group Session Card */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 hover:transform hover:-translate-y-1 hover:shadow-md hover:border-cyan-400 transition-all duration-200">
              <div className="relative w-full h-36 bg-gray-50 rounded-xl flex items-center justify-center mb-4 overflow-hidden">
                <Users className="w-16 h-16 text-cyan-400" />
                <div className="absolute bottom-0 left-0 right-0 bg-black/5 py-2 px-3 text-sm text-gray-600 font-semibold text-center backdrop-blur-sm">
                  Group Session
                </div>
              </div>
              <h3 className="text-base font-semibold text-gray-800 mb-3 leading-tight">
                Advanced UI Pattern Analysis Workshop
              </h3>
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center bg-gray-100 rounded-full px-1 py-1">
                  <ArrowRight className="w-5 h-5 text-gray-600" />
                  <span className="text-xs font-semibold text-gray-700 px-2">
                    Book Now
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5 text-gray-500">
                    <StudentSvg className="w-4 h-4 text-gray-500" />
                    <span className="text-xs font-semibold">15.3K</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span className="text-xs font-semibold">3 Resources</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Available Events Section */}
      <div className="bg-blue-50 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="rounded-md overflow-hidden">
              <Image
                src="https://i.ibb.co/gLQM1bhc/AVATAR-midtone-ux-instrgram.jpg"
                alt="company logo"
                className="w-10 h-10 object-cover bg-blue-500"
                width={40}
                height={40}
              />
            </div>
            <h2 className="text-xl font-semibold text-gray-700">
              <span className="text-gray-500 font-normal">
                Available Events by
              </span>{" "}
              <span className="text-gray-800 font-semibold">Ben Smith</span>
            </h2>
          </div>
          <button
            onClick={toggleSecondSection}
            className={`p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all duration-200 ${
              isSecondSectionCollapsed ? "rotate-180" : ""
            }`}
          >
            <ChevronDown className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <div
          className={`transition-all duration-300 overflow-hidden ${
            isSecondSectionCollapsed ? "max-h-0" : "max-h-[2000px]"
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Design Systems Workshop Card */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md hover:border-cyan-400 transition-all duration-200">
              <div className="relative w-full h-48 overflow-hidden p-4 ">
                <Image
                  src="https://i.ibb.co/jJ4GHXP/img1.jpg"
                  alt="Design Systems Workshop"
                  className="w-full h-full object-cover rounded-lg"
                  width={400}
                  height={200}
                />
              </div>
              <div className="item center w-[90%] mx-auto">
                <div className="bg-gray-50 rounded-lg p-3 my-4">
                  <div className="flex gap-2 mb-2 overflow-hidden p-1 transition-transform duration-300 ease-in-out">
                    {/* Thumbnail 1 */}
                    <div className="flex-none w-12 h-12 bg-white rounded-lg flex items-center justify-center border border-slate-200">
                      <TimeStampSVG className="size-5" fill="#00BCD4"/>
                    </div>

                    {/* Thumbnail 2 */}
                    <div className="flex-none w-12 h-12 bg-white rounded-lg flex items-center justify-center border border-slate-200">
                      <VideoSvg className="size-5" fill="#00BCD4"/>
                    </div>

                    {/* Thumbnail 3 */}
                    <div className="flex-none w-12 h-12 bg-white rounded-lg flex items-center justify-center border border-slate-200">
                      <VideoSvg className="size-5" fill="#00BCD4"/>
                    </div>

                    {/* Thumbnail 4 */}
                    <div className="flex-none w-12 h-12 bg-white rounded-lg flex items-center justify-center border border-slate-200">
                      <StrairSvg className="w-4 h-4" fill={"#00BCD4"} />
                    </div>
                  </div>

                  {/* View All Sessions Button */}
                  <button className="w-full py-2 flex items-center justify-center gap-1 bg-transparent border-none border-t border-gray-200 text-gray-500 text-sm cursor-pointer">
                    
                    <span>More Sessions</span>
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M6 9L12 15L18 9"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="p-4">
                <div className="mb-3">
                  <a
                    href="#"
                    className="text-lg font-semibold text-gray-800"
                  >
                    Design Systems Workshop
                  </a>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-semibold">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                      className="w-4 h-4 mr-2"
                    >
                      <path
                        fill="currentColor"
                        d="M10.3031 4.71338C10.638 4.71338 10.9096 4.98493 10.9096 5.3199V5.62947C11.7726 5.74654 12.5494 6.11208 13.0363 6.67319C13.2559 6.92617 13.2288 7.30925 12.9758 7.52881C12.7229 7.74837 12.3398 7.72128 12.1202 7.4683C11.8892 7.20209 11.4627 6.96219 10.9096 6.85747V9.13097C11.5063 9.2117 12.0549 9.41056 12.4966 9.70499C13.0803 10.0941 13.5358 10.6984 13.5358 11.4478C13.5358 12.1973 13.0803 12.8015 12.4966 13.1907C12.0549 13.4851 11.5063 13.684 10.9096 13.7647V14.0741C10.9096 14.4091 10.638 14.6806 10.3031 14.6806C9.9681 14.6806 9.69656 14.4091 9.69656 14.0741V13.7645C8.83357 13.6474 8.0568 13.2819 7.5698 12.7208C7.35024 12.4678 7.37733 12.0847 7.63031 11.8652C7.88329 11.6456 8.26636 11.6727 8.48592 11.9257C8.71697 12.1919 9.14345 12.4318 9.69656 12.5365V10.263C9.09982 10.1823 8.55128 9.98342 8.10959 9.68899C7.52581 9.29985 7.07031 8.69563 7.07031 7.94614C7.07031 7.19665 7.52581 6.59244 8.10959 6.2033C8.55128 5.90886 9.09982 5.71 9.69656 5.62928V5.3199C9.69656 4.98493 9.9681 4.71338 10.3031 4.71338ZM9.69656 6.85766C9.33347 6.92644 9.02055 7.0539 8.78241 7.21264C8.4157 7.45709 8.28336 7.7283 8.28336 7.94614C8.28336 8.16399 8.4157 8.4352 8.78241 8.67964C9.02055 8.83839 9.33347 8.96585 9.69656 9.03463V6.85766ZM10.9096 10.3594V12.5363C11.2727 12.4675 11.5856 12.3401 11.8237 12.1813C12.1905 11.9369 12.3228 11.6657 12.3228 11.4478C12.3228 11.23 12.1905 10.9588 11.8237 10.7143C11.5856 10.5556 11.2727 10.4281 10.9096 10.3594Z"
                        clipRule="evenodd"
                        
                      ></path>
                      <path
                        fill="currentColor"
                        d="M10.3399 2.51392C6.38177 2.51392 3.1731 5.72259 3.1731 9.6807C3.1731 13.6388 6.38177 16.8475 10.3399 16.8475C14.298 16.8475 17.5067 13.6388 17.5067 9.6807C17.5067 5.72259 14.298 2.51392 10.3399 2.51392ZM1.9231 9.6807C1.9231 5.03224 5.69142 1.26392 10.3399 1.26392C14.9883 1.26392 18.7567 5.03224 18.7567 9.6807C18.7567 14.3292 14.9883 18.0975 10.3399 18.0975C5.69142 18.0975 1.9231 14.3292 1.9231 9.6807Z"
                        clipRule="evenodd"
                        
                      ></path>
                    </svg>
                    <span>$199.00</span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <svg fill="none" viewBox="0 0 20 20" className="w-4 h-4">
                        <path
                          fill="currentColor"
                          d="M9.72154 3.47033C9.90035 3.39881 10.0998 3.39881 10.2786 3.47033L18.612 6.80366C18.8967 6.91756 19.0834 7.19334 19.0834 7.50002V12.5C19.0834 12.9142 18.7476 13.25 18.3334 13.25C17.9192 13.25 17.5834 12.9142 17.5834 12.5V8.6078L15.7501 9.34113V13.3334C15.7501 14.4243 14.9016 15.2566 13.871 15.7719C12.8053 16.3048 11.4126 16.5834 10.0001 16.5834C8.58758 16.5834 7.19484 16.3048 6.12914 15.7719C5.09852 15.2566 4.25008 14.4243 4.25008 13.3334V9.34113L1.38821 8.19638C1.10346 8.08248 0.916748 7.8067 0.916748 7.50002C0.916748 7.19334 1.10346 6.91756 1.38821 6.80366L9.72154 3.47033ZM5.29422 8.14324C5.2838 8.13879 5.27326 8.13457 5.2626 8.13059L3.68619 7.50002L10.0001 4.97446L16.314 7.50002L14.7376 8.13059C14.7269 8.13457 14.7164 8.13879 14.7059 8.14323L10.0001 10.0256L5.29422 8.14324ZM5.75008 9.94113V13.3334C5.75008 13.5685 5.95521 14.0079 6.79996 14.4303C7.60962 14.8351 8.76042 15.0834 10.0001 15.0834C11.2397 15.0834 12.3905 14.8351 13.2002 14.4303C14.0449 14.0079 14.2501 13.5685 14.2501 13.3334V9.94113L10.2786 11.5297C10.0998 11.6012 9.90035 11.6012 9.72154 11.5297L5.75008 9.94113Z"
                          clipRule="evenodd"
                          
                        ></path>
                      </svg>
                      <span>9.8K</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <svg
                        height="16"
                        width="16"
                        viewBox="0 0 32 32"
                        className="w-4 h-4"
                      >
                        <path
                          fill="currentColor"
                          d="M10.8571 26.2857C10.8571 27.2325 10.0896 28 9.14286 28H5.71429C4.76751 28 4 27.2325 4 26.2857V22C4 21.0532 4.76751 20.2857 5.71429 20.2857H9.14286C10.0896 20.2857 10.8571 21.0532 10.8571 22V26.2857ZM19.4286 26.2857V14.2857C19.4286 13.3389 18.6611 12.5714 17.7143 12.5714H14.2857C13.3389 12.5714 12.5714 13.3389 12.5714 14.2857V26.2857C12.5714 27.2325 13.3389 28 14.2857 28H17.7143C18.6611 28 19.4286 27.2325 19.4286 26.2857ZM21.1429 26.2857C21.1429 27.2325 21.9104 28 22.8571 28H26.2857C27.2325 28 28 27.2325 28 26.2857V5.71429C28 4.76751 27.2325 4 26.2857 4H22.8571C21.9104 4 21.1429 4.76751 21.1429 5.71429V26.2857ZM17.7143 14.2857H14.2857V26.2857H17.7143V14.2857ZM26.2857 5.71429H22.8571V26.2857H26.2857V5.71429Z"
                          clipRule="evenodd"
                          
                        ></path>
                      </svg>
                      <span className="font-semibold">Advanced</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* UX Research Masterclass Card */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md hover:border-cyan-400 transition-all duration-200">
              <div className="relative w-full h-48 overflow-hidden p-4">
                <Image
                  src="https://i.ibb.co/k67BZds/community-image1.png"
                  alt="UX Research Masterclass"
                  className="w-full h-full object-cover rounded-lg"
                  width={400}
                  height={200}
                />
              </div>
              <div className="item center w-[90%] mx-auto">
                <div className="bg-gray-50 rounded-lg p-3 my-4">
                  <div className="flex gap-2 mb-2 overflow-hidden p-1 transition-transform duration-300 ease-in-out">
                    {/* Thumbnail 1 */}
                    <div className="flex-none w-12 h-12 bg-white rounded-lg flex items-center justify-center border border-slate-200">
                    
                      <TimeStampSVG className="size-5" fill="#00BCD4"/>
                    </div>

                    {/* Thumbnail 2 */}
                    <div className="flex-none w-12 h-12 bg-white rounded-lg flex items-center justify-center border border-slate-200">
                      <VideoSvg className="size-5" fill="#00BCD4"/>
                    </div>

                    {/* Thumbnail 3 */}
                    <div className="flex-none w-12 h-12 bg-white rounded-lg flex items-center justify-center border border-slate-200">
                      <VideoSvg className="size-5" fill="#00BCD4"/>
                    </div>

                    {/* Thumbnail 4 */}
                    <div className="flex-none w-12 h-12 bg-white rounded-lg flex items-center justify-center border border-slate-200">
                      <StrairSvg className="w-4 h-4" fill={"#00BCD4"} />
                    </div>
                  </div>

                  {/* View All Sessions Button */}
                  <button className="w-full py-2 flex items-center justify-center gap-1 bg-transparent border-none border-t border-gray-200 text-gray-500 text-sm cursor-pointer">
                    
                    <span>More Sessions</span>
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M6 9L12 15L18 9"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="p-4">
                <div className="mb-3">
                  <a
                    href="#"
                    className="text-lg font-semibold text-gray-800 "
                  >
                    UX Research Masterclass
                  </a>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-semibold">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                      className="w-4 h-4 mr-2"
                    >
                      <path
                        fill="currentColor"
                        d="M10.3031 4.71338C10.638 4.71338 10.9096 4.98493 10.9096 5.3199V5.62947C11.7726 5.74654 12.5494 6.11208 13.0363 6.67319C13.2559 6.92617 13.2288 7.30925 12.9758 7.52881C12.7229 7.74837 12.3398 7.72128 12.1202 7.4683C11.8892 7.20209 11.4627 6.96219 10.9096 6.85747V9.13097C11.5063 9.2117 12.0549 9.41056 12.4966 9.70499C13.0803 10.0941 13.5358 10.6984 13.5358 11.4478C13.5358 12.1973 13.0803 12.8015 12.4966 13.1907C12.0549 13.4851 11.5063 13.684 10.9096 13.7647V14.0741C10.9096 14.4091 10.638 14.6806 10.3031 14.6806C9.9681 14.6806 9.69656 14.4091 9.69656 14.0741V13.7645C8.83357 13.6474 8.0568 13.2819 7.5698 12.7208C7.35024 12.4678 7.37733 12.0847 7.63031 11.8652C7.88329 11.6456 8.26636 11.6727 8.48592 11.9257C8.71697 12.1919 9.14345 12.4318 9.69656 12.5365V10.263C9.09982 10.1823 8.55128 9.98342 8.10959 9.68899C7.52581 9.29985 7.07031 8.69563 7.07031 7.94614C7.07031 7.19665 7.52581 6.59244 8.10959 6.2033C8.55128 5.90886 9.09982 5.71 9.69656 5.62928V5.3199C9.69656 4.98493 9.9681 4.71338 10.3031 4.71338ZM9.69656 6.85766C9.33347 6.92644 9.02055 7.0539 8.78241 7.21264C8.4157 7.45709 8.28336 7.7283 8.28336 7.94614C8.28336 8.16399 8.4157 8.4352 8.78241 8.67964C9.02055 8.83839 9.33347 8.96585 9.69656 9.03463V6.85766ZM10.9096 10.3594V12.5363C11.2727 12.4675 11.5856 12.3401 11.8237 12.1813C12.1905 11.9369 12.3228 11.6657 12.3228 11.4478C12.3228 11.23 12.1905 10.9588 11.8237 10.7143C11.5856 10.5556 11.2727 10.4281 10.9096 10.3594Z"
                        clipRule="evenodd"
                        
                      ></path>
                      <path
                        fill="currentColor"
                        d="M10.3399 2.51392C6.38177 2.51392 3.1731 5.72259 3.1731 9.6807C3.1731 13.6388 6.38177 16.8475 10.3399 16.8475C14.298 16.8475 17.5067 13.6388 17.5067 9.6807C17.5067 5.72259 14.298 2.51392 10.3399 2.51392ZM1.9231 9.6807C1.9231 5.03224 5.69142 1.26392 10.3399 1.26392C14.9883 1.26392 18.7567 5.03224 18.7567 9.6807C18.7567 14.3292 14.9883 18.0975 10.3399 18.0975C5.69142 18.0975 1.9231 14.3292 1.9231 9.6807Z"
                        clipRule="evenodd"
                        
                      ></path>
                    </svg>
                    <span>$199.00</span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <svg fill="none" viewBox="0 0 20 20" className="w-4 h-4">
                        <path
                          fill="currentColor"
                          d="M9.72154 3.47033C9.90035 3.39881 10.0998 3.39881 10.2786 3.47033L18.612 6.80366C18.8967 6.91756 19.0834 7.19334 19.0834 7.50002V12.5C19.0834 12.9142 18.7476 13.25 18.3334 13.25C17.9192 13.25 17.5834 12.9142 17.5834 12.5V8.6078L15.7501 9.34113V13.3334C15.7501 14.4243 14.9016 15.2566 13.871 15.7719C12.8053 16.3048 11.4126 16.5834 10.0001 16.5834C8.58758 16.5834 7.19484 16.3048 6.12914 15.7719C5.09852 15.2566 4.25008 14.4243 4.25008 13.3334V9.34113L1.38821 8.19638C1.10346 8.08248 0.916748 7.8067 0.916748 7.50002C0.916748 7.19334 1.10346 6.91756 1.38821 6.80366L9.72154 3.47033ZM5.29422 8.14324C5.2838 8.13879 5.27326 8.13457 5.2626 8.13059L3.68619 7.50002L10.0001 4.97446L16.314 7.50002L14.7376 8.13059C14.7269 8.13457 14.7164 8.13879 14.7059 8.14323L10.0001 10.0256L5.29422 8.14324ZM5.75008 9.94113V13.3334C5.75008 13.5685 5.95521 14.0079 6.79996 14.4303C7.60962 14.8351 8.76042 15.0834 10.0001 15.0834C11.2397 15.0834 12.3905 14.8351 13.2002 14.4303C14.0449 14.0079 14.2501 13.5685 14.2501 13.3334V9.94113L10.2786 11.5297C10.0998 11.6012 9.90035 11.6012 9.72154 11.5297L5.75008 9.94113Z"
                          clipRule="evenodd"
                          
                        ></path>
                      </svg>
                      <span>9.8K</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <svg
                        height="16"
                        width="16"
                        viewBox="0 0 32 32"
                        className="w-4 h-4"
                      >
                        <path
                          fill="currentColor"
                          d="M10.8571 26.2857C10.8571 27.2325 10.0896 28 9.14286 28H5.71429C4.76751 28 4 27.2325 4 26.2857V22C4 21.0532 4.76751 20.2857 5.71429 20.2857H9.14286C10.0896 20.2857 10.8571 21.0532 10.8571 22V26.2857ZM19.4286 26.2857V14.2857C19.4286 13.3389 18.6611 12.5714 17.7143 12.5714H14.2857C13.3389 12.5714 12.5714 13.3389 12.5714 14.2857V26.2857C12.5714 27.2325 13.3389 28 14.2857 28H17.7143C18.6611 28 19.4286 27.2325 19.4286 26.2857ZM21.1429 26.2857C21.1429 27.2325 21.9104 28 22.8571 28H26.2857C27.2325 28 28 27.2325 28 26.2857V5.71429C28 4.76751 27.2325 4 26.2857 4H22.8571C21.9104 4 21.1429 4.76751 21.1429 5.71429V26.2857ZM17.7143 14.2857H14.2857V26.2857H17.7143V14.2857ZM26.2857 5.71429H22.8571V26.2857H26.2857V5.71429Z"
                          clipRule="evenodd"
                          
                        ></path>
                      </svg>
                      <span className="font-semibold">Advanced</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Advanced Design Patterns Card */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md hover:border-cyan-400 transition-all duration-200">
              <div className="relative w-full h-48 overflow-hidden p-4">
                <Image
                  src="https://i.ibb.co/5NTkykV/product3.jpg"
                  alt="Advanced Design Patterns"
                  className="w-full h-full object-cover rounded-lg"
                  width={400}
                  height={200}
                />
              </div>
              <div className="item center w-[90%] mx-auto">
                <div className="bg-gray-50 rounded-lg p-3 my-4">
                  <div className="flex gap-2 mb-2 overflow-hidden p-1 transition-transform duration-300 ease-in-out">
                    {/* Thumbnail 1 */}
                    <div className="flex-none w-12 h-12 bg-white rounded-lg flex items-center justify-center border border-slate-200">
                      <TimeStampSVG className="size-5" fill="#00BCD4"/>
                    </div>

                    {/* Thumbnail 2 */}
                    <div className="flex-none w-12 h-12 bg-white rounded-lg flex items-center justify-center border border-slate-200">
                      <VideoSvg className="size-5" fill="#00BCD4"/>
                    </div>

                    {/* Thumbnail 3 */}
                    <div className="flex-none w-12 h-12 bg-white rounded-lg flex items-center justify-center border border-slate-200">
                      <VideoSvg className="size-5" fill="#00BCD4"/>
                    </div>

                    {/* Thumbnail 4 */}
                    <div className="flex-none w-12 h-12 bg-white rounded-lg flex items-center justify-center border border-slate-200">
                      <StrairSvg className="w-4 h-4" fill={"#00BCD4"} />
                    </div>
                  </div>

                  {/* View All Sessions Button */}
                  <button className="w-full py-2 flex items-center justify-center gap-1 bg-transparent border-none border-t border-gray-200 text-gray-500 text-sm cursor-pointer">
                   
                    <span>More Sessions</span>
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M6 9L12 15L18 9"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="p-4">
                <div className="mb-3">
                  <a
                    href="#"
                    className="text-lg font-semibold text-gray-800 "
                  >
                    Advanced Design Patterns
                  </a>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-semibold">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                      className="w-4 h-4 mr-2"
                    >
                      <path
                        fill="currentColor"
                        d="M10.3031 4.71338C10.638 4.71338 10.9096 4.98493 10.9096 5.3199V5.62947C11.7726 5.74654 12.5494 6.11208 13.0363 6.67319C13.2559 6.92617 13.2288 7.30925 12.9758 7.52881C12.7229 7.74837 12.3398 7.72128 12.1202 7.4683C11.8892 7.20209 11.4627 6.96219 10.9096 6.85747V9.13097C11.5063 9.2117 12.0549 9.41056 12.4966 9.70499C13.0803 10.0941 13.5358 10.6984 13.5358 11.4478C13.5358 12.1973 13.0803 12.8015 12.4966 13.1907C12.0549 13.4851 11.5063 13.684 10.9096 13.7647V14.0741C10.9096 14.4091 10.638 14.6806 10.3031 14.6806C9.9681 14.6806 9.69656 14.4091 9.69656 14.0741V13.7645C8.83357 13.6474 8.0568 13.2819 7.5698 12.7208C7.35024 12.4678 7.37733 12.0847 7.63031 11.8652C7.88329 11.6456 8.26636 11.6727 8.48592 11.9257C8.71697 12.1919 9.14345 12.4318 9.69656 12.5365V10.263C9.09982 10.1823 8.55128 9.98342 8.10959 9.68899C7.52581 9.29985 7.07031 8.69563 7.07031 7.94614C7.07031 7.19665 7.52581 6.59244 8.10959 6.2033C8.55128 5.90886 9.09982 5.71 9.69656 5.62928V5.3199C9.69656 4.98493 9.9681 4.71338 10.3031 4.71338ZM9.69656 6.85766C9.33347 6.92644 9.02055 7.0539 8.78241 7.21264C8.4157 7.45709 8.28336 7.7283 8.28336 7.94614C8.28336 8.16399 8.4157 8.4352 8.78241 8.67964C9.02055 8.83839 9.33347 8.96585 9.69656 9.03463V6.85766ZM10.9096 10.3594V12.5363C11.2727 12.4675 11.5856 12.3401 11.8237 12.1813C12.1905 11.9369 12.3228 11.6657 12.3228 11.4478C12.3228 11.23 12.1905 10.9588 11.8237 10.7143C11.5856 10.5556 11.2727 10.4281 10.9096 10.3594Z"
                        clipRule="evenodd"
                        
                      ></path>
                      <path
                        fill="currentColor"
                        d="M10.3399 2.51392C6.38177 2.51392 3.1731 5.72259 3.1731 9.6807C3.1731 13.6388 6.38177 16.8475 10.3399 16.8475C14.298 16.8475 17.5067 13.6388 17.5067 9.6807C17.5067 5.72259 14.298 2.51392 10.3399 2.51392ZM1.9231 9.6807C1.9231 5.03224 5.69142 1.26392 10.3399 1.26392C14.9883 1.26392 18.7567 5.03224 18.7567 9.6807C18.7567 14.3292 14.9883 18.0975 10.3399 18.0975C5.69142 18.0975 1.9231 14.3292 1.9231 9.6807Z"
                        clipRule="evenodd"
                        
                      ></path>
                    </svg>
                    <span>$199.00</span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <svg fill="none" viewBox="0 0 20 20" className="w-4 h-4">
                        <path
                          fill="currentColor"
                          d="M9.72154 3.47033C9.90035 3.39881 10.0998 3.39881 10.2786 3.47033L18.612 6.80366C18.8967 6.91756 19.0834 7.19334 19.0834 7.50002V12.5C19.0834 12.9142 18.7476 13.25 18.3334 13.25C17.9192 13.25 17.5834 12.9142 17.5834 12.5V8.6078L15.7501 9.34113V13.3334C15.7501 14.4243 14.9016 15.2566 13.871 15.7719C12.8053 16.3048 11.4126 16.5834 10.0001 16.5834C8.58758 16.5834 7.19484 16.3048 6.12914 15.7719C5.09852 15.2566 4.25008 14.4243 4.25008 13.3334V9.34113L1.38821 8.19638C1.10346 8.08248 0.916748 7.8067 0.916748 7.50002C0.916748 7.19334 1.10346 6.91756 1.38821 6.80366L9.72154 3.47033ZM5.29422 8.14324C5.2838 8.13879 5.27326 8.13457 5.2626 8.13059L3.68619 7.50002L10.0001 4.97446L16.314 7.50002L14.7376 8.13059C14.7269 8.13457 14.7164 8.13879 14.7059 8.14323L10.0001 10.0256L5.29422 8.14324ZM5.75008 9.94113V13.3334C5.75008 13.5685 5.95521 14.0079 6.79996 14.4303C7.60962 14.8351 8.76042 15.0834 10.0001 15.0834C11.2397 15.0834 12.3905 14.8351 13.2002 14.4303C14.0449 14.0079 14.2501 13.5685 14.2501 13.3334V9.94113L10.2786 11.5297C10.0998 11.6012 9.90035 11.6012 9.72154 11.5297L5.75008 9.94113Z"
                          clipRule="evenodd"
                          
                        ></path>
                      </svg>
                      <span>9.8K</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <svg
                        height="16"
                        width="16"
                        viewBox="0 0 32 32"
                        className="w-4 h-4"
                      >
                        <path
                          fill="currentColor"
                          d="M10.8571 26.2857C10.8571 27.2325 10.0896 28 9.14286 28H5.71429C4.76751 28 4 27.2325 4 26.2857V22C4 21.0532 4.76751 20.2857 5.71429 20.2857H9.14286C10.0896 20.2857 10.8571 21.0532 10.8571 22V26.2857ZM19.4286 26.2857V14.2857C19.4286 13.3389 18.6611 12.5714 17.7143 12.5714H14.2857C13.3389 12.5714 12.5714 13.3389 12.5714 14.2857V26.2857C12.5714 27.2325 13.3389 28 14.2857 28H17.7143C18.6611 28 19.4286 27.2325 19.4286 26.2857ZM21.1429 26.2857C21.1429 27.2325 21.9104 28 22.8571 28H26.2857C27.2325 28 28 27.2325 28 26.2857V5.71429C28 4.76751 27.2325 4 26.2857 4H22.8571C21.9104 4 21.1429 4.76751 21.1429 5.71429V26.2857ZM17.7143 14.2857H14.2857V26.2857H17.7143V14.2857ZM26.2857 5.71429H22.8571V26.2857H26.2857V5.71429Z"
                          clipRule="evenodd"
                          
                        ></path>
                      </svg>
                      <span className="font-semibold">Advanced</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
