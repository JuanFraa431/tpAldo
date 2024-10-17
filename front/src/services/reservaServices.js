const baseURL = '/api/reserva';

export const reservaService = {
    getAll: async () => {
        const response = await fetch(`${baseURL}/api/reservas`);
        if (!response.ok) {
            throw new Error('Error al obtener las reservas');
        }
        return await response.json();
    },

    getById: async (id) => {
        const response = await fetch(`${baseURL}/api/reservas/${id}`);
        if (!response.ok) {
            throw new Error('Error al obtener la reserva');
        }
        return await response.json();
    },

    create: async (data) => {
        const response = await fetch(`${baseURL}/api/reservas`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error('Error al crear la reserva');
        }
        return await response.json();
    },

    update: async (id, data) => {
        const response = await fetch(`${baseURL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error('Error al actualizar la reserva');
        }
        return await response.json();
    },

    delete: async (id) => {
        const response = await fetch(`${baseURL}/api/reservas/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Error al eliminar la reserva');
        }
    },
};
