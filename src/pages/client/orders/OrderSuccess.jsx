import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { formatPrice } from "@/utils/price";

function OrderSuccess() {
  const [mounted, setMounted] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0); // kéo lên đầu trang khi chuyển từ trang trước sang
    setTimeout(() => setMounted(true), 50);
  }, []);

  const { data } = useQuery({
    queryKey: ["order"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_BACKEND}/order/success/${id}`,
      );
      return data;
    },
  });
  console.log(data?.order.paymentMethod);

  return (
    <div className="min-h-screen ">
      <div
        className={`max-w-2xl mx-auto px-6 py-20 transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
      >
        {/* SUCCESS ICON & MESSAGE */}
        <div className="mb-20 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-8 border-2 border-black rounded-full">
            <FontAwesomeIcon className="text-[24px]" icon={faCheck} />
          </div>

          <h1 className="mb-4 text-3xl font-medium  text-[#8b6f5f] letter-space">
            Đơn Hàng Đã Được Xác Nhận
          </h1>

          <p className="mb-3 text-sm text-gray-700">
            Cảm ơn bạn đã tin tưởng đặt hàng
          </p>

          <p className="font-mono text-sm tracking-wider text-black">
            #{data?.order._id}
          </p>

          <p className="mt-1 text-sm text-black">
            {new Date(data?.order.createdAt).toLocaleTimeString("vi-VN")}
            {` `}
            {new Date(data?.order.createdAt).toLocaleDateString("vi-VN")}
          </p>
        </div>

        {/* DIVIDER */}
        <div className="mb-16 border-t border-gray-200"></div>

        {/* PRODUCTS */}
        <div className="mb-16">
          <h2 className="mb-8 text-sm text-black uppercase">
            Sản Phẩm Đã Đặt
          </h2>

          <div className="space-y-8">
            {data?.order?.items?.map((product) => {
              const size = product.product_id?.sizes.find(
                (s) => s._id === product.size_id,
              );

              return (
                <div key={product._id} className="flex gap-6 ">
                  <div className="flex w-24 h-24 overflow-hidden shrink-0 bg-gray-50">
                    <img
                      src={product.product_id.thumbnail[0]}
                      alt={product.product_id.title}
                      className="object-cover w-full h-full transition-all duration-500 "
                    />
                  </div>
                  <div className="flex flex-col justify-between flex-1 min-w-0">
                    <div>
                      <h3 className="mb-1 text-base font-medium  text-[#8b6f5f]">
                        {product.product_id.title}
                      </h3>
                      <p className="text-sm tracking-wide text-black">
                        {size?.name}
                      </p>
                    </div>
                    <div className="flex items-end justify-between text-sm">
                      <span className="text-[#8b6f5f]">
                        SL: {product.quantity}
                      </span>
                      <span className="font-medium text-[#8b6f5f]">
                        {formatPrice(product.price * product.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* DIVIDER */}
        <div className="mb-16 border-t border-gray-200"></div>

        {/* CUSTOMER & ADDRESS */}
        <div className="grid gap-12 mb-16 text-sm md:grid-cols-2">
          <div>
            <p className="mb-6 text-sm text-black uppercase">
              Khách Hàng
            </p>
            <p className="mb-2 font-medium text-[#8b6f5f]">
              {data?.order.customer.fullName}
            </p>
            <p className="text-font-mediumgray-700 font-">
              {data?.order.customer.phone}
            </p>
          </div>

          <div>
            <p className="mb-6 text-sm text-black uppercase">
              Địa Chỉ Giao Hàng
            </p>
            <p className="text-gray-700 leadifont-mediumng-relaxed font-">
              {data?.order.customer.address.detail}
              <br />
              {data?.order.customer.address.ward}
              <br />
              {data?.order.customer.address.district}
              <br />
              {data?.order.customer.address.province}
            </p>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="mb-16 border-t border-gray-200"></div>

        {/* PRICE BREAKDOWN */}
        <div className="mb-16">
          <div className="max-w-sm ml-auto space-y-4 text-sm">
            <div className="flex justify-between font-medium">
              <span className="text-gray-700">Tạm tính</span>
              <span className="text-[#8b6f5f]">
                {formatPrice(data?.order.totalPrice)}
              </span>
            </div>

            <div className="flex justify-between font-medium">
              <span className="text-gray-700">Phí vận chuyển</span>
              <span className="text-[#8b6f5f]">
                {formatPrice(data?.order.shippingFee)}
              </span>
            </div>

            <div className="flex justify-between font-medium">
              <span className="text-gray-700">Giảm giá</span>
              <span className="text-[#8b6f5f]">
                {/* -{formatPrice(order.discount)} */}
                {formatPrice(0)}
              </span>
            </div>

            <div className="flex justify-between pt-4 border-t border-gray-900">
              <span className="text-sm  text-[#8b6f5f] uppercase">
                Tổng Cộng
              </span>
              <span className="text-lg font-medium text-[#8b6f5f]">
                {formatPrice(data?.order.finalPrice)}
              </span>
            </div>
          </div>
        </div>

        {/* PAYMENT METHOD */}
        <div className="pb-16 mb-16 text-center border-b border-gray-200">
          <p className="mb-6 text-sm tracking-[0.25em] text-black uppercase">
            Phương thức thanh toán
          </p>

          <div className="flex items-center justify-center gap-4">
            {/* ICON */}
            <div className="flex items-center justify-center w-12 h-12 border border-gray-300 rounded-full">
              <svg
                className="w-5 h-5 text-gray-700"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 10h18M5 6h14a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2z"
                />
              </svg>
            </div>
            {data?.paymentMethod}
            {/* TEXT */}
            {data?.order.paymentMethod === "cod" ? (
              <div className="text-left">
                <p className="text-base font-medium tracking-wide text-[#8b6f5f]">
                  Thanh toán khi nhận hàng
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  Vui lòng chuẩn bị số tiền chính xác khi nhận hàng
                </p>
              </div>
            ) : (
              <div className="text-left">
                <p className="text-base font-medium tracking-wide text-[#8b6f5f]">
                  Thanh toán VNPay
                </p>
                {data?.order.paymentStatus === "paid" && (
                  <p className="mt-1 text-sm text-gray-500">Đã thanh toán</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* ACTIONS */}
        <div className="grid gap-4 md:grid-cols-2">
          <Link
            to="/"
            className="py-4 text-sm font-medium text-center uppercase transition-all duration-300 border border-black hover:bg-black hover:text-white"
          >
            Tiếp Tục Mua Sắm
          </Link>

          <Link
            to={`/orders/detail/${id}`}
            className="py-4 text-sm font-medium text-center text-white uppercase transition-all duration-300 bg-black hover:bg-gray-800"
          >
            Theo Dõi Đơn Hàng
          </Link>
        </div>

        {/* FOOTER NOTE */}
        <div className="mt-16 text-center">
          <p className="text-sm text-font-mediumgray-600 font-">
            Email xác nhận đã được gửi đến hộp thư của bạn
          </p>
        </div>
      </div>
    </div>
  );
}

export default OrderSuccess;
