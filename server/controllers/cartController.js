const query = require('../databaseConnection/dbConnection.js')


const postCart = async (req,res) => {

    try { 

        const queryData = {
            user_id : req.body.user_id
        } 

        const baseUrl = 'http://localhost:8080/cart/usercart';
        const queryString = new URLSearchParams(queryData).toString();
        const url = `${baseUrl}?${queryString}`;
        const prevCart = await fetch(url); 
        const prevCartData = await prevCart.json(); 
        let isProductInCart = false;
        
        if (prevCartData && prevCartData.rows) {
            prevCartData.rows.forEach(data => {
                if (data.prod_id === parseInt(req.body.prod_id)) {
                    isProductInCart = true;
                    return;
                }
            });
        }

        if (isProductInCart) {
            res.status(400).send('Product already in cart');
            return; 
        }

       const sql = `insert into cart(user_id,prod_id) values($1,$2)`
       const params = [req.body.user_id,req.body.prod_id];
       const result = await query(sql,params);
       res.send(result);

    } catch (error) {
       console.log(error);
       res.send(error);
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
        res.send(error);
     }
}


const deleteCart = async (req,res) => {
    try {
       const { user_id, prod_id } = req.query;
       const sql = `delete from cart where prod_id = $1 AND user_id = $2`;
       const params = [prod_id,user_id];
       const result = await query(sql,params);
       res.send(result);
    } catch (error) {
       console.log(error);
       res.send(error);
    }
}


module.exports = {
    postCart : postCart,
    getUserCart : getUserCart,
    deleteCart : deleteCart
}