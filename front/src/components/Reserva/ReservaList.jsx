import React from 'react';

const ReservaList = ({ reservas, onEdit, onDelete }) => {
    return (
        <div className="reserva-list">
            <h2>Lista de Reservas</h2>
            <ul>
                {reservas.map((reserva) => (
                    <li key={reserva.id} className="reserva-item">
                        <div>
                            <strong>ID Cabaña:</strong> {reserva.id_cabania} <br />
                            <strong>ID Cliente:</strong> {reserva.id_cliente} <br />
                            <strong>Fecha Inicio:</strong> {reserva.fecha_inicio} <br />
                            <strong>Fecha Fin:</strong> {reserva.fecha_fin}
                        </div>
                        <div>
                            <button onClick={() => onEdit(reserva)}>Editar</button>
                            <button onClick={() => onDelete(reserva)}>Eliminar</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ReservaList;