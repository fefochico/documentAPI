const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const morgan = require('morgan');
const errorHandler= require('./utils/errorHandler');

//Variables de entorno
process.env.NODE_ENV = "dev";
var config= require('./config/config');
const logfile= require('./utils/filelog');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan(':date[iso] :remote-addr :method :url :status'))
app.use(logfile);

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers',
               'Origin, X-Requested-With, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

//Rutas
r_user= require('./routers/r_user');
r_file= require('./routers/r_file');

app.use('/user', r_user);
app.use('/file', r_file);

app.use(errorHandler);

//Puerto de acceso
app.listen(global.gConfig.port, ()=>{
    console.log(`Document manager in port ${global.gConfig.port}`);
})

module.exports = app