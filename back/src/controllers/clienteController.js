const clienteRepository = require('../repositories/cliente.repository');

class ClienteController {
    async obtenerClientes(req, res) {
        const clientes = await clienteRepository.obtenerTodos();
        res.json(clientes);
    }

    async obtenerClientePorId(req, res) {
        const cliente = await clienteRepository.obtenerPorId(req.params.id);
        if (cliente) {
            res.json(cliente);
        } else {
            res.status(404).json({ message: 'Cliente no encontrado' });
        }
    }

    async crearCliente(req, res) {
        const nuevoCliente = await clienteRepository.crear(req.body);
        res.status(201).json(nuevoCliente);
    }

    async actualizarCliente(req, res) {
        const clienteActualizado = await clienteRepository.actualizar(req.params.id, req.body);
        if (clienteActualizado) {
            res.json(clienteActualizado);
        } else {
            res.status(404).json({ message: 'Cliente no encontrado' });
        }
    }

    async eliminarCliente(req, res) {
        await clienteRepository.eliminar(req.params.id);
        res.json({ message: 'Cliente eliminado' });
    }
}

module.exports = new ClienteController();
