import { ZoomIn } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { calculateDiscountedPrice, formatPrice } from "../../utils/price";
import QuickViewModal from "../modals/QuickViewModal";
import LoadingPage from "../comon/LoadingPage";
import ErrorPage from "../comon/ErrorPage";
import { getProducts } from "@/apis/products.api";
import axios from "../../utils/axios";

function ProductsRelated({ id }) {
  const [openDialog, setOpendialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  // const [isDragging, setIsDragging] = useState(false); // giữ chuột và kéo - phải chặn hành vi mặc định của thẻ link khi dragging
  const isDragging = useRef(false); //  Dùng useRef thay useState
  const [sliderConfig, setSliderConfig] = useState({
    slidesToShow: 4,
    rows: 2,
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      // console.log("width:", width);
      if (width <= 480) {
        setSliderConfig({ slidesToShow: 2, rows: 1, dots: false });
      } else if (width <= 1024) {
        setSliderConfig({ slidesToShow: 3, rows: 1, dots: false });
      } else {
        setSliderConfig({ slidesToShow: 5, rows: 1, dots: false });
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products-related", id],
    queryFn: async () => {
      const { data } = await axios.get(`/product/related-products/${id}`);
      return data;
    },
  });
  // console.log("isDragging", isDragging);

  if (isLoading) return <LoadingPage />;
  if (isError) return <ErrorPage text="Không thể tải danh sách sản phẩm" />;
  return (
    <div className="relative w-full px-3 mx-auto  mt-2 bg-white sm:px-4  xl:px-18 md:mt-[40px] lg:mt-[40px]">
      hehehe
    </div>
  );
}

export default ProductsRelated;
