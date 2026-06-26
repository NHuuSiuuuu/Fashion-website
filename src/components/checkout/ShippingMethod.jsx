import { formatPrice } from "@/utils/price";
import React from "react";

export default function ShippingMethod({
  selectedWardCode,
  selectedProvinceCode,
  shippingMethod,
  selectedShippingMethod,
  setSelectedShippingMethod
}) {
  return (
    <div>
      {" "}
      {/* Phương thức vận chuyển */}
      <h2 className="mb-[20px] text-[18px] text-[#333333]">
        Phương thức vận chuyển
      </h2>
      {!selectedWardCode ? (
        <div>
          <div className="w-full h-[250px] flex  items-center justify-center border border-[#d9d9d9] rounded-[4px]">
            <div className="flex flex-col items-center justify-center ">
              {!selectedProvinceCode ? (
                <p className="text-[14px] text-[#737373]">
                  Vui lòng chọn tỉnh / thành để có danh sách phương thức vận
                  chuyển.
                </p>
              ) : (
                <p className="text-[14px] text-[#737373]">
                  Vui lòng chọn quận / huyện để có danh sách phương thức vận
                  chuyển.
                </p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div>
          {shippingMethod?.map((item) => (
            <div
              key={item.code}
              className={` flex items-center justify-between  p-4 mb-3 border-2 rounded-lg transition-all duration-300  cursor-pointer group
                              ${
                                selectedShippingMethod === item.code
                                  ? "border-blue-500 bg-blue-50" // Khi được chọn
                                  : "border-gray-200 bg-white hover:border-blue-400 " // Khi hover (không chọn)
                              }`}
              onClick={() => {
                setSelectedShippingMethod(item.code);
              }}
            >
              {/* Left side */}
              <div className="flex items-center space-x-4">
                {/* Info */}
                <div>
                  <p
                    className={`text-sm font-medium transition-colors duration-300`}
                  >
                    {item?.name}
                  </p>
                  <p className="text-xs text-gray-500">{item?.deliveryTime}</p>
                </div>
              </div>

              {/* Right side - Price */}
              <div className="text-right">
                <p
                  className={`text-sm font-semibold transition-colors duration-300`}
                >
                  {formatPrice(item?.fee)}
                </p>
                <p className="text-xs text-green-600">
                  {item?.freeThreshold
                    ? `Free từ ${formatPrice(item?.freeThreshold)}`
                    : "Có phí"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
