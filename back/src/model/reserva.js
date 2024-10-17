const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Cliente = require('./cliente');
const Cabaña = require('./cabaña');

const Reserva = sequelize.define('Reserva', {
    fecha_inicio: DataTypes.DATE,
    fecha_fin: DataTypes.DATE
});

Reserva.belongsTo(Cliente);
Reserva.belongsTo(Cabaña);

module.exports = Reserva;