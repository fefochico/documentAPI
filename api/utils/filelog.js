
const fs = require('fs');
const morgan = require('morgan');
const path = require('path');

var filelog;
var accessLogStream;
if(process.env.NODE_ENV== 'local')
    var accessLogStream = fs.createWriteStream(path.join(__dirname, '../log/loc-access.log'), { flags: 'a' })
if(process.env.NODE_ENV=='dev')
    var accessLogStream = fs.createWriteStream(path.join(__dirname, '../log/dev-access.log'), { flags: 'a' })
if(process.env.NODE_ENV=='pro')
    var accessLogStream = fs.createWriteStream(path.join(__dirname, '../log/pro-access.log'), { flags: 'a' })

filelog= morgan('combined', { stream: accessLogStream })

module.exports= filelog;