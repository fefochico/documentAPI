const Sequelize = require('sequelize');
const sequelize = new Sequelize(global.gConfig.sql_db.database, global.gConfig.sql_db.user, global.gConfig.sql_db.password, {
  host: global.gConfig.sql_db.host,
  dialect: 'mysql',
  pool:{
    max: 20,
    min: 0,
    idle: 30000
  },
  logging: false
});

module.exports = sequelize
