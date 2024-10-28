import React from 'react';

const ClienteList = ({ clientes, onEdit, onDelete, isFiltered }) => {
    if (clientes.length === 0) {
        return <p>No hay clientes para mostrar.</p>;
    }
    
    const renderClienteItem = (cliente) => (
        <li key={`${cliente.id}-${cliente.email}`} className="cliente-item">
            <div>
                <strong>Nombre:</strong> {cliente.nombre} {cliente.apellido} <br />
                <strong>Email:</strong> {cliente.email} <br />
                <strong>Teléfono:</strong> {cliente.telefono}
            </div>
            {!isFiltered && (
                <div>
                    <button onClick={() => onEdit(cliente)}>Editar</button>
                    <button onClick={() => onDelete(cliente)}>Eliminar</button>
                </div>
            )}
        </li>
    );

    return (
        <div className="cliente-list">
            <h2>Lista de Clientes</h2>
            <ul>{clientes.map(renderClienteItem)}</ul>
        </div>
    );
};

export default ClienteList;
