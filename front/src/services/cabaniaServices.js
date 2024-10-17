const baseURL = '/api/cabana';

export const cabaniaService = {
    getAll: async () => {
        const response = await fetch(`${baseURL}/api/cabanias`);
        if (!response.ok) {
            throw new Error('Error al obtener las cabañas');
        }
        return await response.json();
    },

    getById: async (id) => {
        const response = await fetch(`${baseURL}/api/cabanias/${id}`);
        if (!response.ok) {
            throw new Error('Error al obtener la cabaña');
        }
        return await response.json();
    },

    create: async (data) => {
        const response = await fetch(`${baseURL}/api/cabanias`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error('Error al crear la cabaña');
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
            throw new Error('Error al actualizar la cabaña');
        }
        return await response.json();
    },

    delete: async (id) => {
        const response = await fetch(`${baseURL}/api/cabanias/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Error al eliminar la cabaña');
        }
    },
};
