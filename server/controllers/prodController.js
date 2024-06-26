const query = require("../databaseConnection/dbConnection.js");

const getProducts = async (req, res) => {
  try {
    const sql = "select * from products";
    const params = [];
    const result = await query(sql, params);
    res.send(result.rows);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

const getProduct = async (req, res) => {
  try {
    const sql = "select * from products where prod_id = $1";
    const params = [parseInt(req.query.id)];
    const result = await query(sql, params);
    res.send(result.rows);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const sql = "delete from products where prod_id = $1";
    const params = [req.query.id];
    const result = await query(sql, params);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

const postProduct = async (req, res) => {
  try {
    const sql =
      "insert into products(prod_name, prize, availability, offer, stock, isdeleted,category,type,image_path,description) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)";
    const params = [
      req.body.prodname,
      req.body.prize,
      req.body.availability,
      req.body.offer,
      req.body.stock,
      false,
      req.body.category,
      req.body.type,
      req.body.imagePath,
      req.body.description,
    ];
    const result = await query(sql, params);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

const putProduct = async (req, res) => {
  try {
    const sql = "update products set availability = $1 where prod_id = $2";
    const params = [req.body.availability, req.body.id];
    const result = await query(sql, params);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

const getProductsByCatagory = async (req, res) => {
  try {
    const sql = `select * from products where ${req.query.category} ilike $1`;
    const params = ["%" + req.query.query + "%"];
    const result = await query(sql, params);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

const getSlideProducts = async (req, res) => {
  try {
    const sql = `select * from products order by prize asc limit 3`;
    const result = await query(sql, []);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

const getByProdIds = async (req, res) => {
  try {
    const prodIds = JSON.parse(req.query.prodIds);
    const placeHolder =
    prodIds.length > 0 ? prodIds.map((data) => data).join(",") : "-1";
    const sql = `select * from products where prod_id IN (${placeHolder})`;
    const result = await query(sql, []);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

const getByCategory = async (req, res) => {
  try {
    const sql = `select * from products where category ilike $1`;
    const params = [req.query.category];
    const result = await query(sql, params);
    res.send(result.rows);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

module.exports = {
  getProducts: getProducts,
  getProduct: getProduct,
  deleteProduct: deleteProduct,
  postProduct: postProduct,
  putProduct: putProduct,
  getProductsByCatagory: getProductsByCatagory,
  getSlideProducts: getSlideProducts,
  getByProdIds: getByProdIds,
  getByCategory: getByCategory,
};
