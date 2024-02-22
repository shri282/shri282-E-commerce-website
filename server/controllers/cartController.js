const query = require('../databaseConnection/dbConnection.js')


const postCart = async (req,res) => {

    try {
        const queryData = {
            user_id : req.body.user_id
        } 

        const baseUrl = 'http://localhost:8080/cart/usercart';
        const queryString = new URLSearchParams(queryData).toString();
        const url = `${baseUrl}?${queryString}`;
        const response = await fetch(url); 
        const result = await response.json(); 
        console.log(JSON.stringify(result));
        
        if (result && result.rows) {
            result.rows.forEach(data => {
                if (data.prod_id === parseInt(req.body.prod_id)) {
                    throw new Error('Product already in cart');
                }
            });
        }

    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: error.message });
        return;
    }

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