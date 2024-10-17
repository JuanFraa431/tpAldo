const pool = require('../db');

class ReservaRepository {
  async obtenerTodos() {
    const [reservas] = await pool.query('SELECT * FROM reservas');
    return reservas;
  }

  async obtenerPorId(id) {
    const reserva = await pool.query('SELECT * FROM reservas WHERE id = ?', [id]);
    return reserva[0];
  }

  async crear(reservaData) {
    const { fecha_inicio, fecha_fin, id_cliente, id_cabania } = reservaData;
    const reserva = await pool.query(
      'INSERT INTO reservas (fecha_inicio, fecha_fin, id_cliente, id_cabania) VALUES (?, ?, ?, ?)',
      [fecha_inicio, fecha_fin, id_cliente || null, id_cabania || null]
    );
    return reserva;
  }

  async actualizar(id, reservaData) {
    const { fecha_inicio, fecha_fin, id_cliente, id_cabania } = reservaData;
    const reserva = await pool.query(
      'UPDATE reservas SET fecha_inicio = ?, fecha_fin = ?, id_cliente = ?, id_cabania = ? WHERE id = ?',
      [fecha_inicio, fecha_fin, id_cliente || null, id_cabania || null, id]
    );
    const afectedRodws = reserva.affectedRows;
    if (afectedRodws === 0) {
      return null;
    }
    return reserva;
  }

  async eliminar(id) {
    await pool.query('DELETE FROM reservas WHERE id = ?', [id]);
    return { message: 'Reserva eliminada' };
  }
}

module.exports = new ReservaRepository();
