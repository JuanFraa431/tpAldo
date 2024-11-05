import React, { useState, useEffect } from "react";

const CabanaList = ({ cabanas, onEdit, onDelete, isFiltered }) => {
    const [cabanasState, setCabanasState] = useState([]);

    useEffect(() => {
        setCabanasState(cabanas);
    }, [cabanas]);

    if (!cabanasState.length) return <p>No hay cabañas para mostrar.</p>;

    const renderCabanaItem = (cabana) => (
        <li key={`${cabana.id}-${cabana.nombre}`} className="cabana-item">
            <div>
                <strong>Nombre:</strong> {cabana.nombre} <br />
                <strong>Ubicación:</strong> {cabana.ubicacion} <br />
                <strong>Capacidad:</strong> {cabana.capacidad} personas
            </div>
            {!isFiltered && (
                <div className="botones-edit-delete">
                    <button onClick={() => onEdit(cabana)}>Editar</button>
                    <button onClick={() => onDelete(cabana)}>Eliminar</button>
                </div>
            )}
        </li>
    );

    return (
        <div className="cabana-list">
            <h2>Lista de Cabañas</h2>
            <ul>{cabanasState.map(renderCabanaItem)}</ul>
        </div>
    );
};

export default CabanaList;
