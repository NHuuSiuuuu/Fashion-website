
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

import { Link } from "react-router";
function HeroSide() {
  // var settings = {
  //   dots: false, // hiện dấu ...
  //   infinite: true, // có lặp hay không
  //   speed: 800, // Tốc độ animation
  //   slidesToShow: 1, // Hiện mấy slide
  //   slidesToScroll: 1, // Nhảy mấy slide

  //   autoplay: true, // Bật auto
  //   autoplaySpeed: 5000, // 5s đổi slide
  //   cssEase: "linear",
  //   touchThreshold: 500, // mặc định là 5, thử giảm tiếp
  // };

  return (
    <div className="relative slider-container">
      <Splide
        options={{
          rewind: true, // đi đến cuối sẽ dừng
          // type: "slide",
          type: "loop",
          autoplay: true,
          interval: 5000, // khoảng thời gian chuyển slide: 3s
          speed: 800,
          arrows: true, // nút bấm
          pagination: false,
          perMove: 1, // mỗi lần chuyển bnh slide
          perPage: 1, // hiển thị bao nhiêu sản phẩm tren màn hình
           flickPower: 3000, 
        }}
        aria-label="Hero Slide"
      >
        <SplideSlide>
          <div>
            <Link to="">
              <img
                src="https://res.cloudinary.com/dhvyer5es/image/upload/v1782204192/4_38e4d6063822418887fbf0db4e9a19e7_q0yd2g.png"
                alt=""
              />
            </Link>
          </div>
        </SplideSlide>
        <SplideSlide>
          <div>
            <Link to="">
              <img
                src="https://res.cloudinary.com/dhvyer5es/image/upload/v1782204185/banner_shopee_fa461afda7ed4057a831b2c5583ac427_1_guhcqx.png"
                alt=""
              />
            </Link>
          </div>
        </SplideSlide>
        <SplideSlide>
          <div>
            <Link to="">
              <img
                src="https://res.cloudinary.com/dhvyer5es/image/upload/v1782204184/banner_shopee__1__70b2c5c0497c414d803974a096108d69_cwi9ju.png"
                alt=""
              />
            </Link>
          </div>
        </SplideSlide>
      </Splide>
    </div>
  );
}
export default HeroSide;
