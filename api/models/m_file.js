const Sequelize = require('sequelize');
const sequelize = require('../data/database.js');

const m_file = sequelize.define('file', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    name:{
        allowNull: false,
        type: Sequelize.STRING
    },
    originalname:{
        allowNull: false,
        type: Sequelize.STRING
    },
    localpath:{
        allowNull: false,
        type: Sequelize.STRING
    },
    iduser:{
        allowNull: false,
        type: Sequelize.INTEGER
    },
    createdAt: Sequelize.DATE,
});

m_file.sync();

module.exports= m_file;