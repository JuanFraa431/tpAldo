import React from 'react';

const ReservaForm = ({ reservaEditada, onChange, onCancel, onSave }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        onChange({ ...reservaEditada, [name]: value });
    };

    return (
        <div className="reserva-form">
            <h2>{reservaEditada.id === 0 ? 'Crear Reserva' : 'Editar Reserva'}</h2>
            <form onSubmit={(e) => { e.preventDefault(); onSave(); }}>
                <label>
                    ID Cabaña:
                    <input type="number" name="id_cabana" value={reservaEditada.id_cabania} onChange={handleChange} required />
                </label>
                <label>
                    ID Cliente:
                    <input type="number" name="id_cliente" value={reservaEditada.id_cliente} onChange={handleChange} required />
                </label>
                <label>
                    Fecha Inicio:
                    <input type="date" name="fecha_inicio" value={reservaEditada.fecha_inicio} onChange={handleChange} required />
                </label>
                <label>
                    Fecha Fin:
                    <input type="date" name="fecha_fin" value={reservaEditada.fecha_fin} onChange={handleChange} required />
                </label>
                <button type="submit">Guardar</button>
                <button type="button" onClick={onCancel}>Cancelar</button>
            </form>
        </div>
    );
};

export default ReservaForm;
