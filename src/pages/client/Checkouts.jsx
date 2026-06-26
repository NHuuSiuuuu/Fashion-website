import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { calculateDiscountedPrice } from "../../utils/price";
import SeoHead from "@/components/comon/SeoHead";
import { toast } from "react-toastify";
import { createOrder, getCart, getshippingMethod } from "@/apis/cart.api";
import useAddressSelector from "@/hooks/useAddressSelector";
import {
  Banknote,
  ChevronRight,
  CreditCard,
  Info,
  ShoppingCart,
} from "lucide-react";
import useAuth from "@/hooks/useAuth";
import ShippingMethod from "@/components/checkout/ShippingMethod";
import ProductList from "@/components/checkout/ProductList";
import AddressSelector from "@/components/checkout/AddressSelector";

// Trong component Checkout

function Checkout() {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [selectedShippingMethod, setSelectedShippingMethod] = useState("");
  const [fee, setFee] = useState(null);
  const cart_id = localStorage.getItem("cart_id");
  const { data, isLoading: loadingUser } = useAuth();
  const user = data?.data;
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    shippingMethod: "",
    paymentMethod: "",
  });

  const {
    data: carts = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["cart", cart_id],
    queryFn: () => getCart(cart_id),
    enabled: !!cart_id, // chỉ gội api khi tồn tại cart_id
  });

  // Gửi data lên db
  const { mutate } = useMutation({
    mutationFn: () => createOrder(payload),
    onSuccess: (res) => {
      console.log(res.data.payment);
      if (res.data.payment === "vnpay") {
        window.location.href = res.data.vnpayResponse;
      } else {
        toast.success("Đặt hàng thành công!");
        navigate(`/orders/success/${res.data.order._id}`);
      }
    },
  });

  const { data: shippingMethod = [] } = useQuery({
    queryKey: ["shippingMethod"],
    queryFn: () => getshippingMethod(),
  });

  const {
    selectedProvinceCode,
    setSelectedProvinceCode,
    selectedDistrictCode,
    setSelectedDistrictCode,
    selectedWardCode,
    setSelectedWardCode,
    selectedProvinceName,
    selectedDistrictName,
    selectedWardName,
    provinces,
    districts,
    wards,
  } = useAddressSelector();

  // Giá tạm thời
  const provisionalPrice = carts?.products?.reduce((acc, curr) => {
    return (
      Number(acc) +
      calculateDiscountedPrice(
        curr.product_id.price,
        curr.product_id.discountPercentage,
      ) *
        curr.quantity
    );
  }, 0);
  useEffect(() => {
    if (!user) return;

    setForm((prev) => ({
      ...prev,
      fullName: user.fullName || "",
      email: user.email || "",
    }));
  }, [user]);

  useEffect(() => {
    if (!selectedShippingMethod) return;

    const method = shippingMethod.find(
      (item) => item.code === selectedShippingMethod,
    );
    if (!method) return;

    if (
      method.freeThreshold != null &&
      provisionalPrice >= method.freeThreshold
    ) {
      setFee(0);
    } else {
      setFee(method.fee);
    }
  }, [selectedShippingMethod, provisionalPrice, shippingMethod]);

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loader-1"></div>
      </div>
    );
  if (isError) return <div>lỗi</div>;
  const payload = {
    cart_id,
    customer: {
      fullName: form.fullName,
      email: form.email,
      phone: form.phone,
      note: form.note,
      address: {
        detail: form.detail,
        ward: selectedWardName,
        district: selectedDistrictName,
        province: selectedProvinceName,
      },
      shippingMethod: selectedShippingMethod,
      paymentMethod: paymentMethod,
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.fullName ||
      !form.phone ||
      !selectedProvinceName ||
      !shippingMethod
    ) {
      toast.error("Vui lòng điền đầy đủ thông tin");
      return;
    }
    if (!selectedShippingMethod) {
      toast.error("Vui lòng chọn phương thức vận chuyển");
      return;
    }

    mutate(payload);
  };

  return (
    <div className="mx-auto h-[1000px] w-[90%] lg:w-[70%]">
      <SeoHead
        title="Thanh Toán"
        description="Thanh toán đơn hàng tại NHUU"
        type="website"
      />
      <div className="flex-3 md:flex md:flex-1 my-[20px] border-b border-[#e6e6e6] border-solid justify-start items-center px-[15px]">
        {/* Logo */}
        <Link to="/" className="block text-[40px]">
          NHUU
        </Link>
      </div>

      <div>
        <ul>
          <li className="inline-block">
            <Link className="text-[#338dbc]" to="/cart">
              Giỏ hàng
            </Link>
          </li>
          <li className="inline-block mx-[10px]">
            <ChevronRight className="text-[#999999] text-[10px]" size={10} />
          </li>
          <li className="text-black inline-block text-[14px] md:text-[16px]">
            Thông tin giao hàng
          </li>
          <li className="py-[16px] text-[#4d4d4d] text-[12px] font-medium">
            <h2 className="text-[18px] text-[#333333]">Thông tin giao hàng</h2>
          </li>
        </ul>
        <p className="text-[#737373] text-[14px] inline-block">
          Bạn đã có tài khoản?
        </p>
        <Link
          className="text-[#338dbc] text-[14px] inline-block mx-[6px]"
          to="account/login"
        >
          Đăng nhập
        </Link>
      </div>
      <div className="grid lg:grid-cols-2">
        <div className="lg:pt-[56px] lg:pr-[66px] order-2 lg:order-1">
          <div>
            {/* Form fields */}
            <div className="relative shadow-2xs my-[15px] shadow-2xs">
              <input
                type="text"
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                placeholder="Họ và tên"
                value={form?.fullName}
                className="w-full peer border border-[#d9d9d9] rounded-[4px] py-[14px] pr-[40px] pl-[26px] focus:outline-[#338dbc] focus:placeholder-transparent"
              />
              <label className="text-[#333333] pointer-events-none font-medium left-[22px] peer-focus:-translate-y-1/2 px-[4px] translate-y-1/2 bg-white transition-all duration-300 opacity-0 peer-focus:opacity-100 absolute peer-not-placeholder-shown:-translate-y-1/2 peer-not-placeholder-shown:opacity-100">
                Họ và tên
              </label>
            </div>

            <div className="flex w-full gap-2">
              <div className="relative shadow-2xs my-[15px] w-[60%]">
                <input
                  type="text"
                  placeholder="Email"
                  value={form?.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="z-50 w-full peer border border-[#d9d9d9] rounded-[4px] py-[14px] pr-[40px] pl-[26px] focus:outline-[#338dbc] focus:placeholder-transparent"
                />
                <label className=" pointer-events-none z-10 text-[#333333] font-medium left-[22px] peer-focus:-translate-y-1/2 px-[4px] translate-y-1/2 bg-white transition-all duration-300 opacity-0 peer-focus:opacity-100 absolute peer-not-placeholder-shown:-translate-y-1/2 peer-not-placeholder-shown:opacity-100">
                  Email
                </label>
              </div>

              <div className="relative shadow-2xs my-[15px] w-[40%]">
                <input
                  type="text"
                  placeholder="Số điện thoại"
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full peer border border-[#d9d9d9] rounded-[4px] py-[14px] pr-[40px] pl-[26px] focus:outline-[#338dbc] focus:placeholder-transparent"
                />
                <label className=" pointer-events-none text-[#333333] font-medium left-[22px] peer-focus:-translate-y-1/2 px-[4px] translate-y-1/2 bg-white transition-all duration-300 opacity-0 peer-focus:opacity-100 absolute peer-not-placeholder-shown:-translate-y-1/2 peer-not-placeholder-shown:opacity-100">
                  Số điện thoại
                </label>
              </div>
            </div>

            <div className="relative shadow-2xs my-[15px]">
              <input
                onChange={(e) => setForm({ ...form, note: e.target.value })}
                type="text"
                placeholder="Ghi chú"
                className="w-full peer border border-[#d9d9d9] rounded-[4px] py-[14px] pr-[40px] pl-[26px] focus:outline-[#338dbc] focus:placeholder-transparent"
              />
              <label className=" pointer-events-none text-[#333333] font-medium left-[22px] peer-focus:-translate-y-1/2 px-[4px] translate-y-1/2 bg-white transition-all duration-300 opacity-0 peer-focus:opacity-100 absolute peer-not-placeholder-shown:-translate-y-1/2 peer-not-placeholder-shown:opacity-100">
                Ghi chú
              </label>
            </div>

            <AddressSelector
              setSelectedProvinceCode={setSelectedProvinceCode}
              selectedProvinceCode={selectedProvinceCode}
              provinces={provinces}
              setSelectedDistrictCode={setSelectedDistrictCode}
              selectedDistrictCode={selectedDistrictCode}
              districts={districts}
              selectedWardCode={selectedWardCode}
              setSelectedWardCode={setSelectedWardCode}
              wards={wards}
            />

            {/* Địa chỉ cụ thể */}
            <div className="relative shadow-2xs my-[15px]">
              <input
                onChange={(e) => setForm({ ...form, detail: e.target.value })}
                type="text"
                placeholder="Chi tiết"
                className="w-full peer border border-[#d9d9d9] rounded-[4px] py-[14px] pr-[40px] pl-[26px] focus:outline-[#338dbc] focus:placeholder-transparent"
              />
              <label className=" pointer-events-none text-[#333333] font-medium left-[22px] peer-focus:-translate-y-1/2 px-[4px] translate-y-1/2 bg-white transition-all duration-300 opacity-0 peer-focus:opacity-100 absolute peer-not-placeholder-shown:-translate-y-1/2 peer-not-placeholder-shown:opacity-100">
                Chi tiết
              </label>
            </div>

            {/* Phương thức vận chuyển */}
            <ShippingMethod
              selectedWardCode={selectedWardCode}
              selectedProvinceCode={selectedProvinceCode}
              shippingMethod={shippingMethod}
              selectedShippingMethod={selectedShippingMethod}
              setSelectedShippingMethod={setSelectedShippingMethod}
            />

            {/* Phương thức thanh toán */}
            <div className="mt-8">
              <h2 className="mb-4 text-lg font-semibold text-gray-900">
                Phương thức thanh toán
              </h2>

              <div className="space-y-3">
                <div className="flex items-center p-3 border border-gray-200 rounded-lg">
                  <input
                    type="radio"
                    id="cod"
                    name="paymentMethod"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <label
                    htmlFor="cod"
                    className="flex items-center ml-3 cursor-pointer"
                  >
                    <Banknote className="mr-2 text-gray-600" size={16} />
                    <span className="text-sm">
                      Thanh toán khi nhận hàng (COD)
                    </span>
                  </label>
                </div>

                <div className="flex items-center p-3 border border-gray-200 rounded-lg">
                  <input
                    type="radio"
                    id="vnpay"
                    name="paymentMethod"
                    value="vnpay"
                    checked={paymentMethod === "vnpay"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <label
                    htmlFor="vnpay"
                    className="flex items-center ml-3 cursor-pointer"
                  >
                    <CreditCard className="mr-2 text-gray-600" size={16} />
                    <span className="text-sm">Thanh toán qua VNPAY</span>
                  </label>
                </div>
              </div>
            </div>
            {/* Hiển thị thêm thông tin nếu chọn VNPAY */}
            {paymentMethod === "vnpay" && (
              <div className="p-4 mt-3 text-sm text-blue-800 rounded-lg bg-blue-50">
                <p className="flex items-center">
                  <Info className="w-4 h-4 mr-2" />
                  Bạn sẽ được chuyển đến cổng thanh toán VNPAY sau khi đặt hàng
                </p>
              </div>
            )}

            <div className="flex space-x-4  my-[15px]">
              <button className="flex items-center justify-center px-6 py-3 text-gray-700 transition-all duration-300 border border-gray-300 rounded-md hover:border-gray-400 hover:shadow-sm">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Giỏ hàng
              </button>
              <button
                onClick={handleSubmit}
                className="flex items-center justify-center px-8 py-3 font-medium text-white transition-all duration-300 bg-[#333333] rounded-md  hover:shadow-lg"
              >
                Hoàn tất đơn hàng
              </button>
            </div>
          </div>
        </div>

        <ProductList
          carts={carts}
          provisionalPrice={provisionalPrice}
          fee={fee}
        />
      </div>
    </div>
  );
}

export default Checkout;
