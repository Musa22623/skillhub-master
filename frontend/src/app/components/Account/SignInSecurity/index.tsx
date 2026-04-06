/** @format */

"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "../../ui/drawer";
import { Button } from "../../ui/button";
import { X } from "lucide-react";
import {
	TrashIcon
} from '@/app/components/svg';

const SignInSecurity = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const isMobile = useIsMobile();
  const handleEditClick = () => {
    setShowProfile(!showProfile);
  };
  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <>
      <div className="container mx-auto min-h-screen p-4 sm:p-8 bg-white rounded-5xl xs:rounded-md max-xs:pb-20">
        <div className="flex items-center mb-3">
          <h1 className="max-xs:ml-5 text-xl xs:text-2xl font-bold mt-4">
            Sign In & Security
          </h1>
        </div>
        <div className=" w-full border-b border-gray-300"></div>
        <div className="flex flex-col lg:flex-row mt-6">
          <div className="w-full lg:w-1/2 pr-4 mb-6 lg:mb-0">
            <div className="xs:mb-6 max-w-sm max-xs:px-4">
              <h2 className="font-bold mb-1">Password</h2>
              <p className="text-gray-600 text-sm break-words leading-relaxed">
                Keep your security secure by changing your password at least
                every 120 days.
              </p>
            </div>
          </div>

          <div className="w-full max-xs:px-4">
            <div className="flex max-xs:flex-col max-xs:gap-4 items-center justify-between w-full p-5 border border-gray-300 rounded-lg">
              {/* Icon */}
              <div className="max-xs:hidden w-10 h-10 flex items-center justify-center shadow rounded-md p-1 bg-gray-200">
                <Image
                  src="/img/padlock.png"
                  alt="password icon"
                  width={22}
                  height={22}
                  className="rounded-lg"
                />
              </div>

              {/* Text Section */}
              <div className="max-xs:hidden flex-1 mx-4">
                <h3 className="font-semibold text-gray-800">Password</h3>
                <p className="text-gray-600 text-sm">
                  Last changed October 22nd, 2023 03:10
                </p>
              </div>

              <div className=" xs:hidden flex w-full gap-2">
                <div className="w-10 h-10 flex items-center justify-center shadow rounded-md bg-gray-200">
                  <Image
                    src="/img/padlock.png"
                    alt="password icon"
                    width={22}
                    height={22}
                    className="rounded-lg"
                  />
                </div>

                {/* Text Section */}
                <div className="">
                  <h3 className="font-semibold text-gray-800">Password</h3>
                  <p className="text-gray-600 text-sm">
                    Last changed October 22nd, 2023 03:10
                  </p>
                </div>
              </div>

              {/* Button */}
              <button
                className="bg-black text-white px-4 py-2 rounded max-xs:w-full"
                onClick={handleOpenPopup}
              >
                Change Password
              </button>

              {isPopupOpen && !isMobile && (
                <div className="fixed inset-0 bg-black/30  flex justify-center items-center z-50">
                  <div className="bg-white p-8 rounded-lg shadow-lg w-120">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-semibold text-gray-800">
                        Set New Password
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
                    <form className="mt-6">
                      <div className="mb-4">
                        <input
                          className="w-full border border-gray-300 p-3 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                          placeholder="Current password"
                          type="password"
                        />
                      </div>
                      <div className="mb-4">
                        <input
                          className="w-full border border-gray-300 p-3 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                          placeholder="New password"
                          type="password"
                        />
                      </div>
                      <div className="mb-4">
                        <input
                          className="w-full border border-gray-300 p-3 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                          placeholder="Retype new password"
                          type="password"
                        />
                      </div>
                      <div className="flex justify-end mt-4">
                        <button
                          type="submit"
                          className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded-lg font-bold transition"
                        >
                          Save Password
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {isMobile && (
                <Drawer open={isPopupOpen} onOpenChange={setIsPopupOpen}>
                  <DrawerContent>
                    <DrawerHeader className="justify-between items-center flex-row border-b">
                      <DrawerTitle className="text-xl">
                        Change Password
                      </DrawerTitle>
                      <Button
                        onClick={() => setIsPopupOpen(false)}
                        variant={"secondary"}
                      >
                        <X className="size-4" />
                      </Button>
                    </DrawerHeader>

                    <section className="px-4">
                      <form className="mt-6">
                        <div className="mb-4">
                          <input
                            className="w-full border border-gray-300 p-3 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            placeholder="Current password"
                            type="password"
                          />
                        </div>
                        <div className="mb-4">
                          <input
                            className="w-full border border-gray-300 p-3 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            placeholder="New password"
                            type="password"
                          />
                        </div>
                        <div className="mb-4">
                          <input
                            className="w-full border border-gray-300 p-3 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            placeholder="Retype new password"
                            type="password"
                          />
                        </div>

                        <DrawerFooter className="px-0">
                          {" "}
                          <button
                            type="submit"
                            className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 w-full rounded-lg font-bold transition"
                          >
                            Save Password
                          </button>
                        </DrawerFooter>
                      </form>
                    </section>
                  </DrawerContent>
                </Drawer>
              )}

              {/* change password popup end */}
            </div>
          </div>
        </div>

        {/* Second section */}

        <div className="flex flex-col lg:flex-row mt-10 max-xs:px-4">
          <div className="w-full lg:w-1/2 pr-4 mb-6 lg:mb-0">
            <div className="xs:mb-6 max-w-sm">
              <h2 className="font-bold mb-1">Social Account</h2>
              <p className="text-gray-600 text-sm break-words leading-relaxed">
                Connect your social media accounts to make sign in easier
              </p>
            </div>
          </div>

          <div className="w-full border border-gray-300 rounded-md overflow-hidden xs:p-4 bg-white">
            {/* Google Section */}
            <div
              className={`flex flex-col w-full p-4 rounded-md transition-all ${
                showProfile
                  ? "bg-gray-100 border-b border-gray-300 pb-2"
                  : "bg-white"
              }`}
            >
              {/* Top Section */}
              <div className="flex max-xs:flex-col max-xs:gap-2 items-center justify-between w-full">
                {/* Icon */}
                <div className="max-xs:hidden w-10 h-10 flex items-center justify-center shadow rounded-md bg-gray-200">
                  <Image
                    src="/img/google.png"
                    alt="Google icon"
                    width={22}
                    height={22}
                    className="rounded-lg"
                  />
                </div>

                {/* Text Section */}
                <div className="max-xs:hidden flex-1 mx-4">
                  <h3 className="font-semibold text-gray-800">Google</h3>
                  <p className="text-gray-600 text-sm">
                    You are connected to your Google account
                  </p>
                </div>

                <div className="flex xs:hidden">
                  <div className="w-10 h-10 flex items-center justify-center shadow rounded-md bg-gray-200">
                    <Image
                      src="/img/google.png"
                      alt="Google icon"
                      width={22}
                      height={22}
                      className="rounded-lg"
                    />
                  </div>

                  {/* Text Section */}
                  <div className="flex-1 mx-4">
                    <h3 className="font-semibold text-gray-800">Google</h3>
                    <p className="text-gray-600 text-sm">
                      You are connected to your Google account
                    </p>
                  </div>
                </div>

                {/* Button Section */}
                <button
                  className="bg-white text-black max-xs:w-full max-xs:justify-between px-4 py-2 rounded-md border border-black text-sm flex items-center gap-2 font-bold hover:bg-gray-300 transition"
                  onClick={handleEditClick}
                >
                  Edit
                  <Image
                    alt="Edit"
                    height={16}
                    src="/img/down.png"
                    width={16}
                  />
                </button>
              </div>

              {/* Profile Dropdown Section */}
              {showProfile && (
                <div className="w-full max-xs:mt-2  ">
                  <div className="w-full xs:p-4 transition-all">
                    <div className="bg-white p-2 xs:p-4 rounded-lg shadow-md w-full">
                      {/* Heading Row */}
                      <div className="flex w-full  justify-between">
                        <div className="w-1/2 xs:w-1/4 text-center font-semibold text-sm">
                          Profile photo
                        </div>
                        <div className="w-1/2 xs:w-1/4 text-center font-semibold text-sm">
                          Username
                        </div>
                        <div className="w-1/2 xs:w-1/4 text-center font-semibold text-sm">
                          Status
                        </div>
                        <div className="w-1/2 xs:w-1/4 text-center font-semibold text-sm">
                          Actions
                        </div>
                      </div>

                      {/* Content Row */}
                      <div className="flex items-center w-full justify-between pt-2">
                        {/* Profile Photo */}
                        <div className="flex items-center justify-center w-1/2 xs:w-1/4">
                          <Image
                            alt="Profile"
                            src="/img/person.jpeg"
                            width={40}
                            height={40}
                            className="rounded-full bg-gray-300"
                          />
                        </div>

                        {/* Username */}
                        <div className="w-1/2 xs:w-1/4 text-center">
                          <span className="text-sm text-gray-600">
                            abcxy@gmail.com
                          </span>
                        </div>

                        {/* Status */}
                        <div className="w-1/2 xs:w-1/4 flex justify-center">
                          <span className="w-2.5 h-2.5 bg-green-500 rounded-full"></span>
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-col items-center w-1/2 xs:w-1/4 space-y-2">
                          <button className="flex items-center gap-2  px-2 xs:px-4 py-2 border border-gray-300 rounded-md text-sm font-bold text-gray-700 hover:bg-gray-50">
                            <Image
                              alt="Edit"
                              height={16}
                              src="/img/refresh.png"
                              className="max-xs:hidden"
                              width={16}
                            />
                            Reconnect
                          </button>
                          <button className="flex items-center gap-2 px-2 xs:px-4 py-2 border border-gray-300 rounded-md text-sm font-bold text-red-700 hover:bg-gray-50">
                          <TrashIcon className="h-5 w-5"  fill="#ff0000"/>
                            Disconnect
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Border below the google section */}
            <div className=" w-full border-b border-gray-300"></div>

            {/* Facebook Section */}
            <div className="flex max-xs:flex-col max-xs:gap-2 xs:items-center justify-between w-full pb-4 p-4 border-b border-gray-300 bg-white">
              {/* Icon */}
              <div className="max-xs:hidden w-10 h-10 flex items-center justify-center shadow rounded-md p-1 bg-gray-200">
                <Image
                  src="/img/facebook.png"
                  alt="Facebook icon"
                  width={22}
                  height={22}
                  className="rounded-lg"
                />
              </div>

              {/* Text Section */}
              <div className="max-xs:hidden flex-1 mx-4">
                <h3 className="font-semibold text-gray-800">Facebook</h3>
                <p className="text-gray-600 text-sm">
                  Sign in to Punchline using Facebook
                </p>
              </div>

              <div className="xs:hidden flex ">
                {/* Icon */}
                <div className="w-10 h-10 flex items-center justify-center shadow rounded-md p-1 bg-gray-200">
                  <Image
                    src="/img/facebook.png"
                    alt="Facebook icon"
                    width={22}
                    height={22}
                    className="rounded-lg"
                  />
                </div>

                {/* Text Section */}
                <div className="flex-1 mx-4">
                  <h3 className="font-semibold text-gray-800">Facebook</h3>
                  <p className="text-gray-600 text-sm">
                    Sign in to Punchline using Facebook
                  </p>
                </div>
              </div>

              {/* Button */}
              <button
                className="bg-gray-50 text-black px-4 py-1 rounded border border-black-200  hover:bg-gray-300 xs:ml-4 text-sm"
                onClick={() =>
                  window.open(
                    "https://developers.facebook.com/docs/facebook-login",
                    "_blank"
                  )
                }
              >
                Connect to Facebook
              </button>
            </div>

            {/* Twitter Section */}
            <div className="flex max-xs:flex-col max-xs:gap-2 xs:items-center justify-between w-full pb-4 bg-white p-4 mb-2">
              {/* Icon */}
              <div className="max-xs:hidden w-10 h-10 flex items-center justify-center shadow rounded-md p-1 bg-gray-200">
                <Image
                  src="/img/twitter.png"
                  alt="Twitter icon"
                  width={22}
                  height={22}
                  className="rounded-lg"
                />
              </div>

              {/* Text Section */}
              <div className="max-xs:hidden flex-1 mx-4">
                <h3 className="font-semibold text-gray-800">Twitter</h3>
                <p className="text-gray-600 text-sm">
                  Sign in to Punchline using Twitter
                </p>
              </div>

              <div className="flex xs:hidden">
                <div className="w-10 h-10 flex items-center justify-center shadow rounded-md p-1 bg-gray-200">
                  <Image
                    src="/img/twitter.png"
                    alt="Twitter icon"
                    width={22}
                    height={22}
                    className="rounded-lg"
                  />
                </div>

                {/* Text Section */}
                <div className="flex-1 mx-4">
                  <h3 className="font-semibold text-gray-800">Twitter</h3>
                  <p className="text-gray-600 text-sm">
                    Sign in to Punchline using Twitter
                  </p>
                </div>
              </div>

              {/* Button */}
              <button
                className="bg-gray-50 text-black px-4 py-1 rounded border border-black-200  hover:bg-gray-300 xs:ml-4 text-sm"
                onClick={() =>
                  window.open(
                    "https://docs.x.com/resources/fundamentals/authentication/guides/log-in-with-x",
                    "_blank"
                  )
                }
              >
                Connect to Twitter
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignInSecurity;
