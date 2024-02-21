const query = require('../databaseConnection/dbConnection.js')


const postCart = async (req,res) => {
    try {
       const sql = `insert into cart(user_id,prod_id) values($1,$2)`
       const params = [req.body.user_id,req.body.prod_id];
       const result = await query(sql,params);
       res.send(result);
    } catch (error) {
      console.log(error);
       res.sent(error);
    }
}

const getUserCart = async (req,res) => {
    try {
        const sql = `select * from cart where user_id = $1`
        const params = [req.query.user_id];
        const result = await query(sql,params);
        res.send(result);
     } catch (error) {
        console.log(error);
        res.sent(error);
     }
}


module.exports.sql = {
    postCart : postCart,
    getUserCart : getUserCart
}