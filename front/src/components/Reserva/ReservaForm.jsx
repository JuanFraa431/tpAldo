import React from 'react';

const ReservaForm = ({ reservaEditada, onChange, onCancel, onSave }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        onChange({ ...reservaEditada, [name]: value });
    };

    const idCabana = reservaEditada.id_cabania || ''; 
    const idCliente = reservaEditada.id_cliente || ''; 
    const fechaInicio = reservaEditada.fecha_inicio || '';
    const fechaFin = reservaEditada.fecha_fin || '';

    return (
        <div className="reserva-form">
            <h2>{reservaEditada.id === 0 ? 'Crear Reserva' : 'Editar Reserva'}</h2>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    onSave(reservaEditada);
                }}
            >
                <label>
                    ID Cabaña:
                    <input
                        type="number"
                        name="id_cabania" 
                        value={idCabana} 
                        onChange={handleChange}
                    />
                </label>
                <label>
                    ID Cliente:
                    <input
                        type="number"
                        name="id_cliente"
                        value={idCliente}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Fecha Inicio:
                    <input
                        type="date"
                        name="fecha_inicio"
                        value={fechaInicio}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Fecha Fin:
                    <input
                        type="date"
                        name="fecha_fin"
                        value={fechaFin}
                        onChange={handleChange}
                        required
                    />
                </label>
                <div className='save-cancel-button'>
                    <button type="submit">Guardar</button>
                    <button type="button" onClick={onCancel} className="cancelar">Cancelar</button>
                </div>
            </form>
        </div>
    );
};

export default ReservaForm;
