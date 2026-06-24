import HeroSlide from "../components/home/HeroSlide";
import CategoryList from "../components/home/CategoryList";
import ProductList from "../components/home/ProductList";

import "tippy.js/dist/tippy.css"; // optional
import SeoHead from "@/components/comon/SeoHead";

import { lazy, Suspense, useEffect, useState } from "react";
import PolicySection from "@/components/home/PolicySection";
import BrandValues from "@/components/home/BrandValues";
import CustomerReviews from "@/components/home/CustomerReviews";
import NewsletterSignup from "@/components/home/NewsletterSignup";

function HomePage() {
  const MobileSearch = lazy(() => import("../components/search/MobileSearch"));
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  // console.log("isMobile", isMobile);

  return (
    <>
      <SeoHead />
      {isMobile && (
        <Suspense fallback={null}>
          <MobileSearch />
        </Suspense>
      )}
      {/* Hero Slide */}
      <HeroSlide />

      {/* CategoryList */}
      <CategoryList />

      {/* ProductList */}
      <ProductList />
      <div className="w-full px-3 mx-auto mt-10 bg-white sm:px-4 md:px-16 xl:px-18 md:mt-[5%] lg:mt-35">
        <PolicySection />

        <BrandValues />

        <CustomerReviews />

        <NewsletterSignup />
      </div>
    </>
  );
}

export default HomePage;
