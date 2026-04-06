"use client";

import React, { useState } from "react";
import Image from "next/image";
const AccountDetails = () => {
  const [avatar, setAvatar] = useState("/img/person.jpeg");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatar(imageUrl);
    }
  };

  return (
    <div className="container mx-auto p-4 sm:p-8 bg-white rounded-5xl xs:rounded-md">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Account Details</h1>
        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded font-bold text-sm max-sm:w-full hidden xs:block"
        >
          Save
        </button>
      </div>
      {/* <div className=" w-full border-b border-gray-300"></div> */}
      <div className="flex flex-col lg:flex-row mt-6">
        <div className="w-full lg:w-1/2 pr-4 mb-6 lg:mb-0">
          <div className="sm:mb-6">
            <h2 className="font-bold">Details</h2>
            <p className="text-gray-600">Edit your account information, here</p>
          </div>
        </div>
        <div className="w-full lg:w-3/4 bg-white sm:p-6 sm:rounded-lg sm:shadow">
          {/* First Section */}
          <div className="sm:p-4 mb-6">
            <div className="mb-6 max-sm:space-y-2">
              <label className="block text-gray-700 font-bold mb-2">
                First Name
              </label>
              <input
                className="w-full border border-gray-300 p-2 rounded-md"
                placeholder="First Name"
                type="text"
              />
            </div>
            <div className="mb-6 max-sm:space-y-2">
              <label className="block text-gray-700 font-bold mb-2">
                Last Name
              </label>
              <input
                className="w-full border border-gray-300 p-2 rounded-md"
                placeholder="Last Name"
                type="text"
              />
            </div>
            <div className="mb-6 max-sm:space-y-2">
              <label className="block text-gray-700 font-bold mb-2">
                Username
              </label>
              <input
                className="w-full border border-gray-300 p-2 rounded-md"
                placeholder="UserABC"
                type="text"
              />
            </div>
            <div className="mb-6 max-sm:space-y-2">
              <label className="block text-gray-700 font-bold mb-2">
                Email
              </label>
              <div className="flex items-center w-full border border-gray-300 rounded-md px-3 py-2">
                <input
                  className="w-full bg-transparent outline-none"
                  type="email"
                  placeholder="abc@gmail.com"
                />
                <button className="text-black-300 font-semibold whitespace-nowrap ml-3">
                  Change Email
                </button>
              </div>
            </div>
            <div className="mb-6 max-sm:space-y-2">
              <label className="block text-gray-700 font-bold mb-2">
                AccountID
              </label>
              <input
                className="w-full border border-gray-300 p-2 rounded-md"
                type="text"
                placeholder="12345678899"
              />
            </div>
            <div className="grid grid-cols-1 gap-4 mb-6">
              <div>
                <label className="block text-gray-700 font-bold mb-2">
                  Country
                </label>
                <select className="w-full border border-gray-300 p-2 rounded-md">
                  <option value="">Select a country</option>
                  <option value="us">United States</option>
                  <option value="ca">Canada</option>
                  <option value="gb">United Kingdom</option>
                  <option value="in">India</option>
                  <option value="au">Australia</option>
                  <option value="de">Germany</option>
                  <option value="fr">France</option>
                  <option value="it">Italy</option>
                  <option value="es">Spain</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-2">
                  State
                </label>
                <select className="w-full border border-gray-300 p-2 rounded-md">
                  <option value="">Select a state</option>
                  <option value="ca">California</option>
                  <option value="tx">Texas</option>
                  <option value="ny">New York</option>
                  <option value="fl">Florida</option>
                  <option value="il">Illinois</option>
                  <option value="wa">Washington</option>
                  <option value="oh">Ohio</option>
                </select>
              </div>
            </div>

            <div className="sm:border border-gray-300 sm:rounded-lg p-5 flex items-center gap-6 w-full bg-white max-sm:flex-col">
              {/* Left Section - Label & Avatar */}
              <div className="flex flex-col items-center max-sm:w-full">
                <label className="text-gray-700 font-bold max-sm:self-start mb-2">
                  Avatar
                </label>
                <div className="w-24 h-24 overflow-hidden rounded-full ">
                  <Image
                    src={avatar}
                    alt="User Avatar"
                    width={100}
                    height={100}
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Right Section - Upload Button */}
              <div className="flex flex-col-reverse sm:flex-col gap-2">
                <p className="text-gray-600">
                  Recommended dimensions of <strong>100×100</strong>
                </p>

                <label className="flex max-sm:justify-center max-sm:self-center items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full w-fit sm:w-50 cursor-pointer border border-gray-300 text-gray-700 text-xs">
                  <Image
                    src="/img/blank-page.png"
                    alt="password icon"
                    width={24}
                    height={24}
                    className="rounded-md"
                  />
                  <span className="font-bold text-md ">Upload Avatar</span>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Second Section */}

      <div className="flex flex-col lg:flex-row sm:mt-4">
        <div className="w-full lg:w-1/2 pr-4 sm:mb-6 lg:mb-0">
          <div className="mb-6">
            <h2 className="font-bold">Social Profile</h2>
            <p className="text-gray-600">
              Edit information displayed publicly on course details page &amp;
              communities
            </p>
          </div>
        </div>
        <div className="w-full lg:w-3/4 bg-white sm:p-6 sm:rounded-lg sm:shadow">
          <div className="sm:p-4 ">
            <div className="mb-6 max-sm:space-y-2">
              <label className="block text-gray-700 font-bold mb-2">Bio</label>
              <textarea
                className="w-full border border-gray-300 p-2 rounded-md"
                placeholder="Public Bio"
              ></textarea>
            </div>
            <div className="mb-6 max-sm:space-y-2">
              <label className="block text-gray-700 font-bold mb-2">
                Facebook
              </label>
              <input
                className="w-full border border-gray-300 p-2 rounded-md"
                placeholder="Facebook URL"
                type="text"
              />
            </div>
            <div className="mb-6 max-sm:space-y-2">
              <label className="block text-gray-700 font-bold mb-2">
                Twitter
              </label>
              <input
                className="w-full border border-gray-300 p-2 rounded-md"
                placeholder="Twitter URL"
                type="text"
              />
            </div>
            <div className="mb-6 max-sm:space-y-2">
              <label className="block text-gray-700 font-bold mb-2">
                LinkedIn
              </label>
              <input
                className="w-full border border-gray-300 p-2 rounded-md"
                placeholder="LinkedIn URL"
                type="text"
              />
            </div>
          </div>
        </div>
      </div>

      {/* third Section */}

      <div className="flex flex-col lg:flex-row sm:mt-4">
        <div className="w-full lg:w-1/2 pr-4 sm:mb-6 lg:mb-0">
          <div className="mb-6  max-sm:space-y-2">
            <h2 className="font-bold">Payment Info</h2>
            <p className="text-gray-600">Edit payment information.</p>
          </div>
        </div>
        <div className="w-full lg:w-3/4 bg-white sm:p-6 sm:rounded-lg sm:shadow">
          <div className="sm:p-4 ">
            <div className="mb-6  max-sm:space-y-2">
              <label className="block text-gray-700 font-bold mb-2">
                PayPal Email
              </label>
              <input
                className="w-full border border-gray-300 p-2 rounded-md"
                placeholder="PayPal Email"
                type="email"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-2">
                Zelle Email
              </label>
              <input
                className="w-full border border-gray-300 p-2 rounded-md"
                placeholder="Zelle Email"
                type="email"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex sm:justify-end sm:mt-4 max-sm:mb-18 max-sm:mt-15 max-xs:w-full ">
        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded font-bold text-sm max-sm:w-full"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default AccountDetails;
