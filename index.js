// import lib
const express = require('express')
const app = express()

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const cfg = require('./src/config')
const route = require('./src/routes')

cfg.db.connect()

//parse URL-encoded bodies
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser('secret'))

// route init
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
route(app)

app.listen(cfg.port, () => {
    console.log(`Website is running at http://${cfg.host}:${cfg.port}`)
})