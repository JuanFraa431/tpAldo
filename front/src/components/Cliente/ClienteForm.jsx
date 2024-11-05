import React from 'react';

const ClienteForm = ({ clienteEditado, onChange, onCancel, onSave }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        onChange({ ...clienteEditado, [name]: value });
    };

    const nombre = clienteEditado.nombre || '';
    const apellido = clienteEditado.apellido || '';
    const email = clienteEditado.email || '';
    const telefono = clienteEditado.telefono || '';

    return (
        <div className="cliente-form">
            <h2>{clienteEditado.id === 0 ? 'Crear Cliente' : 'Editar Cliente'}</h2>
            <form onSubmit={(e) => { e.preventDefault(); onSave(clienteEditado); }}>
                <label>
                    Nombre:
                    <input type="text" name="nombre" value={nombre} onChange={handleChange} required />
                </label>
                <label>
                    Apellido:
                    <input type="text" name="apellido" value={apellido} onChange={handleChange} required />
                </label>
                <label>
                    Email:
                    <input type="email" name="email" value={email} onChange={handleChange} required />
                </label>
                <label>
                    Teléfono:
                    <input type="tel" name="telefono" value={telefono} onChange={handleChange} required />
                </label>
                <div className='save-cancel-button'>
                    <button type="submit">Guardar</button>
                    <button type="button" onClick={onCancel} className="cancelar">Cancelar</button>
                </div>
            </form>
        </div>
    );
};

export default ClienteForm;
