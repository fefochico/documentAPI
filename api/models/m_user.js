const Sequelize = require('sequelize');
const sequelize = require('../data/database.js');

const m_user = sequelize.define('user', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    username: {
        allowNull: false,
        type: Sequelize.STRING
    },
    password:{
        allowNull: false,
        type: Sequelize.STRING
    },
    email:{
        allowNull: false,
        type: Sequelize.STRING
    },
    createdAt: Sequelize.DATE,
});

m_user.sync();

module.exports= m_user;