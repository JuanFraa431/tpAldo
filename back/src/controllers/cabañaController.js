const cabañaRepository = require('../repositories/cabaña.repository');

class CabañaController {
    async obtenerCabañas(req, res) {
        const cabañas = await cabañaRepository.obtenerTodos();
        res.json(cabañas);
    }

    async obtenerCabañaPorId(req, res) {
        const cabaña = await cabañaRepository.obtenerPorId(req.params.id);
        if (cabaña) {
            res.json(cabaña);
        } else {
            res.status(404).json({ message: 'Cabaña no encontrada' });
        }
    }

    async crearCabaña(req, res) {
        const nuevaCabaña = await cabañaRepository.crear(req.body);
        res.status(201).json(nuevaCabaña);
    }

    async actualizarCabaña(req, res) {
        const cabañaActualizada = await cabañaRepository.actualizar(req.params.id, req.body);
        if (cabañaActualizada) {
            res.json(cabañaActualizada);
        } else {
            res.status(404).json({ message: 'Cabaña no encontrada' });
        }
    }

    async eliminarCabaña(req, res) {
        await cabañaRepository.eliminar(req.params.id);
        res.json({ message: 'Cabaña eliminada' });
    }

    async findReservasByIdCabana(req, res) {
        const reservas = await cabañaRepository.findReservasByIdCabana(req.params.id);
        if (reservas) {
            res.json(reservas);
        } else {
            res.status(404).json({ message: 'Reservas no encontradas' });
        }
    }
}

module.exports = new CabañaController();
