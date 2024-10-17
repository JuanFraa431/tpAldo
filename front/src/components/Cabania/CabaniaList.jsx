import React from "react";

const CabanaList = ({ cabanas, onEdit, onDelete }) => {
    return (
        <div className="cabana-list">
            <h2>Lista de Cabañas</h2>
            <ul>
                {cabanas.map((cabana) => (
                    <li key={cabana.id} className="cabana-item">
                        <div>
                            <strong>Nombre:</strong> {cabana.nombre} <br />
                            <strong>Ubicacion:</strong> ${cabana.ubicacion} <br />
                            <strong>Capacidad:</strong> {cabana.capacidad} personas
                        </div>
                        <div>
                            <button onClick={() => onEdit(cabana)}>Editar</button>
                            <button onClick={() => onDelete(cabana.id, '/api/cabanias', 'cabanias')}>Eliminar</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CabanaList;
