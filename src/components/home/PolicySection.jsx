import { CreditCard, Gem, HandHeart, ShoppingBag } from "lucide-react";
import React from "react";

const PolicySection = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 md:mt-[50px] gap-4 ">
      <div className="flex gap-4 items-center shadow-[0_8px_24px_hsla(210,8%,62%,0.2)] p-[20px] hover:translate-y-[-6px] hover:transition-all hover:duration-500">
        <div>
          <ShoppingBag size={33} lg:size={39} />
        </div>
        <div>
          <h3 className="font-semibold text-[14px] mb-[10px]">
            Miễn Phí giao hàng
          </h3>
          <p className="text-[11px] lg:text-[13px] text-[#8d8d8d]">
            Miễn phí ship với đơn hàng từ 500k
          </p>
        </div>
      </div>
      <div className="flex gap-4 items-center shadow-[0_8px_24px_hsla(210,8%,62%,0.2)] p-[20px] hover:translate-y-[-6px] hover:transition-all hover:duration-500">
        <div>
          <CreditCard size={33} lg:size={39} />
        </div>
        <div>
          <h3 className="font-semibold text-[14px] lg:text-base  mb-[10px]">
            Thanh toán COD
          </h3>
          <p className="text-[11px] lg:text-[13px] text-[#8d8d8d]">
            Thanh toán khi nhận hàng (COD)
          </p>
        </div>
      </div>
      <div className="flex gap-4 items-center shadow-[0_8px_24px_hsla(210,8%,62%,0.2)] p-[20px] hover:translate-y-[-6px] hover:transition-all hover:duration-500">
        <div>
          <Gem size={33} lg:size={39} />
        </div>
        <div>
          <h3 className="font-semibold text-[14px] lg:text-base  mb-[10px]">
            Khách hàng VIP
          </h3>
          <p className="text-[11px] lg:text-[13px] text-[#8d8d8d]">
            Ưu đãi dành riêng cho khách hàng VIP
          </p>
        </div>
      </div>
      <div className="flex gap-4 items-center shadow-[0_8px_24px_hsla(210,8%,62%,0.2)] p-[20px] hover:translate-y-[-6px] hover:transition-all hover:duration-500">
        <div>
          <HandHeart size={33} lg:size={39} />
        </div>
        <div>
          <h3 className="font-semibold text-[14px] lg:text-base  mb-[10px]">
            Hỗ trợ 24/7
          </h3>
          <p className="text-[11px] lg:text-[13px] text-[#8d8d8d]">
            Đội ngũ hỗ trợ khách hàng luôn sẵn sàng 24/7
          </p>
        </div>
      </div>
    </div>
  );
};

export default PolicySection;
