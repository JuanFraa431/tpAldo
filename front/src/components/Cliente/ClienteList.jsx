import React from 'react';

const ClienteList = ({ clientes, onEdit, onDelete }) => {
    return (
        <div className="cliente-list">
            <h2>Lista de Clientes</h2>
            <ul>
                {clientes.map((cliente) => (
                    <li key={cliente.id} className="cliente-item">
                        <div>
                            <strong>Nombre:</strong> {cliente.nombre} {cliente.apellido} <br />
                            <strong>Email:</strong> {cliente.email} <br />
                            <strong>Teléfono:</strong> {cliente.telefono}
                        </div>
                        <div>
                            <button onClick={() => onEdit(cliente)}>Editar</button>
                            <button onClick={() => onDelete(cliente)}>Eliminar</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ClienteList;
