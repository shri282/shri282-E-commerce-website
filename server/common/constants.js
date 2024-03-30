const API = {
  GET_PRODUCTS: "/products",
  GET_PRODUCT: "/product",
  ADD_PRODUCT: "/product",
  UPDATE_PRODUCT: "/product",
  DELETE_PRODUCT: "/product",
  PRODUCT_BY_CATEGORIES: "/products/getbycategories",
  PRODUCT_SLIDE: "/products/slide",
  PRODUCT_BY_IDS: "/products/getbyids",
  PRODUCT_BY_CATEGORY: "/products/getbycategory",
  GET_USERS: "/users",
  ADD_USER: "/user",
  GET_USER_BY_USERNAME: "/user/getbyusername",
  UPDATE_CART: "/user/updatecart",
  LOGIN_USER: "/user/login",
  ADD_CART: "/cart/add",
  GET_CART: "/cart/usercart",
  DELETE_CART: "/cart/delete",
};

const PORT = '8080';

module.exports = {
    API,
    PORT
}

