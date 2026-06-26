import HeroSlide from "../components/home/HeroSlide";
import CategoryList from "../components/home/CategoryList";
import ProductList from "../components/home/ProductList";

import "tippy.js/dist/tippy.css"; // optional
import SeoHead from "@/components/comon/SeoHead";

import { lazy, Suspense, useEffect } from "react";
import PolicySection from "@/components/home/PolicySection";
import BrandValues from "@/components/home/BrandValues";
import CustomerReviews from "@/components/home/CustomerReviews";
import NewsletterSignup from "@/components/home/NewsletterSignup";
import useMobile from "@/hooks/useMobile";
import ProductSale from "@/components/home/ProductSale";

function HomePage() {
  const MobileSearch = lazy(() => import("../components/search/MobileSearch"));
  const isMobile = useMobile();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

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

      <div className="w-full px-3 mx-auto my-5  bg-white sm:px-4 md:px-16 xl:px-18 md:mt-[5%] ">
        <PolicySection />

        <ProductSale />

        <BrandValues />

        <CustomerReviews />

        <NewsletterSignup />
      </div>
    </>
  );
}

export default HomePage;
