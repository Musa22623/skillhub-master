/** @format */

"use client";
import React, { useState } from "react";

type Notification = {
  type: string;
  browser: boolean;
  onSite: boolean;
};

const Preferences = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [checkboxes, setCheckboxes] = useState({
    loggedInUsers: false,
    guests: false,
    enrolledCourses: true,
    showCommunities: true,
    enrolledEvents: true,
  });
  const [notifications, setNotifications] = useState<Notification[]>([
    { type: "New Login", browser: true, onSite: true },
    { type: "New Comment", browser: true, onSite: true },
    { type: "New Badge", browser: true, onSite: true },
    { type: "Course Enrollment", browser: true, onSite: true },
    { type: "Event Enrollment", browser: true, onSite: true },
    { type: "Event Scheduled", browser: true, onSite: true },
    { type: "Course Unenrollment", browser: true, onSite: true },
    { type: "Certificate Awarded", browser: true, onSite: true },
    { type: "Course Completed", browser: true, onSite: true },
    { type: "Installment Paid", browser: true, onSite: true },
    { type: "Installment Cancelled", browser: true, onSite: true },
    { type: "New Course Published", browser: true, onSite: true },
    { type: "New Topic Started", browser: true, onSite: true },
    { type: "Upcoming Live Session", browser: true, onSite: true },
    { type: "Topic Likes", browser: true, onSite: true },
    { type: "Instructor Promotions", browser: true, onSite: true },
    { type: "Instructor Announcements", browser: true, onSite: true },
    { type: "New Event Published", browser: true, onSite: true },
  ]);

  // Toggle function with proper type annotations
  const toggleNotification = (index: number, key: "browser" | "onSite") => {
    setNotifications((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, [key]: !item[key] } : item
      )
    );
  };

  const [settings, setSettings] = useState([
    { type: "Course Published", browser: true, site: true },
    { type: "Course Rejected", browser: true, site: true },
    { type: "Team Joined", browser: true, site: true },
    { type: "New Sale", browser: true, site: true },
    { type: "New Enrollment", browser: true, site: true },
    { type: "New Follower", browser: true, site: true },
    { type: "Payment Request Approved", browser: true, site: true },
    { type: "Payment Request Rejected", browser: true, site: true },
    { type: "New Subscription", browser: true, site: true },
  ]);

  const toggleSetting = (index: number, key: "browser" | "site") => {
    setSettings((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, [key]: !item[key] } : item
      )
    );
  };

  const handleCheckboxChange2 = (name: string) => {
    setCheckboxes((prev) => ({
      ...prev,
      [name]: !prev[name as keyof typeof prev],
    }));
  };
  

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  return (
    <>
      <div className=" sm:min-h-screen max-xs:p-5 max-xs:bg-background max-xs:rounded-5xl max-xs:mb-16">
        <div className="container max-xs:bg-background mx-auto rounded-md">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold mt-4 mb-6">Preferences</h1>
            <button
              type="submit"
              className="bg-black text-white px-6 py-2 rounded-md font-bold text-sm max-sm:w-full mb-6"
            >
              Save
            </button>
          </div>

          {/* first section */}
          <div className="flex flex-col lg:flex-row">
            <div className="w-full lg:w-1/2 pr-4 xs:mb-8 lg:mb-0">
              <div className="mb-6 max-w-sm">
                <h2 className="font-bold text-xl mb-2">General</h2>
                <p className="text-gray-600 text-sm break-words leading-relaxed">
                  Configure your basic platform preferences, including language
                  settings and automatic enrollment options.
                </p>
              </div>
            </div>
            <div className="xs:bg-gray-50 xs:p-2 rounded-lg xs:border border-gray-200 w-full xs:shadow">
              {/* Language Selection */}
              <div className="mb-4 gap-2 flex max-xs:flex-col xs:items-center hover:bg-gray-100 xs:p-4 rounded-md">
                <label className="block text-gray-700 font-semibold w-1/2 text-left">
                  Language
                </label>
                <select className="block bg-white border border-gray-300 rounded-md py-3 px-2 shadow-sm focus:outline-none sm:text-sm xs:w-1/4">
                  <option value="en">English</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                  <option value="de">Deutsch</option>
                  <option value="it">Italiano</option>
                  <option value="pt">Português</option>
                </select>
              </div>

              {/* Auto-enroll Free Sessions */}
              <div className="mb-4  gap-2 flex max-xs:flex-col xs:items-center hover:bg-gray-100 xs:p-4 rounded-md">
                <label className="block text-gray-700 font-semibold xs:w-1/2">
                  Auto-enroll Free Sessions
                </label>
                <label className="flex cursor-pointer select-none items-center">
                  <div className="relative">
                    {/* Hidden Checkbox */}
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={handleCheckboxChange}
                      className="sr-only peer"
                    />
                    {/* Toggle Background */}
                    <div
                      className={`block h-5 w-10 rounded-full transition ${
                        isChecked ? "bg-blue-500" : "bg-gray-300"
                      }`}
                    ></div>
                    {/* Moving Dot */}
                    <div
                      className={`absolute top-1 h-3 w-3 rounded-full bg-white transition-transform ${
                        isChecked ? "translate-x-6" : "translate-x-1"
                      }`}
                    ></div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* second section */}

          <div className="flex flex-col lg:flex-row py-4 xs:py-20">
            <div className="w-full lg:w-1/2 pr-4 mb-4 xs:mb-8 lg:mb-0">
              <div className="xs:mb-6 max-w-sm">
                <h2 className="font-bold text-xl mb-2">Privacy</h2>
                <p className="xs:text-gray-600 text-sm break-words leading-relaxed">
                  Control who can view your profile and what information is
                  visible to different types of users.
                </p>
              </div>
            </div>

            <div className="xs:bg-gray-50 xs:p-8 rounded-lg xs:border border-gray-200 w-full">
              <div className="hover:bg-gray-100 xs:p-6 rounded-md w-full transition duration-200">
                {/* Parent Checkboxes */}
                <div className="space-y-3 xs:space-y-5">
                  <label className="flex items-center space-x-3 text-gray-800 xs:font-semibold w-full">
                    <input
                      type="checkbox"
                      checked={checkboxes.loggedInUsers}
                      onChange={() => handleCheckboxChange2("loggedInUsers")}
                      className="h-5 w-5 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="w-full">
                      Show profile to logged-in users
                    </span>
                  </label>

                  <label className="flex items-center space-x-3 text-gray-800 xs:font-semibold w-full">
                    <input
                      type="checkbox"
                      checked={checkboxes.guests}
                      onChange={() => handleCheckboxChange2("guests")}
                      className="h-5 w-5 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="w-full">Show profile to guests</span>
                  </label>
                </div>

                {/* Sub Checkboxes */}
                <div className="mt-6 space-y-4 pl-4 xs:pt-4">
                  <label className="flex items-center space-x-3 text-gray-700 w-full">
                    <input
                      type="checkbox"
                      checked={checkboxes.enrolledCourses}
                      onChange={() => handleCheckboxChange2("enrolledCourses")}
                      className="h-5 w-5 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="w-full">Show enrolled courses</span>
                  </label>

                  <label className="flex items-center space-x-3 text-gray-700 w-full">
                    <input
                      type="checkbox"
                      checked={checkboxes.showCommunities}
                      onChange={() => handleCheckboxChange2("showCommunities")}
                      className="h-5 w-5 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="w-full">Show communities</span>
                  </label>

                  <label className="flex items-center space-x-3 text-gray-700 w-full">
                    <input
                      type="checkbox"
                      checked={checkboxes.enrolledEvents}
                      onChange={() => handleCheckboxChange2("enrolledEvents")}
                      className="h-5 w-5 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="w-full">Show enrolled events</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* third section */}

          <div className="flex flex-col lg:flex-row mt-12">
            <div className="w-full lg:w-1/2 pr-4 mb-4 xs:mb-8 lg:mb-0">
              <div className="max-w-sm">
                <h2 className="font-bold text-xl mb-2">CPE</h2>
                <p className="text-gray-600 text-sm break-words leading-relaxed">
                  Set your professional certification details and regulatory
                  requirements for continuing professional education.
                </p>
              </div>
            </div>
            <div className="xs:bg-gray-50 xs:p-2 rounded-lg xs:border border-gray-200 w-full xs:shadow max-xs:space-y-4">
              {/* Language Selection */}
              <div className="gap-2 xs:mb-4 flex max-xs:flex-col xs:items-center hover:bg-gray-100 xs:p-4 rounded-md">
                <label className="block text-gray-700 font-semibold xs:w-1/2 text-left">
                  Qualification
                </label>
                <select className="block bg-white border border-gray-300 rounded-md py-3 px-2 shadow-sm focus:outline-none sm:text-sm xs:w-1/4">
                  <option value="">Select Qualification</option>
                  <option value="cpa">CPA</option>
                  <option value="cfa">CFA</option>
                  <option value="acca">ACCA</option>
                  <option value="cia">CIA</option>
                  <option value="cima">CIMA</option>
                </select>
              </div>

              {/* Auto-enroll Free Sessions */}
              <div className="gap-2 xs:mb-4 flex max-xs:flex-col xs:items-center hover:bg-gray-100 xs:p-4 rounded-md">
                <label className="block text-gray-700 font-semibold xs:w-1/2 text-left">
                  Regulator
                </label>
                <select className="block bg-white border border-gray-300 rounded-md py-3 px-2 shadow-sm focus:outline-none sm:text-sm xs:w-1/4">
                  <option value="">Select Regulator</option>
                  <option value="aicpa">AICPA</option>
                  <option value="cfai">CFAI</option>
                  <option value="acca_global">ACCA Global</option>
                  <option value="iia">IIA</option>
                </select>
              </div>
            </div>
          </div>

          {/* Fourth section */}

          <div className="flex flex-col lg:flex-row mt-12 xs:mt-20 mb-8">
            <div className="w-full lg:w-1/2 pr-4 xs:mb-8 lg:mb-0">
              <div className="max-w-sm">
                <h2 className="font-bold text-xl mb-2">Notifications</h2>
                <p className="text-gray-600 text-sm break-words leading-relaxed">
                  Manage your notification preferences for different activities
                  and events. Choose how you want to be notified for each type
                  of activity.
                </p>
              </div>
            </div>

            <div className="xs:bg-gray-50 xs:p-8 p-4 rounded-lg xs:border border-gray-200 w-full xs:shadow">
              <h3 className="text-xl font-semibold text-gray-900 my-4">
                Student Notifications
              </h3>
              <div className="">
                {/* Table Header */}
                <div className="grid  grid-cols-2 xs:grid-cols-3 max-xs:py-2 xs:p-3 mb-4 text-gray-700 font-semibold max-xs:bg-accent max-xs:rounded ">
                  <div className="hidden xs:block">Notification Type</div>
                  <div className="text-center">Browser</div>
                  <div className="text-center">On Site</div>
                </div>

                {/* Notification List */}
                {notifications.map((item, index) => (
                  <>
                    <div className="text-[14px xs:font-semibold text-[#070606] flex xs:hidden items-center mt-5 gap-2">
                      {item.type}
                    </div>
                    <div
                      key={index}
                      className="grid grid-cols-2 border-b gap-2 xs:grid-cols-3  px-3 py-3 items-center  hover:bg-gray-50 transition"
                    >
                      <div className="hidden text-[14px font-semibold text-[#070606] xs:flex items-center gap-2">
                        {item.type}
                      </div>
                      {/* Browser Toggle */}
                      <div className="flex  max-xs:items-center justify-center">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-10 h-5 bg-gray-300 rounded-full peer-checked:bg-blue-500 peer-checked:after:translate-x-5 after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
                        </label>
                      </div>
                      {/* On-Site Toggle */}
                      <div className="flex justify-center">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            onChange={() => toggleNotification(index, "onSite")}
                          />
                          <div className="w-10 h-5 bg-gray-300 rounded-full peer-checked:bg-blue-500 peer-checked:after:translate-x-5 after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
                        </label>
                      </div>
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>

          {/* Fifth section */}

          <div className="flex flex-col lg:flex-row  xs:mt-20 mb-8">
            <div className="w-full lg:w-1/2 pr-4 xs:mb-8 lg:mb-0"></div>
            <div className="xs:bg-gray-50 xs:p-8 p-4 rounded-lg xs:border border-gray-200 w-full xs:shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Instructor Notifications
              </h3>
              <div className="">
                {/* Table Header */}
                <div className="grid  grid-cols-2 xs:grid-cols-3 max-xs:py-2 xs:p-3 mb-4 text-gray-700 font-semibold max-xs:bg-accent max-xs:rounded ">
                  <div className="hidden xs:block">Notification Type</div>
                  <div className="text-center">Browser</div>
                  <div className="text-center">On Site</div>
                </div>
                {/* Notification List */}
                {settings.map((item, index) => (
                  <>
                    <div className="text-[14px xs:font-semibold text-[#070606] flex xs:hidden items-center mt-5 gap-2">
                      {item.type}
                    </div>
                    <div
                      key={index}
                      className="grid grid-cols-2 border-b gap-2 xs:grid-cols-3  px-3 py-3 items-center  hover:bg-gray-50 transition"
                    >
                      <div className="hidden text-[14px font-semibold text-[#070606] xs:flex items-center gap-2">
                        {item.type}
                      </div>
                      {/* Browser Toggle */}
                      <div className="flex  max-xs:items-center justify-center">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-10 h-5 bg-gray-300 rounded-full peer-checked:bg-blue-500 peer-checked:after:translate-x-5 after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
                        </label>
                      </div>
                      {/* site Toggle */}
                      <div className="flex justify-center">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            onChange={() => toggleSetting(index, "site")}
                          />
                          <div className="w-10 h-5 bg-gray-300 rounded-full peer-checked:bg-blue-500 peer-checked:after:translate-x-5 after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
                        </label>
                      </div>
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end max-xs:mb-6 mt-8">
            <button
              type="submit"
              className="bg-black text-white px-6 py-2 rounded-md font-bold text-sm max-sm:w-full"
            >
              Save 
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Preferences;
