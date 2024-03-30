const express = require("express");
const Router = express.Router();
const prodHandler = require("../controllers/prodController.js");
const userHandler = require("../controllers/userController.js");
const cartHandler = require("../controllers/cartController.js");
const verifyToken = require("../jwt/verifyToken.js");
const { API } = require("../common/constants.js");


// product

Router.get(API.GET_PRODUCTS, prodHandler.getProducts);
Router.get(API.GET_PRODUCT, prodHandler.getProduct);
Router.post(API.ADD_PRODUCT, prodHandler.postProduct);
Router.put(API.UPDATE_PRODUCT, prodHandler.putProduct);
Router.delete(API.DELETE_PRODUCT, prodHandler.deleteProduct);
Router.get(API.PRODUCT_BY_CATEGORIES, prodHandler.getProductsByCatagory);
Router.get(API.PRODUCT_SLIDE, prodHandler.getSlideProducts);
Router.get(API.PRODUCT_BY_IDS, prodHandler.getByProdIds);
Router.get(API.PRODUCT_BY_CATEGORY, prodHandler.getByCategory);

// user

Router.get(API.GET_USERS, userHandler.getUsers);
Router.post(API.ADD_USER, userHandler.postUser);
Router.get(API.GET_USER_BY_USERNAME, userHandler.getByUserName);
Router.put(API.UPDATE_CART, userHandler.updateUserCart);
Router.get(API.LOGIN_USER, userHandler.loginUser);

// cart

Router.post(API.ADD_CART, cartHandler.postCart);
Router.get(API.GET_CART, cartHandler.getUserCart);
Router.delete(API.DELETE_CART, cartHandler.deleteCart);

module.exports = Router;
