const query = require('../databaseConnection/dbConnection.js')

const getUsers = async (req,res) => {
    try {
        const sql = "select * from users";
        const params = [];
        const result = await query(sql,params);
        res.send(result.rows);
    } catch (error) {
        res.send(error);
    }
}


const postUser = async (req,res) => {
    try {
        const sql = "insert into users(name,username,email,password) values($1,$2,$3,$4)";
        const params = [req.body.name,req.body.username,req.body.email,req.body.password];
        const result = await query(sql,params);
        res.send(result);
    } catch (error) {
        res.send(error);
    }
}


const getByUserName = async (req,res) => {
    try {
        const sql = `select * from users where username = $1 limit 1`;
        const params = [req.query.username];
        console.log("in server getByUserName " +params, sql);
        const result = await query(sql,params);
        console.log(result);
        res.send(result);
    } catch (error) {
        res.send(error);
    }
}


const updateUserCart = async (req,res) => {
    try {
        const sql = `update users set cart = $1 where user_id = $2`;
        const params = [req.body.product,req.body.user_id];
        console.log("in server getByUserName " +params, sql);
        const result = await query(sql,params);
        console.log(result);
        res.send(result);
    } catch (error) {
        res.sent(error);
    }
}


const getByProdIds = async (req,res) => {
    try {
        console.log(req.query.prodIds);
        const placeHolder = req.query.prodIds.map(data => data).join(',')
        const sql = `select * from products where prod_id IN (${placeHolder})`;
        console.log("in server getByProdIds ", sql);
        const result = await query(sql,[]);
        console.log(result);
        res.send(result);
    } catch (error) {
        console.log(error);
        res.sent(error);
    }
}

module.exports.sql = {
    getUsers : getUsers,
    postUser : postUser,
    getByUserName : getByUserName,
    updateUserCart : updateUserCart,
    getByProdIds : getByProdIds
}

