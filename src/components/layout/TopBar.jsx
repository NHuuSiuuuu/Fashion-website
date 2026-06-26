import { Link } from "react-router";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import useMobile from "@/hooks/useMobile";
import { lazy, Suspense } from "react";

const DesktopSearch = lazy(() => import("@/components/search/DesktopSearch"));

function TopBar() {
  const isMobile = useMobile();

  return (
    <div id="topbar">
      <div className="container px-4 mx-auto md:block ">
        <div className="block">
          <div className="items-center justify-center text-center md:flex ">
            {/* Liên hệ */}
            <div className="flex-1 hidden px-4 tracking-wider md:flex ">
              <ul>
                <li>
                  <span>
                    <Link to="">nhuu@gmail.com</Link>
                  </span>
                  <span className="h-9">|</span>
                  <span>
                    <Link to="">Hotline: 012 456 789</Link>
                  </span>
                </li>
              </ul>
            </div>

            {/* Content */}
            <div className="flex-1 w-full px-4 text-center md:flex">
              <Splide
                options={{
                  type: "loop",
                  autoplay: true,
                  arrows: false,
                  pagination: false,
                }}
              >
                <SplideSlide className="flex items-center justify-center overflow-hidden">
                  <p className="text-xs md:text-sm">
                    Đồng giá ship chỉ 10.000 cho đơn nội thành
                  </p>
                </SplideSlide>
                <SplideSlide className="flex items-center justify-center overflow-hidden">
                  <p className="text-xs md:text-sm">
                    {" "}
                    Đơn hàng giá trị cao được vận chuyển bằng hộp
                  </p>
                </SplideSlide>
                <SplideSlide className="flex items-center justify-center overflow-hidden">
                  <p className="text-xs md:text-sm">
                    {" "}
                    Đồng giá ship chỉ 20.000 cho đơn toàn quốc
                  </p>
                </SplideSlide>
              </Splide>
            </div>

            {/* Tìm kiếm */}
            {!isMobile && (
              <Suspense fallback={null}>
                <DesktopSearch />
              </Suspense>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
