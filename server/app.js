const express = require('express');
const app = express();
const router = require('./routers/router.js')
const parser = require('body-parser');
const cors = require('cors');
const { PORT } = require('./common/constants.js');

app.use(cors());
app.use(parser.json())
app.use(router);
app.listen(PORT,() => {
    console.log(`server running at localhost port ${PORT}`);
});

