import { ZoomIn } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { calculateDiscountedPrice, formatPrice } from "../../utils/price";
import QuickViewModal from "../modals/QuickViewModal";
import LoadingPage from "../comon/LoadingPage";
import ErrorPage from "../comon/ErrorPage";
import { getProducts } from "@/apis/products.api";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";



function ProductList() {
  const [openDialog, setOpendialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(),
  });

  if (isLoading) return <LoadingPage />;
  if (isError) return <ErrorPage text="Không thể tải danh sách sản phẩm" />;
  return (
    <div className="relative w-full px-3 mx-auto mt-10 bg-white sm:px-4 md:px-16 xl:px-18 md:mt-20 lg:mt-35">
      <div className="mx-auto ">
        <Link
          className="block text-center text-[24px] text-[#a47b67] font-bold uppercase py-8"
          to="/products"
        >
          product
        </Link>
      </div>

      <Splide
        options={{
          // perPage: 4,
          rewind: true, // đi đến cuối sẽ dừng
          type: "slide",
          // type: "loop",
          autoplay: true,
          interval: 3000, // khoảng thời gian chuyển slide: 3s
          speed: 800,
          arrows: false, // nút bấm
          pagination: false,
          perMove: 1, // mỗi lần chuyển bnh slide
          perPage: 4, // hiển thị bao nhiêu sản phẩm tren màn hình
          breakpoints: {
            1280: { perPage: 4 }, // >=1280
            1024: { perPage: 2 }, // >=1024 = md
            768: { perPage: 1 }, // <1024
          },
        }}
        aria-label="Danh sách sản phẩm nổi bật"
      >
        {data?.products.map((item) => (
          <SplideSlide>
            <div
              key={item.slug}
              onClick={() => navigate(`/products/${item?.slug}`)}
            >
              {/* Sản phâm */}
              <div className="px-[15px]  overflow-hidden ">
                <div className="relative overflow-hidden product-img group aspect-[3/4]">
                  {/* icon */}
                  <div
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation(); // chặn click lan ra Link
                      setOpendialog(true);
                      setSelectedProduct(item);
                    }}
                    className="
                    absolute top-1/2 opacity- left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 transition-all duration-400 group-hover:scale-100 group-hover:opacity-100
                    scale-0 size-[44px] rounded-full bg-white hidden md:flex items-center justify-center 
                    "
                  >
                    <div className="">
                      {" "}
                      <ZoomIn className="size-[22px] text-black" />
                    </div>
                  </div>

                  <div className="">
                    {item?.stock === 0 ? (
                      <div className="absolute text-[#a47b67] z-10 product-sale left-[10px] top-[10px] text-[12px] px-[15px] py-[10px] font-bold leading-1  bg-white">
                        Hết hàng
                      </div>
                    ) : (
                      <div className="absolute z-10 product-sale right-[10px] top-[10px] text-[12px] px-[15px] py-[10px] font-bold leading-1 text-[#f94c43] bg-white">
                        {item?.discountPercentage &&
                          `-${item?.discountPercentage}%`}
                      </div>
                    )}
                    <img
                      className="absolute inset-0 object-cover w-full h-full"
                      src={item?.thumbnail[0]}
                      alt={item?.title}
                    />

                    <img
                      className="absolute inset-0 object-cover w-full h-full transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100"
                      src={item?.thumbnail[1]}
                      alt={item?.title}
                    />
                  </div>
                </div>
                <div className="product-detail pt-2.5 ">
                  <h3>
                    <p
                      // có thể viết là: truncate = overflow-hidden + whitespace-nowrap (không cho xuống dòng) + text-overflow: ellopsis (Hiện ...) : Combo luôn đi chung nhau
                      className="text-[14px] font-medium leading-1.2 overflow-hidden whitespace-nowrap block text-ellipsis"
                      title={item?.title}
                    >
                      {item?.title}
                    </p>
                  </h3>
                  <div>
                    {/* Giá đã giảm */}
                    {item?.discountPercentage ? (
                      <>
                        <span className="text-[14px] text-[#f94c43] font-medium leading-1">
                          {formatPrice(
                            calculateDiscountedPrice(
                              item?.price,
                              item?.discountPercentage,
                            ),
                          )}
                        </span>
                        {/* Giá gốc */}
                        <span className="ml-2.5 text-[13px] text-[#939393] font-medium leading-1 line-through">
                          {formatPrice(item?.price)}
                        </span>
                      </>
                    ) : (
                      <span className="ml-2.5 text-[14px] text-[#000000] font-medium leading-1 ">
                        {formatPrice(item?.price)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </SplideSlide>
        ))}
      </Splide>

      {/* -------------------------------------------------- */}

      <QuickViewModal
        selectedProduct={selectedProduct}
        setOpendialog={setOpendialog}
        openDialog={openDialog}
      />
    </div>
  );
}

export default ProductList;
