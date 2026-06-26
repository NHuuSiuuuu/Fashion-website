import HeadlessTippy from "@tippyjs/react/headless";
import "tippy.js/dist/tippy.css"; // optional
import useDebounce from "@/hooks/useDebounce";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Loader, Search, XCircle } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { formatPrice, calculateDiscountedPrice } from "../../utils/price";

function MobileSearch() {
  const [searchValue, setSearchValue] = useState("");
  const [showResult, setShowResult] = useState(true);
  const debounceValue = useDebounce(searchValue, 500);
  const {
    data: searchData,
    isLoading: searchLoading,
    isError: searchError,
  } = useQuery({
    queryKey: ["searchProducts", debounceValue],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_BACKEND}/product/search?keyword=${debounceValue}`,
      );
      return data;
    },
    staleTime: 1000 * 60,
    enabled: debounceValue.trim() !== "", // Điều kiện dể query chạy
  });
  const handleSearchValue = (e) => {
    setSearchValue(e.target.value);
  };

  const handleHideResult = () => {
    setShowResult(false);
  };
  return (
    <HeadlessTippy
      appendTo={() => document.body}
      interactive
      visible={showResult && debounceValue.trim() !== ""}
      onClickOutside={handleHideResult}
      placement="bottom"
      // offset={[0, 0]} // Dịch tooltip 10px sang phải, 5px xuống
      render={(attrs) =>
        searchData?.products?.length === 0 ? (
          <div
            className="bg-white w-[90vw] rounded-md shadow-md overflow-hidden"
            tabIndex="-1"
            {...attrs}
          >
            <div className="flex flex-col items-center justify-center gap-2 px-6 py-2 text-center">
              <p className="text-[13px] font-medium text-[#333]">
                Không tìm thấy sản phẩm
              </p>
              <p className="text-[11px] text-[#999]">
                Thử tìm với từ khóa khác nhé
              </p>
            </div>
          </div>
        ) : (
          <div
            className="bg-[#fff] md:hidden overflow-scroll max-h-[50vh] rounded-md shadow-md "
            tabIndex="-1"
            {...attrs}
          >
            {searchData?.products.map((item) => (
              <div
                key={item.slug}
                className="flex items-start border-b-[1px] border-dotted border-[#dfe0e1] gap-3  p-[10px]"
              >
                <Link to={`/products/${item.slug}`} className="shrink-0">
                  <img
                    alt={item.title}
                    src={item.thumbnail[1]}
                    className="object-cover w-[50px]  h-[70px]"
                    loading="lazy"
                  />
                </Link>
                <div className="flex-1">
                  <Link
                    className="text-[#a47b67] text-[12px] font-medium mb-[4px] whitespace-pre-line block"
                    to={`/products/${item.slug}`}
                  >
                    {item.title}
                  </Link>
                  <div>
                    <p className="inline-block text-[12px] text-[#a47b67] font-normal">
                      {formatPrice(item.price)}
                    </p>
                    <p className="inline ml-[5px] text-[11px] text-[#797979] line-through">
                      {formatPrice(
                        calculateDiscountedPrice(
                          item.price,
                          item.discountPercentage,
                        ),
                      )}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      }
    >
      <div className="md:hidden m-[5px] relative bg-[#f5f5f5] ">
        <div className="flex w-[90%] items-center justify-between">
          <input
            onChange={(e) => handleSearchValue(e)}
            type="text"
            value={searchValue}
            onFocus={() => setShowResult(true)}
            placeholder="Tìm kiếm sản phẩm..."
            spellCheck={false} // tắt gạch chân lỗi chính tả
            className=" h-[30px] px-[5px]  text-[#333333] w-[88%] outline-none text-[12px]  "
          />
          <div>
            {!!searchValue && !searchLoading && (
              <button
                className="clear"
                onClick={() => {
                  setShowResult(false);
                  setSearchValue("");
                }}
              >
                <XCircle className="text-[#d7d7d7] text-[14px]" size={14} />
              </button>
            )}
            {searchLoading && (
              <Loader
                className={`text-[14px] text-[#d7d7d7] animate-spin`}
                size={14}
              />
            )}
          </div>
        </div>

        <button className="absolute w-[10%] right-0 -translate-y-1/2 top-1/2">
          <Search className="text-[15px] text-[#d7d7d7] " size={15} />
        </button>
      </div>
    </HeadlessTippy>
  );
}

export default MobileSearch;
