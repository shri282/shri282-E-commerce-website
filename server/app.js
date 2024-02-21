const express = require('express');
const app = express();
const router = require('./routers/router.js')
const parser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(parser.json())
app.use(router);
app.listen('8080',() => {
    console.log('server running at localhost port 8080');
});

