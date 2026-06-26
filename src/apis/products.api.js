import axios from "../utils/axios";

/* =======================
    API chi tiết sản phẩm
  =======================*/
export const getProductDetail = async (slug) => {
  const res = await axios.get(`/product/detail/${slug}`);
  return res.data.product;
};

/* =======================
    Tìm kiếm sản phẩm
  =======================*/
export const searchProducts = async (debounceValue) => {
  const { data } = await axios.get(`/product/search?keyword=${debounceValue}`);
  return data;
};

/* =======================
    Danh sách sản phẩm
  =======================*/
export const getProducts = async ({ limit = 20, sort = "" }) => {
  const { data } = await axios.get(`/product?limit=${limit}&sort=${sort}`);
  return data;
};
