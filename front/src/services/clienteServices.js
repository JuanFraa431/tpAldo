const baseURL = '/api/cliente';

export const clienteService = {
    getAll: async () => {
        const response = await fetch(`${baseURL}/api/clientes`);
        if (!response.ok) {
            throw new Error('Error al obtener los clientes');
        }
        return await response.json();
    },

    getById: async (id) => {
        const response = await fetch(`${baseURL}/api/clientes/${id}`);
        if (!response.ok) {
            throw new Error('Error al obtener el cliente');
        }
        return await response.json();
    },

    create: async (data) => {
        const response = await fetch(`${baseURL}/api/clientes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error('Error al crear el cliente');
        }
        return await response.json();
    },

    update: async (id, data) => {
        const response = await fetch(`${baseURL}/api/clientes/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error('Error al actualizar el cliente');
        }
        return await response.json();
    },

    delete: async (id) => {
        const response = await fetch(`${baseURL}/api/clientes/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Error al eliminar el cliente');
        }
    },
};
