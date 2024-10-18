const pool = require('../db');

class ClienteRepository {
    async obtenerTodos() {
        const [clientes] = await pool.query('SELECT * FROM clientes');
        return clientes;
    }

    async obtenerPorId(id) {
        const [cliente] = await pool.query('SELECT * FROM clientes WHERE id = ?', [id]);
        return cliente[0];
    }

    async crear(clienteData) {
        const { nombre, apellido, email, telefono } = clienteData;
        const result = await pool.query(
            'INSERT INTO clientes (nombre, apellido, email, telefono) VALUES (?, ?, ?, ?)',
            [nombre, apellido, email, telefono]
        );
        console.log(clienteData);
        return result;
    }

    async actualizar(id, clienteData) {
        const { nombre, email, telefono, apellido } = clienteData;
        const result = await pool.query(
            'UPDATE clientes SET nombre = ?, email = ?, telefono = ?, apellido = ? WHERE id = ?',
            [nombre, email, telefono, apellido, id]
        );
        const afectedRodws = result.affectedRows;
        if (afectedRodws === 0) {
            return null;
        }
        return result;
    }

    async eliminar(id) {
        await pool.query('DELETE FROM clientes WHERE id = ?', [id]);
        return { message: 'Cliente eliminado' };
    }

    async findReservasByIdCliente(id) {
        const [reservas] = await pool.query(
            'SELECT r.* FROM reservas r JOIN clientes c ON r.id_cliente = c.id WHERE c.id = ?',
            [id]
        );
        return reservas;
    }
}

module.exports = new ClienteRepository();
