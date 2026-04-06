import { useState } from "react";
import { Checkbox } from "@/app/components/ui/checkbox";
import { Button } from "@/app/components/ui/button";
import { ChevronDown, CircleAlert, RefreshCw } from "lucide-react";
// Define types for our data
type CouponType = "Percentage" | "Fixed";

interface CouponDetails {
  prefix: string;
  quantity: number;
  used: number;
  expiryDate: string;
}

interface Coupon {
  id: string;
  code: string;
  type: CouponType;
  value: string;
  created: string;
  modified: string;
  details: CouponDetails;
}

export default function CouponManagement() {
  const [displayCoupons, setDisplayCoupons] = useState(false);
  const filterOptions = [
    "Highest Discount",
    "Lowest Discount",
    "Recently Created",
    "Do Not Display",
  ];

  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Toggle row expansion
  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const [selected, setSelected] = useState<string>(filterOptions[0]);

  const handleSelect = (option: string) => {
    setSelected(option);
    console.log("Selected filter:", option);
  };

  // Sample data
  const coupons: Coupon[] = [
    {
      id: "1",
      code: "SUMMER24A",
      type: "Percentage",
      value: "20%",
      created: "Dec 15, 2024",
      modified: "Dec 15, 2024",
      details: {
        prefix: "SUMMER",
        quantity: 500,
        used: 175,
        expiryDate: "Oct 18, 2024",
      },
    },
    {
      id: "2",
      code: "HOLIDAY24A",
      type: "Fixed",
      value: "$50.00",
      created: "Dec 10, 2024",
      modified: "Dec 12, 2024",
      details: {
        prefix: "HOLIDAY",
        quantity: 1000,
        used: 180,
        expiryDate: "Dec 31, 2024",
      },
    },
    {
      id: "3",
      code: "NEWYEAR25",
      type: "Percentage",
      value: "25%",
      created: "Dec 20, 2024",
      modified: "Dec 20, 2024",
      details: {
        prefix: "NEWYEAR",
        quantity: 750,
        used: 38,
        expiryDate: "Jan 15, 2025",
      },
    },
  ];
  // Check if a date is expired or expiring soon
  const getExpiryStatus = (dateStr: string) => {
    const expiryDate = new Date(dateStr);
    const now = new Date();
    const daysUntilExpiry = Math.ceil(
      (expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysUntilExpiry < 0) {
      return "expired";
    } else if (daysUntilExpiry <= 30) {
      return "warning";
    }
    return "normal";
  };

  // Format expiry date with warning text if needed
  const formatExpiryDate = (dateStr: string) => {
    const status = getExpiryStatus(dateStr);
    if (status === "warning") {
      return `${dateStr} (Soon)`;
    }
    return dateStr;
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 mt-5">
      <div className="md:w-1/3">
        <h2 className="text-lg font-semibold text-gray-800">
          Coupons & Promotions
        </h2>
        <p className="text-sm text-gray-500 mt-1 mb-4">
          Configure pricing option for your course and linked products
        </p>
      </div>

      <div className="md:w-2/3 bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Coupons & Promotions
        </h3>

        <div className="mb-6">
          <div className="flex items-center mb-4 gap-3">
            <Checkbox
              id="displayCoupons"
              checked={displayCoupons}
              onCheckedChange={() => setDisplayCoupons(!displayCoupons)}
              className="h-4 w-4"
            />
            <label htmlFor="displayCoupons" className="text-sm text-gray-700">
              Display relevant coupons & promotions in the frontend.
            </label>
          </div>

          <div className="flex flex-wrap gap-3">
            {filterOptions.map((option) => (
              <button
                key={option}
                onClick={() => handleSelect(option)}
                className={`px-6 py-3 rounded-lg text-gray-800 text-base font-medium transition-colors ${
                  selected === option
                    ? "bg-black text-white"
                    : "bg-white text-gray-500 border border-gray-200 hover:bg-gray-50"
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          <div className="mt-8 border-b border-gray-300"></div>
        </div>

        <div className="mb-4 flex justify-between items-center">
          <h3 className="text-2xl font-semibold text-gray-700">Coupons</h3>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2 py-6"
          >
            <RefreshCw size={20} />
            Refresh Selected
          </Button>
        </div>

        <div className="overflow-hidden rounded-lg">
        <div className="flex justify-center">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="w-10 bg-gray-50 p-3 text-left">
                  <Checkbox
                    id="displayCoupons"
                    checked={displayCoupons}
                    onCheckedChange={() => setDisplayCoupons(!displayCoupons)}
                    className="h-4 w-4 ml-2"
                  />
                </th>
                <th className="bg-gray-50 p-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Code
                </th>
                <th className="bg-gray-50 p-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Type
                </th>
                <th className="bg-gray-50 p-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Value
                </th>
                <th className="bg-gray-50 p-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Created
                </th>
                <th className="bg-gray-50 p-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Modified
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {coupons.map((coupon) => (
                <>
                  <tr
                    key={coupon.id}
                    className={`${
                      expandedId === coupon.id ? "bg-gray-50" : "bg-white"
                    }`}
                  >
                    <td className="p-4">
                      <button
                        onClick={() => toggleExpand(coupon.id)}
                        className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                        aria-label={
                          expandedId === coupon.id
                            ? "Collapse details"
                            : "Expand details"
                        }
                      >
                        <ChevronDown
                          className={`h-4 w-4 text-gray-500 transition-transform ${
                            expandedId === coupon.id
                              ? "transform rotate-180"
                              : ""
                          }`}
                        />
                      </button>
                    </td>
                    <td className="p-4 font-mono font-medium text-gray-800">
                      {coupon.code}
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          coupon.type === "Percentage"
                            ? "bg-indigo-50 text-indigo-700"
                            : "bg-green-50 text-green-700"
                        }`}
                      >
                        {coupon.type}
                      </span>
                    </td>
                    <td className="p-4 font-medium">{coupon.value}</td>
                    <td className="p-4 relative group">
                      <span>{coupon.created}</span>
                      <div className="absolute invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity z-10 bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded whitespace-nowrap">
                        {coupon.created} 4:33:10 PM
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
                      </div>
                    </td>
                    <td className="p-4 relative group">
                      <span>{coupon.modified}</span>
                      <div className="absolute invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity z-10 bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded whitespace-nowrap">
                        {coupon.modified} 4:33:10 PM
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
                      </div>
                    </td>
                  </tr>
                  {expandedId === coupon.id && (
                    <tr>
                      <td colSpan={6} className="p-0">
                        <div className="flex justify-center px-4 py-2">
                        <div className="w-150 bg-gray-50 ">
                          <table className="w-full border-collapse">
                            <thead className="border-b border-gray-300 p-4">
                              <tr>
                                <th className="bg-gray-100 p-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider rounded-l-md">
                                  Prefix
                                </th>
                                <th className="bg-gray-100 p-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                  Quantity
                                </th>
                                <th className="bg-gray-100 p-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                  Usage
                                </th>
                                <th className="bg-gray-100 p-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider rounded-r-md">
                                  Expires
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="p-3">
                                  <span className="inline-flex items-center px-2 py-1 rounded bg-gray-100 text-xs font-mono font-medium text-gray-700">
                                    {coupon.details.prefix}
                                  </span>
                                </td>
                                <td className="p-3">
                                  <span className="inline-flex items-center px-2 py-1 rounded bg-gray-100 text-xs font-medium text-gray-700">
                                    {coupon.details.quantity} coupons
                                  </span>
                                </td>
                                <td className="p-3">
                                  <div className="flex items-center gap-2">
                                    <div className="flex-grow h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                      <div
                                        className="h-full bg-blue-500 rounded-full"
                                        style={{
                                          width: `${
                                            (coupon.details.used /
                                              coupon.details.quantity) *
                                            100
                                          }%`,
                                        }}
                                      ></div>
                                    </div>
                                    <span className="text-sm text-gray-600">
                                      {coupon.details.used}/
                                      {coupon.details.quantity} used
                                    </span>
                                  </div>
                                </td>
                                <td className="p-3">
                                  <div
                                    className={`flex items-center gap-1 ${
                                      getExpiryStatus(
                                        coupon.details.expiryDate
                                      ) === "expired"
                                        ? "text-red-500"
                                        : getExpiryStatus(
                                            coupon.details.expiryDate
                                          ) === "warning"
                                        ? "text-amber-500"
                                        : "text-gray-600"
                                    }`}
                                  >
                                    <CircleAlert className="h-4 w-4 text-gray-900" />
                                    <span>
                                      {formatExpiryDate(
                                        coupon.details.expiryDate
                                      )}
                                    </span>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
        </div>
      </div>
    </div>
  );
}