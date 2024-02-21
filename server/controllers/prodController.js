const query = require('../databaseConnection/dbConnection.js')

const getProducts = async (req,res) => {
    try {
        const sql = "select * from products";
        const params = [];
        const result = await query(sql,params);
        res.send(result.rows);
    } catch (error) {
        res.send(error);
    }
}

const getProduct = async (req,res) => {
    try {
        const sql = "select * from products where prod_id = $1";
        console.log(parseInt(req.query.id));
        const params = [parseInt(req.query.id)];
        const result = await query(sql,params);
        res.send(result.rows);
    } catch (error) {
        res.send(error);
    }
}

const deleteProduct = async (req,res) => {
    try {
        const sql = "delete from products where prod_id = $1";
        const params = [req.query.id];
        const result = await query(sql,params);
        res.send(result);
    } catch (error) {
        res.send(error);
    }
}


const postProduct = async (req,res) => {
    try {
        const sql = "insert into products(prod_name, prize, availability, offer, stock, isdeleted,category,type,image_path,description) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)";
        const params = [req.body.prodname,req.body.prize,req.body.availability,req.body.offer,req.body.stock,false,req.body.category,req.body.type,req.body.imagePath,req.body.description];
        const result = await query(sql,params);
        res.send(result);
    } catch (error) {
        res.send(error);
    }
}


const putProduct = async (req,res) => {
    try {
        const sql = "update products set availability = $1 where prod_id = $2";
        const params = [req.body.availability,req.body.id];
        const result = await query(sql,params);
        res.send(result);
    } catch (error) {
        res.send(error);
    }
}

const getProductsByQuery = async (req,res) => {
    try {
        console.log(req.query.category);
        console.log(req.query.query);
        const sql = `select * from products where ${req.query.category} ilike $1`
        console.log(sql);
        const params = ["%" +req.query.query +"%"];
        const result = await query(sql,params);
        res.send(result);
    } catch (error) {
      console.log(error);
      res.send(error); 
    } 
}


const getSlideProducts = async (req,res) => {
    try {
        console.log(req.query.category);
        console.log(req.query.query);
        const sql = `select * from products order by prize asc limit 3`
        console.log(sql);
        const result = await query(sql,[]);
        console.log(result);
        res.send(result);
    } catch (error) {
      console.log(error);
      res.send(error); 
    } 
}


module.exports.sql = {
    getProducts : getProducts,
    getProduct : getProduct,
    deleteProduct : deleteProduct,
    postProduct : postProduct,
    putProduct : putProduct,
    getProductsByQuery : getProductsByQuery,
    getSlideProducts : getSlideProducts
}




