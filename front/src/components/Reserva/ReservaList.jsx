import React from "react";

const ReservaList = ({ reservas, onEdit, onDelete, isFiltered }) => {
    if (!reservas.length) return <p>No hay reservas para mostrar.</p>;

    const renderReservaItem = (reserva) => (
        <li key={`${reserva.id}-${reserva.id_cabania}`} className="reserva-item">
            <div>
                <strong>ID Cabaña:</strong> {reserva.id_cabania} <br />
                <strong>ID Cliente:</strong> {reserva.id_cliente} <br />
                <strong>Fecha Inicio:</strong> {reserva.fecha_inicio} <br />
                <strong>Fecha Fin:</strong> {reserva.fecha_fin}
            </div>
            {!isFiltered && (
                <div>
                    <button onClick={() => onEdit(reserva)}>Editar</button>
                    <button onClick={() => onDelete(reserva)}>Eliminar</button>
                </div>
            )}
        </li>
    );

    return (
        <div className="reserva-list">
            <h2>Lista de Reservas</h2>
            <ul>{reservas.map(renderReservaItem)}</ul>
        </div>
    );
};

export default ReservaList;
