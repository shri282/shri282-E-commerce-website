const query = require('../databaseConnection/dbConnection.js')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = '3vf3fdmkmiekfmzkwo3pk4okm32kn3n42knk';


const getUsers = async (req,res) => {
    try {
        const sql = "select * from users";
        const params = [];
        const result = await query(sql,params);
        res.send(result.rows);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}


const postUser = async (req,res) => {
    try {
        const sql = "insert into users(name,username,email,password) values($1,$2,$3,$4)";
        const { name, username, email, password} = req.body;
        const hashedPassword = await bcrypt.hash(password,10);
        console.log(hashedPassword);
        const params = [name, username, email, hashedPassword];
        const result = await query(sql,params);
        const getUserSql = `select * from users where username = $1 limit 1`;
        const userData = await query(getUserSql,[username]);
        const user = userData.rows[0];
        const accessToken = jwt.sign({ userId: user.user_id }, secretKey, { expiresIn: '30m' });
        const refreshToken = jwt.sign({ userId: user.user_id }, secretKey, { expiresIn: '7d' });
        return res.status(201).json({'message' : 'user registered successfully','user' : user, 'accessToken' : accessToken, 'refreshToken': refreshToken});
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}


const getByUserName = async (req,res) => {
    try {
        const sql = `select * from users where username = $1 limit 1`;
        const params = [req.query.username];
        const result = await query(sql,params);
        res.send(result);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}


const loginUser = async (req,res) => {
    try {
        console.log("in login");
        const {user, password} = req.query;
        const sql = `select * from users where username = $1 limit 1`;
        const params = [user];
        const result = await query(sql,params);
        if(result.rows.length === 0) {
            return res.status(401).json({'message' : 'user not found'});
        }else {
            const isPasswordValid = await bcrypt.compare(password,result.rows[0].password);
            if(isPasswordValid) {
                const userFromDb = result.rows[0];
                const accessToken = jwt.sign({ userId: userFromDb.user_id }, secretKey, { expiresIn: '30m' });
                const refreshToken = jwt.sign({ userId: userFromDb.user_id }, secretKey, { expiresIn: '7d' });
                return res.status(200).json({'message' : 'user login successfull','user' : result.rows[0],'accessToken' : accessToken,'refreshToken': refreshToken});
            }else {
                return res.status(401).json({'message' : 'password was not valid'});
            }
        }
    } catch (error) {
        return res.status(500).json({'message' : 'internal server error'});
    }
}


const updateUserCart = async (req,res) => {
    try {
        const sql = `update users set cart = $1 where user_id = $2`;
        const params = [req.body.product,req.body.user_id];
        const result = await query(sql,params);
        res.send(result);
    } catch (error) {
        console.log(error);
        res.sent(error);
    }
}




module.exports = {
    getUsers : getUsers,
    postUser : postUser,
    getByUserName : getByUserName,
    updateUserCart : updateUserCart,
    loginUser : loginUser
}

