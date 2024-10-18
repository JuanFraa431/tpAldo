const reservaRepository = require('../repositories/reserva.repository');

class ReservaController {
    async obtenerReservas(req, res) {
        const reservas = await reservaRepository.obtenerTodos();
        res.json(reservas);
    }

    async obtenerReservaPorId(req, res) {
        const reserva = await reservaRepository.obtenerPorId(req.params.id);
        if (reserva) {
            res.json(reserva);
        } else {
            res.status(404).json({ message: 'Reserva no encontrada' });
        }
    }

    async crearReserva(req, res) {
        const nuevaReserva = await reservaRepository.crear(req.body);
        res.status(201).json(nuevaReserva);
    }

    async actualizarReserva(req, res) {
        const reservaActualizada = await reservaRepository.actualizar(req.params.id, req.body);
        if (reservaActualizada) {
            res.json(reservaActualizada);
        } else {
            res.status(404).json({ message: 'Reserva no encontrada' });
        }
    }

    async eliminarReserva(req, res) {
        await reservaRepository.eliminar(req.params.id);
        res.json({ message: 'Reserva eliminada' });
    }

    async findClientesByIdReserva(req, res) {
        const clientes = await reservaRepository.findClientesByIdReserva(req.params.id);
        if (clientes) {
            res.json(clientes);
        } else {
            res.status(404).json({ message: 'Clientes no encontrados' });
        }
    }

    async findCabaniasByIdReserva(req, res) {
        const cabanias = await reservaRepository.findCabaniasByIdReserva(req.params.id);
        if (cabanias) {
            res.json(cabanias);
        } else {
            res.status(404).json({ message: 'Cabañas no encontradas' });
        }
    }
}

module.exports = new ReservaController();
