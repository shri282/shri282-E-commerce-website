const express = require('express');
const Router = express.Router();
const prodController = require('../controllers/prodController.js')
const userController = require('../controllers/userController.js');
const cartController = require('../controllers/cartController.js') 

Router.get('/products', prodController.sql.getProducts);
Router.get('/product', prodController.sql.getProduct);
Router.post('/product', prodController.sql.postProduct);
Router.put('/product', prodController.sql.putProduct);
Router.delete('/product', prodController.sql.deleteProduct);
Router.get('/products/getbyquery',prodController.sql.getProductsByQuery);
Router.get('/products/slide',prodController.sql.getSlideProducts);
Router.get('/products/getbyids',prodController.sql.getByProdIds);
Router.get('/products/getbycategory',prodController.sql.getByCategory);

// user

Router.get('/users', userController.sql.getUsers);
Router.post('/user', userController.sql.postUser);
Router.get('/user/getbyusername',userController.sql.getByUserName);
Router.put('/user/updatecart',userController.sql.updateUserCart);
Router.get('/user/login',userController.sql.loginUser);

// cart

Router.post('/cart/add', cartController.sql.postCart);
Router.get('/cart/usercart',cartController.sql.getUserCart);
Router.delete('/cart/delete',cartController.sql.deleteCart);

module.exports = Router;

