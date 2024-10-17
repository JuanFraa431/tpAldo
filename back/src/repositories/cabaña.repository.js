const pool = require('../db');

class CabañaRepository {
    async obtenerTodos() {
        const [cabañas] = await pool.query('SELECT * FROM cabanias');
        return cabañas;
    }

    async obtenerPorId(id) {
        const [cabaña] = await pool.query('SELECT * FROM cabanias WHERE id = ?', [id]);
        return cabaña[0];
    }

    async crear(cabañaData) {
        const { nombre, ubicacion, capacidad} = cabañaData;
        const cabania = await pool.query(
            'INSERT INTO cabanias (nombre, ubicacion, capacidad) VALUES (?, ?, ? )',
            [nombre, ubicacion, capacidad]
        );
        return cabania;
    }

    async actualizar(id, cabañaData) {
        const { nombre, capacidad, ubicacion } = cabañaData;
        const result = await pool.query(
            'UPDATE cabanias SET nombre = ?, capacidad = ?, ubicacion = ? WHERE id = ?',
            [nombre, capacidad, ubicacion, id]
        );
        const afectedRodws = result.affectedRows;
        if (afectedRodws === 0) {
            return null;
        }
        return result;
    }

    async eliminar(id) {
        await pool.query('DELETE FROM cabanias WHERE id = ?', [id]);
        return { message: 'Cabaña eliminada' };
    }
}

module.exports = new CabañaRepository();
