import React from 'react';

const ClienteForm = ({ clienteEditado, onChange, onCancel, onSave }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        onChange({ ...clienteEditado, [name]: value });
    };

    return (
        <div className="cliente-form">
            <h2>{clienteEditado.id === 0 ? 'Crear Cliente' : 'Editar Cliente'}</h2>
            <form onSubmit={(e) => { e.preventDefault(); onSave(); }}>
                <label>
                    Nombre:
                    <input type="text" name="nombre" value={clienteEditado.nombre} onChange={handleChange} required />
                </label>
                <label>
                    Apellido:
                    <input type="text" name="apellido" value={clienteEditado.apellido} onChange={handleChange} required />
                </label>
                <label>
                    Email:
                    <input type="email" name="email" value={clienteEditado.email} onChange={handleChange} required />
                </label>
                <label>
                    Teléfono:
                    <input type="tel" name="telefono" value={clienteEditado.telefono} onChange={handleChange} required />
                </label>
                <button type="submit">Guardar</button>
                <button type="button" onClick={onCancel}>Cancelar</button>
            </form>
        </div>
    );
};

export default ClienteForm;
