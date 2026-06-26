import { calculateDiscountedPrice, formatPrice } from "@/utils/price";
import React from "react";
import { Link } from "react-router";

export default function ProductList({ carts, provisionalPrice, fee }) {
  return (
    <div className="lg:pt-[56px] lg:pl-[44px] lg:order-2 lg:bg-[#fafafa]">
      {/* Sản phẩm */}
      <div className="mt-[50px]">
        <table className="w-full">
          <tbody>
            {carts?.products?.map((item) => {
              const size = item.product_id.sizes.find(
                (s) => s._id === item.size_id,
              );
              return (
                <tr
                  key={`${item.product_id._id}-${item.size_id}`}
                  className="border-b-[#bcbcbc] border-b-[1px] border-dotted"
                >
                  <td className="p-[10px] w-[100px]">
                    <Link
                      to={`/products/${item?.product_id?.slug}`}
                      className="block"
                    >
                      <div className="aspect-[3/4] overflow-hidden border border-[#ededed]">
                        <img
                          className="md:w-full md:h-full    w-[90px] border-solid border-[#ededed] md:mr-[10px] object-cover overflow-hidden"
                          src={item.product_id?.thumbnail[0]}
                          alt={item.product_id?.title}
                        />
                      </div>
                    </Link>
                  </td>
                  <td className="p-[10px] md:p-[25px] relative">
                    <Link
                      to={`/products/${item?.product_id?.slug}`}
                      className="float-left w-full text-[13px] font-semibold uppercase text-[#a47b67]"
                    >
                      {item.product_id?.title}
                    </Link>
                    {/* Size */}
                    <span className="text-[12px] float-end w-full mt-[5px] mb-3 uppercase">
                      {size?.name}
                    </span>
                    {/* Số lượng */}
                    <span className="float-left w-auto bg-[#ededed] text-center px-3 py-[6px] text-[12px] mr-3 inline-block">
                      {item?.quantity}
                    </span>
                    {/* Giá */}
                    <span className="block float-right leading-[26px] text-[#a47b67] font-medium opacity-70">
                      {formatPrice(
                        item?.quantity *
                          calculateDiscountedPrice(
                            item?.product_id?.price,
                            item?.product_id?.discountPercentage,
                          ),
                      )}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Coupon Section */}
        <div className="relative flex space-x-2">
          <input
            type="text"
            placeholder="Mã giảm giá"
            className="w-full peer border border-[#d9d9d9] rounded-[4px] py-[14px] pr-[40px] pl-[26px] focus:outline-[#338dbc] focus:placeholder-transparent"
          />
          <label className="text-[#333333] font-medium left-[22px] peer-focus:-translate-y-1/2 px-[4px] translate-y-1/2 bg-white transition-all duration-300 opacity-0 peer-focus:opacity-100 absolute peer-not-placeholder-shown:-translate-y-1/2 peer-not-placeholder-shown:opacity-100">
            Mã giảm giá
          </label>
          <button className="px-6 py-3 text-sm font-medium text-white transition-colors bg-gray-800 rounded-lg hover:bg-black whitespace-nowrap">
            Áp dụng
          </button>
        </div>

        {/* Tổng tiền thanh toán */}
        <div className="p-6 ">
          <h3 className="mb-4 text-lg font-semibold text-gray-800">
            Tổng thanh toán
          </h3>

          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Tạm tính</span>
              <span className="font-medium text-gray-800">
                {formatPrice(provisionalPrice)}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Phí vận chuyển</span>
              <span className="font-medium text-gray-800">
                {formatPrice(fee)}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Giảm giá</span>
              <span className="font-medium text-green-600">-0₫</span>
            </div>

            <div className="pt-4 mt-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-gray-800">
                  Tổng cộng
                </span>
                <div className="text-right">
                  <div className="text-2xl font-bold text-amber-700">
                    {formatPrice(provisionalPrice + (fee ?? 0))}
                  </div>
                  <div className="text-xs text-gray-500">Đã bao gồm VAT</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
