// src/services/crudServices.js

export const fetchEntities = async (entity) => {
    try {
        const response = await fetch(`${entity}`);
        if (!response.ok) {
            throw new Error('Unknown entity'); 
        }
        return await response.json();
    } catch (error) {
        throw new Error(`Error fetching data from /api/${entity}: ${error.message}`);
    }
};

export const createEntity = async (entity, data) => {
    try {
        const response = await fetch(`${entity}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error('Unknown entity');
        }
        return await response.json();
    } catch (error) {
        throw new Error(`Error creating data in /api/${entity}: ${error.message}`);
    }
};

export const updateEntity = async (entity, data) => {
    try {
        const response = await fetch(entity, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error('Unknown entity');
        }
        return await response.json();
    } catch (error) {
        throw new Error(`Error updating data in ${entity}: ${error.message}`);
    }
};

export const deleteEntity = async (entity, id) => {
    try {
        const response = await fetch(`${entity}/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Unknown entity');
        }
        return await response.json();
    } catch (error) {
        throw new Error(`Error deleting data from /api/${entity}/${id}: ${error.message}`);
    }
};
