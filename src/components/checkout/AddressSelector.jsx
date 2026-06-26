import { ChevronDown } from "lucide-react";
import React from "react";

export default function AddressSelector({
  setSelectedProvinceCode,
  selectedProvinceCode,
  provinces,
  setSelectedDistrictCode,
  selectedDistrictCode,
  districts,
  selectedWardCode,
  setSelectedWardCode,

  wards,
}) {
  return (
    <div className="grid grid-cols-3 gap-4 mb-[15px]">
      {/* Tỉnh */}
      <div className="relative shadow-2xs">
        <select
          value={selectedProvinceCode}
          onChange={(e) => setSelectedProvinceCode(e.target.value)}
          className="w-full px-4 py-3.5 border border-gray-300 rounded-md 
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                    appearance-none bg-white text-gray-700 cursor-pointer
                    hover:border-gray-400 transition-colors duration-300"
        >
          <option value="" className="text-gray-400">
            Chọn tỉnh/thành
          </option>
          {provinces?.map((item) => (
            <option key={item.code} value={item.code}>
              {item.name}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <ChevronDown className="w-5 h-5 text-gray-400" />
        </div>
      </div>

      {/* Huyện*/}
      <div className="relative shadow-2xs">
        <select
          value={selectedDistrictCode}
          onChange={(e) => setSelectedDistrictCode(e.target.value)}
          disabled={!selectedProvinceCode}
          className={`w-full px-4 py-3.5 border rounded-md 
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                    appearance-none text-gray-700 cursor-pointer transition-colors duration-300
                    ${
                      !selectedProvinceCode
                        ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-white border-gray-300 hover:border-gray-400"
                    }`}
        >
          <option value="" className="text-gray-400">
            Chọn quận/huyện
          </option>
          {districts.map((item) => (
            <option key={item.code} value={item.code}>
              {item.name}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <ChevronDown className="w-5 h-5 text-gray-400" />
        </div>
      </div>

      {/* xã */}
      <div className="relative shadow-2xs">
        <select
          value={selectedWardCode}
          onChange={(e) => setSelectedWardCode(e.target.value)}
          disabled={!selectedDistrictCode}
          className={`w-full px-4 py-3.5 border rounded-md 
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                    appearance-none text-gray-700 cursor-pointer transition-colors duration-300
                    ${
                      !selectedDistrictCode
                        ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-white border-gray-300 hover:border-gray-400"
                    }`}
        >
          <option value="" className="text-gray-400">
            Chọn phường/xã
          </option>
          {wards.map((item) => (
            <option key={item.code} value={item.code}>
              {item.name}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <ChevronDown className="w-5 h-5 text-gray-400" />
        </div>
      </div>
    </div>
  );
}
