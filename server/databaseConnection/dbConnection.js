const pg = require('pg')

const con = new pg.Pool({
    host:'localhost',
    port:'5432',
    user: 'postgres',
    password: '10112000',
    database: 'postgres'
})

const query = (sqlQuery,params) => {
    return new Promise((resolve,reject) => {
        con.query(sqlQuery,params,(error,result) => {
            console.log(sqlQuery);
            console.log(params);
            console.log("in query");
            if(error) {
                reject(error)
                console.log(error);
            }
            else {
                resolve(result);
            }
        });  
    })
    
};



module.exports = query;

