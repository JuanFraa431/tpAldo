const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Cabaña = sequelize.define('Cabaña', {
    nombre: DataTypes.STRING,
    ubicacion: DataTypes.STRING,
    capacidad: DataTypes.INTEGER
});

module.exports = Cabaña;