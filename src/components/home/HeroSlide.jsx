import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

function HeroSide() {
  return (
    <div className="relative slider-container">
      <Splide
        options={{
          // rewind: true, // đi đến cuối sẽ dừng
          interval: 9000, // khoảng thời gian chuyển slide: 3s
          arrows: false, // nút bấm
          pagination: false,

          type: "loop",
          autoplay: true,
          speed: 800,
        }}
        aria-label="Hero Slide"
      >
        <SplideSlide>
          <div>
            <img
              src="https://res.cloudinary.com/dhvyer5es/image/upload/v1782204192/4_38e4d6063822418887fbf0db4e9a19e7_q0yd2g.png"
              alt="Slide 1"
            />
          </div>
        </SplideSlide>
        <SplideSlide>
          <div>
            <img
              src="https://res.cloudinary.com/dhvyer5es/image/upload/v1782204185/banner_shopee_fa461afda7ed4057a831b2c5583ac427_1_guhcqx.png"
              alt="Slide 2"
            />
          </div>
        </SplideSlide>
        <SplideSlide>
          <div>
            <img
              src="https://res.cloudinary.com/dhvyer5es/image/upload/v1782204184/banner_shopee__1__70b2c5c0497c414d803974a096108d69_cwi9ju.png"
              alt="Slide 3"
            />
          </div>
        </SplideSlide>
      </Splide>
    </div>
  );
}
export default HeroSide;
