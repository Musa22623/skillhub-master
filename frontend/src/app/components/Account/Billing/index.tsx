/** @format */

"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  BookMinus,
  CalendarHeart,
  Wallet,
  GraduationCap,
  X,
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "../../ui/drawer";
import { Button } from "../../ui/button";

const paymentHistory = [
  {
    item: "Advanced Python Course",
    paymentType: "Subscription",
    productType: "Course",
    amount: "$89.00",
    status: "Completed",
    statusColor: "bg-green-500",
    date: "July 9, 2023",
    gateway: "Stripe",
  },
  {
    item: "Web Development Bundle",
    paymentType: "Installment",
    productType: "Bundle",
    amount: "$56.00",
    status: "Pending",
    statusColor: "bg-yellow-400",
    date: "April 18, 2023",
    gateway: "PayPal",
  },
  {
    item: "Mobile App Development...",
    paymentType: "One Off",
    productType: "Subscription",
    amount: "$199.00",
    status: "Rejected",
    statusColor: "bg-red-500",
    date: "April 14, 2023",
    gateway: "Stripe",
  },
  {
    item: "UI/UX Design Masterclass",
    paymentType: "Subscription",
    productType: "Course",
    amount: "$149.99",
    status: "Refunded",
    statusColor: "bg-blue-500",
    date: "March 25, 2023",
    gateway: "PayPal",
  },
];
const Billing = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();
  return (
    <div className="container mx-auto xs:p-8 max-xs:px-4 max-xs:pb-8 bg-white rounded-5xl xs:rounded-md max-xs:mb-18">
      <div className="flex items-center justify-between mb-8  max-xs:py-5 xs:mb-6">
        <h1 className="text-2xl font-bold">Billing</h1>
        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded-md font-bold text-sm max-sm:w-full hidden xs:block"
        >
          Save
        </button>
      </div>
      {/* <div className=' w-full border-b border-gray-300'></div> */}
      <div className="flex flex-col lg:flex-row mt-6">
        <div className="w-full lg:w-1/2 pr-4 xs:mb-6 lg:mb-0">
          <div className="mb-6">
            <h2 className="font-bold mb-1">Billing Information</h2>
            <p className="text-gray-600">Enter your billing information.</p>
          </div>
        </div>
        <div className="w-full lg:w-3/4 bg-white xs:p-3 xs:rounded-lg xs:shadow">
          {/* First Section */}
          <div className="xs:p-2 xs:mb-2">
            <div className="mb-6">
              <label className="block text-gray-700 font-bold mb-2">
                Full Name
              </label>
              <input
                className="w-full border border-gray-300 p-2 rounded-md"
                placeholder="Full Name"
                type="text"
              />
            </div>

            <div className="flex w-full mb-6">
              <div className="w-full">
                <label className="block text-gray-700 mb-2 font-bold">
                  Country or Region
                </label>

                <select className="w-full border border-gray-300 p-2 py-3 rounded-md">
                  <option value="">(None Specified)</option>
                  <option value="Afghanistan">Afghanistan</option>
                  <option value="Albania">Albania</option>
                  <option value="Algeria">Algeria</option>
                  <option value="Andorra">Andorra</option>
                  <option value="Angola">Angola</option>
                  <option value="Anguilla">Anguilla</option>
                  <option value="Antigua and Barbuda">
                    Antigua and Barbuda
                  </option>
                  <option value="Argentina">Argentina</option>
                  <option value="Armenia">Armenia</option>
                  <option value="Aruba">Aruba</option>
                  <option value="Australia">Australia</option>
                  <option value="Austria">Austria</option>
                  <option value="Azerbaijan">Azerbaijan</option>
                  <option value="Bahamas">Bahamas</option>
                  <option value="Bahrain">Bahrain</option>
                  <option value="Bangladesh">Bangladesh</option>
                  <option value="Barbados">Barbados</option>
                  <option value="Belarus">Belarus</option>
                  <option value="Belgium">Belgium</option>
                  <option value="Belize">Belize</option>
                  <option value="Benin">Benin</option>
                  <option value="Bermuda">Bermuda</option>
                  <option value="Bhutan">Bhutan</option>
                  <option value="Bolivia">Bolivia</option>
                  <option value="Bosnia and Herzegovina">
                    Bosnia and Herzegovina
                  </option>
                  <option value="Botswana">Botswana</option>
                  <option value="Brazil">Brazil</option>
                  <option value="British Indian Ocean Territory">
                    British Indian Ocean Territory
                  </option>
                  <option value="Brunei">Brunei</option>
                  <option value="Bulgaria">Bulgaria</option>
                  <option value="Burkina Faso">Burkina Faso</option>
                  <option value="Burundi">Burundi</option>
                  <option value="Cambodia">Cambodia</option>
                  <option value="Cameroon">Cameroon</option>
                  <option value="Canada">Canada</option>
                  <option value="Cape Verde">Cape Verde</option>
                  <option value="Cayman Islands">Cayman Islands</option>
                  <option value="Central African Republic">
                    Central African Republic
                  </option>
                  <option value="Chad">Chad</option>
                  <option value="Chile">Chile</option>
                  <option value="China">China</option>
                  <option value="Christmas Island">Christmas Island</option>
                  <option value="Cocos (Keeling) Islands">
                    Cocos (Keeling) Islands
                  </option>
                  <option value="Colombia">Colombia</option>
                  <option value="Comoros">Comoros</option>
                  <option value="Congo">Congo</option>
                  <option value="Cook Islands">Cook Islands</option>
                  <option value="Costa Rica">Costa Rica</option>
                  <option value="Croatia">Croatia</option>
                  <option value="Cuba">Cuba</option>
                  <option value="Cyprus">Cyprus</option>
                  <option value="Czech Republic">Czech Republic</option>
                  <option value="Denmark">Denmark</option>
                  <option value="Djibouti">Djibouti</option>
                  <option value="Dominica">Dominica</option>
                  <option value="Dominican Republic">Dominican Republic</option>
                  <option value="Ecuador">Ecuador</option>
                  <option value="Egypt">Egypt</option>
                  <option value="El Salvador">El Salvador</option>
                  <option value="Equatorial Guinea">Equatorial Guinea</option>
                  <option value="Eritrea">Eritrea</option>
                  <option value="Estonia">Estonia</option>
                  <option value="Ethiopia">Ethiopia</option>
                  <option value="Falkland Islands">Falkland Islands</option>
                  <option value="Faroe Islands">Faroe Islands</option>
                  <option value="Fiji">Fiji</option>
                  <option value="Finland">Finland</option>
                  <option value="France">France</option>
                  <option value="French Polynesia">French Polynesia</option>
                  <option value="Gabon">Gabon</option>
                  <option value="Gambia">Gambia</option>
                  <option value="Georgia">Georgia</option>
                  <option value="Germany">Germany</option>
                  <option value="Ghana">Ghana</option>
                  <option value="Gibraltar">Gibraltar</option>
                  <option value="Greece">Greece</option>
                  <option value="Greenland">Greenland</option>
                  <option value="Grenada">Grenada</option>
                  <option value="Guadeloupe">Guadeloupe</option>
                  <option value="Guam">Guam</option>
                  <option value="Guatemala">Guatemala</option>
                  <option value="Guernsey">Guernsey</option>
                  <option value="Guinea">Guinea</option>
                  <option value="Guinea-Bissau">Guinea-Bissau</option>
                  <option value="Guyana">Guyana</option>
                  <option value="Haiti">Haiti</option>
                  <option value="Heard Island and McDonald Islands">
                    Heard Island and McDonald Islands
                  </option>
                  <option value="Honduras">Honduras</option>
                  <option value="Hong Kong">Hong Kong</option>
                  <option value="Hungary">Hungary</option>
                  <option value="Iceland">Iceland</option>
                  <option value="India">India</option>
                  <option value="Indonesia">Indonesia</option>
                  <option value="Iran">Iran</option>
                  <option value="Iraq">Iraq</option>
                  <option value="Ireland">Ireland</option>
                  <option value="Isle of Man">Isle of Man</option>
                  <option value="Israel">Israel</option>
                  <option value="Italy">Italy</option>
                  <option value="Ivory Coast">Ivory Coast</option>
                  <option value="Jamaica">Jamaica</option>
                  <option value="Japan">Japan</option>
                  <option value="Jersey">Jersey</option>
                  <option value="Jordan">Jordan</option>
                  <option value="Kazakhstan">Kazakhstan</option>
                  <option value="Kenya">Kenya</option>
                  <option value="Kiribati">Kiribati</option>
                  <option value="Kosovo">Kosovo</option>
                  <option value="Kuwait">Kuwait</option>
                  <option value="Kyrgyzstan">Kyrgyzstan</option>
                  <option value="Laos">Laos</option>
                  <option value="Latvia">Latvia</option>
                  <option value="Lebanon">Lebanon</option>
                  <option value="Lesotho">Lesotho</option>
                  <option value="Liberia">Liberia</option>
                  <option value="Libya">Libya</option>
                  <option value="Liechtenstein">Liechtenstein</option>
                  <option value="Lithuania">Lithuania</option>
                  <option value="Luxembourg">Luxembourg</option>
                  <option value="Macau">Macau</option>
                  <option value="Macedonia">Macedonia</option>
                  <option value="Madagascar">Madagascar</option>
                  <option value="Malawi">Malawi</option>
                  <option value="Malaysia">Malaysia</option>
                  <option value="Maldives">Maldives</option>
                  <option value="Mali">Mali</option>
                  <option value="Malta">Malta</option>
                  <option value="Marshall Islands">Marshall Islands</option>
                  <option value="Martinique">Martinique</option>
                  <option value="Mauritania">Mauritania</option>
                  <option value="Mauritius">Mauritius</option>
                  <option value="Mayotte">Mayotte</option>
                  <option value="Mexico">Mexico</option>
                  <option value="Moldova">Moldova</option>
                  <option value="Monaco">Monaco</option>
                  <option value="Mongolia">Mongolia</option>
                  <option value="Montenegro">Montenegro</option>
                  <option value="Montserrat">Montserrat</option>
                  <option value="Morocco">Morocco</option>
                  <option value="Mozambique">Mozambique</option>
                  <option value="Myanmar">Myanmar</option>
                  <option value="Namibia">Namibia</option>
                  <option value="Nauru">Nauru</option>
                  <option value="Nepal">Nepal</option>
                  <option value="Netherlands">Netherlands</option>
                  <option value="New Caledonia">New Caledonia</option>
                  <option value="New Zealand">New Zealand</option>
                  <option value="Nicaragua">Nicaragua</option>
                  <option value="Niger">Niger</option>
                  <option value="Nigeria">Nigeria</option>
                  <option value="Niue">Niue</option>
                  <option value="Norfolk Island">Norfolk Island</option>
                  <option value="North Korea">North Korea</option>
                  <option value="Northern Mariana Islands">
                    Northern Mariana Islands
                  </option>
                  <option value="Norway">Norway</option>
                  <option value="Oman">Oman</option>
                  <option value="Pakistan">Pakistan</option>
                  <option value="Palau">Palau</option>
                  <option value="Panama">Panama</option>
                  <option value="Papua New Guinea">Papua New Guinea</option>
                  <option value="Paraguay">Paraguay</option>
                  <option value="Peru">Peru</option>
                  <option value="Philippines">Philippines</option>
                  <option value="Pitcairn">Pitcairn</option>
                  <option value="Poland">Poland</option>
                  <option value="Portugal">Portugal</option>
                  <option value="Puerto Rico">Puerto Rico</option>
                  <option value="Qatar">Qatar</option>
                  <option value="Réunion">Réunion</option>
                  <option value="Romania">Romania</option>
                  <option value="Russia">Russia</option>
                  <option value="Rwanda">Rwanda</option>
                  <option value="Saint Kitts and Nevis">
                    Saint Kitts and Nevis
                  </option>
                  <option value="Saint Lucia">Saint Lucia</option>
                  <option value="Saint Pierre and Miquelon">
                    Saint Pierre and Miquelon
                  </option>
                  <option value="Saint Vincent and the Grenadines">
                    Saint Vincent and the Grenadines
                  </option>
                  <option value="Samoa">Samoa</option>
                  <option value="San Marino">San Marino</option>
                  <option value="Sao Tome and Principe">
                    Sao Tome and Principe
                  </option>
                  <option value="Saudi Arabia">Saudi Arabia</option>
                  <option value="Senegal">Senegal</option>
                  <option value="Serbia">Serbia</option>
                  <option value="Seychelles">Seychelles</option>
                  <option value="Sierra Leone">Sierra Leone</option>
                  <option value="Singapore">Singapore</option>
                  <option value="Slovakia">Slovakia</option>
                  <option value="Slovenia">Slovenia</option>
                  <option value="Solomon Islands">Solomon Islands</option>
                  <option value="Somalia">Somalia</option>
                  <option value="South Africa">South Africa</option>
                  <option value="South Georgia and the South Sandwich Islands">
                    South Georgia and the South Sandwich Islands
                  </option>
                  <option value="South Korea">South Korea</option>
                  <option value="Spain">Spain</option>
                  <option value="Sri Lanka">Sri Lanka</option>
                  <option value="Sudan">Sudan</option>
                  <option value="Suriname">Suriname</option>
                  <option value="Swaziland">Swaziland</option>
                  <option value="Sweden">Sweden</option>
                  <option value="Switzerland">Switzerland</option>
                  <option value="Syria">Syria</option>
                  <option value="Taiwan">Taiwan</option>
                  <option value="Tanzania">Tanzania</option>
                  <option value="Thailand">Thailand</option>
                  <option value="Timor-Leste">Timor-Leste</option>
                  <option value="Togo">Togo</option>
                  <option value="Tokelau">Tokelau</option>
                  <option value="Tonga">Tonga</option>
                  <option value="Trinidad and Tobago">
                    Trinidad and Tobago
                  </option>
                  <option value="Tunisia">Tunisia</option>
                  <option value="Turkey">Turkey</option>
                  <option value="Turkmenistan">Turkmenistan</option>
                  <option value="Turks and Caicos Islands">
                    Turks and Caicos Islands
                  </option>
                  <option value="Uganda">Uganda</option>
                  <option value="Ukraine">Ukraine</option>
                  <option value="United Arab Emirates">
                    United Arab Emirates
                  </option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="United States">United States</option>
                  <option value="Uruguay">Uruguay</option>
                  <option value="Uzbekistan">Uzbekistan</option>
                  <option value="Vanuatu">Vanuatu</option>
                  <option value="Vatican City State (Holy See)">
                    Vatican City State (Holy See)
                  </option>
                  <option value="Venezuela">Venezuela</option>
                  <option value="Vietnam">Vietnam</option>
                  <option value="Wallis and Futuna">Wallis and Futuna</option>
                  <option value="Yemen">Yemen</option>
                  <option value="Zambia">Zambia</option>
                  <option value="Zimbabwe">Zimbabwe</option>
                </select>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-bold mb-2">
                Address
              </label>
              <input
                className="w-full border border-gray-300 p-2 rounded-md"
                placeholder="Street Address"
                type="text"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2 font-bold">
                City
              </label>
              <div className="flex items-center w-full border border-gray-300 rounded-md px-3 py-2">
                <input
                  className="w-full bg-transparent outline-none mt-1"
                  type="text"
                  placeholder="City"
                />
              </div>
            </div>

            <div className="flex w-full mb-6">
              <div className="w-full">
                <label className="block text-gray-700 mb-1 font-bold">
                  State
                </label>
                <select className="w-full border border-gray-300 p-2 py-3 rounded-md">
                  <option value="">(None Specified)</option>
                </select>
              </div>
            </div>
            <div className="">
              <label className="block text-gray-700 mb-2 font-bold">
                Zip
              </label>
              <input
                className="w-full border border-gray-300 p-2 rounded-md"
                type="text"
                placeholder="Zip Code"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Second Section */}

      <div className="flex flex-col lg:flex-row mt-8 xs:mt-15">
        <div className="w-full lg:w-1/2 pr-4 mb-6 lg:mb-0">
          <div className="xs:mb-6">
            <h2 className="font-bold mb-1">Subscription</h2>
            <p className="text-gray-600">
              Manage your current plan details, or switch Plans.
            </p>
          </div>
        </div>
        <div className="w-full lg:w-3/4 bg-white xs:p-6 xs:rounded-lg xs:shadow">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-lg font-semibold">Professional (monthly)</h2>
              <p className="text-gray-500 mb-2">$89.00 / month</p>
            </div>
            <button className="flex text-nowrap text-gray-600 hover:text-gray-800 hover:underline font-bold text-sm mr-8 gap-1">
              All Plans
              <Image alt="Edit" height={16} src="/img/next.png" width={16} />
            </button>
          </div>

          {/* Divider */}
          <hr className="my-4 border-gray-200" />

          {/* Billing Info */}
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold">Next billing date</h3>
              <p className="text-gray-500 text-sm mb-2">
                December 13, 2023{" "}
                <span className="ml-1">
                  50 days left in current billing cycle
                </span>
              </p>
            </div>
            <button
              className="flex text-nowrap text-gray-600 hover:text-gray-800 hover:underline font-bold text-sm mr-8 gap-1"
              onClick={() => setIsOpen(true)}
            >
              Past Invoices
              <Image alt="Edit" height={16} src="/img/next.png" width={16} />
            </button>
            {/* Popup */}
            {isOpen && !isMobile && (
              <div className="fixed inset-0 bg-black/30  flex justify-center items-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-[95%] max-w-7xl relative z-50">
                  {/* Close button */}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-8 right-8 text-black-500 hover:text-gray-700"
                  >
                    {" "}
                    <Image
                      src="/img/close.png"
                      alt="Close"
                      width={24}
                      height={24}
                      className="cursor-pointer filter grayscale brightness-0 opacity-60 hover:opacity-100 transition-opacity"
                      onClick={() => setIsOpen(false)}
                    />
                  </button>

                  {/* Title */}
                  <h2 className="text-2xl font-bold mb-6">Payment History</h2>

                  <hr className="border border-gray-200 mb-8" />

                  {/* Table */}
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-5 text-left font-bold text-gray-500">
                            Item
                          </th>
                          <th className="px-6 py-5 text-left font-bold text-gray-500">
                            Payment Type
                          </th>
                          <th className="px-6 py-5 text-left font-bold text-gray-500">
                            Product Type
                          </th>
                          <th className="px-6 py-5 text-left font-bold text-gray-500">
                            Amount
                          </th>
                          <th className="px-6 py-5 text-left font-bold text-gray-500">
                            Status
                          </th>
                          <th className="px-6 py-5 text-left font-bold text-gray-500">
                            Date
                          </th>
                          <th className="px-6 py-5 text-left font-bold text-gray-500">
                            Gateway
                          </th>
                          <th className="px-6 py-5 text-left font-bold text-gray-500">
                            Invoice
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-300">
                        {paymentHistory.map((payment, index) => (
                          <tr key={index}>
                            <td className="px-6 py-5 whitespace-nowrap text-md text-gray-900">
                              {payment.item}
                            </td>
                            <td className="px-6 py-5 whitespace-nowrap text-md text-gray-700">
                              {payment.paymentType}
                            </td>
                            <td className="px-6 py-5 whitespace-nowrap text-md text-gray-700 flex items-center gap-2">
                              {payment.productType === "Course" && (
                                <BookMinus
                                  size={20}
                                  className="text-gray-500"
                                />
                              )}
                              {payment.productType === "Bundle" && (
                                <CalendarHeart
                                  size={20}
                                  className="text-gray-500"
                                />
                              )}
                              {payment.productType === "Subscription" && (
                                <Wallet size={20} className="text-gray-500" />
                              )}
                              {payment.productType === "Masterclass" && (
                                <GraduationCap
                                  size={20}
                                  className="text-gray-500"
                                />
                              )}
                              {payment.productType}
                            </td>
                            <td className="px-6 py-5 whitespace-nowrap text-md text-gray-900 font-semibold">
                              {payment.amount}
                            </td>
                            <td className="px-6 py-5 whitespace-nowrap text-md text-gray-700">
                              <span className="flex items-center gap-2">
                                <span
                                  className={`w-2 h-2 rounded-full ${payment.statusColor}`}
                                ></span>
                                {payment.status}
                              </span>
                            </td>
                            <td className="px-6 py-5 whitespace-nowrap text-md text-gray-700">
                              {payment.date}
                            </td>
                            <td className="px-6 py-5 whitespace-nowrap text-md text-gray-700">
                              {payment.gateway}
                            </td>
                            <td className="px-6 py-5 whitespace-nowrap">
                              <button className="px-3 py-1 border border-teal-500  font-bold text-teal-500 rounded hover:bg-blue-50 text-md">
                                Invoice
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {isMobile && (
              <Drawer open={isOpen} onOpenChange={setIsOpen}>
                <DrawerContent className="mb-4 ">
                  <DrawerHeader className="flex-row items-center justify-between border-b">
                    <DrawerTitle>Payment History</DrawerTitle>
                    <Button
                      onClick={() => setIsOpen(false)}
                      variant={"secondary"}
                    >
                      <X className="size-4" />
                    </Button>
                  </DrawerHeader>
                  <section className="p-4 overflow-auto no-scrollbar">
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-5 text-left font-bold text-gray-500">
                              Item
                            </th>
                            <th className="px-6 py-5 text-left font-bold text-gray-500">
                              Payment Type
                            </th>
                            <th className="px-6 py-5 text-left font-bold text-gray-500">
                              Product Type
                            </th>
                            <th className="px-6 py-5 text-left font-bold text-gray-500">
                              Amount
                            </th>
                            <th className="px-6 py-5 text-left font-bold text-gray-500">
                              Status
                            </th>
                            <th className="px-6 py-5 text-left font-bold text-gray-500">
                              Date
                            </th>
                            <th className="px-6 py-5 text-left font-bold text-gray-500">
                              Gateway
                            </th>
                            <th className="px-6 py-5 text-left font-bold text-gray-500">
                              Invoice
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-300">
                          {paymentHistory.map((payment, index) => (
                            <tr key={index}>
                              <td className="px-6 py-5 whitespace-nowrap text-md text-gray-900">
                                {payment.item}
                              </td>
                              <td className="px-6 py-5 whitespace-nowrap text-md text-gray-700">
                                {payment.paymentType}
                              </td>
                              <td className="px-6 py-5 whitespace-nowrap text-md text-gray-700 flex items-center gap-2">
                                {payment.productType === "Course" && (
                                  <BookMinus
                                    size={20}
                                    className="text-gray-500"
                                  />
                                )}
                                {payment.productType === "Bundle" && (
                                  <CalendarHeart
                                    size={20}
                                    className="text-gray-500"
                                  />
                                )}
                                {payment.productType === "Subscription" && (
                                  <Wallet size={20} className="text-gray-500" />
                                )}
                                {payment.productType === "Masterclass" && (
                                  <GraduationCap
                                    size={20}
                                    className="text-gray-500"
                                  />
                                )}
                                {payment.productType}
                              </td>
                              <td className="px-6 py-5 whitespace-nowrap text-md text-gray-900 font-semibold">
                                {payment.amount}
                              </td>
                              <td className="px-6 py-5 whitespace-nowrap text-md text-gray-700">
                                <span className="flex items-center gap-2">
                                  <span
                                    className={`w-2 h-2 rounded-full ${payment.statusColor}`}
                                  ></span>
                                  {payment.status}
                                </span>
                              </td>
                              <td className="px-6 py-5 whitespace-nowrap text-md text-gray-700">
                                {payment.date}
                              </td>
                              <td className="px-6 py-5 whitespace-nowrap text-md text-gray-700">
                                {payment.gateway}
                              </td>
                              <td className="px-6 py-5 whitespace-nowrap">
                                <button className="px-3 py-1 border border-teal-500  font-bold text-teal-500 rounded hover:bg-blue-50 text-md">
                                  Invoice
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </section>
                </DrawerContent>
              </Drawer>
            )}
          </div>

          <hr className="my-4 border-gray-200" />

          {/* Free Trial Info */}
          <p className="text-gray-500 text-sm mt-4">
            Your free trial ends on{" "}
            <span className="font-semibold">Mon, December 5th 2023</span>
          </p>

          {/* Divider */}
          <hr className="my-4 border-gray-200" />

          {/* Actions */}
          <div className="flex justify-between items-center">
            <button className="text-gray-700 hover:text-red-500 text-sm font-semibold">
              Cancel Trial
            </button>
            <button className="bg-black text-white text-sm py-2 px-3 rounded-md">
              Upgrade Plan
            </button>
          </div>
        </div>
      </div>

      <div className="flex xs:justify-end mt-8 xs:mt-4">
        <button
          type="submit"
          className="bg-black max-xs:w-full text-white px-4 py-2 rounded-md font-bold text-sm"
        >
          Save 
        </button>
      </div>
    </div>
  );
};

export default Billing;
