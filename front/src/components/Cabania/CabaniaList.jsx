import React from "react";

const CabanaList = ({ cabanas, onEdit, onDelete, isFiltered }) => {
    const [cabanasState, setCabanasState] = React.useState(cabanas);

    React.useEffect(() => {
        setCabanasState(cabanas);
    }, [cabanas]);

    if (cabanas.length === 0) {
        return <p>No hay cabañas para mostrar.</p>;
    }

    return (

        
        <div className="cabana-list">
            <h2>Lista de Cabañas</h2>
            <ul>
                {cabanasState.map((cabana) => (
                    <li key={`${cabana.id}-${cabana.nombre}`} className="cabana-item">
                        <div>
                            <strong>Nombre:</strong> {cabana.nombre} <br />
                            <strong>Ubicacion:</strong> {cabana.ubicacion} <br />
                            <strong>Capacidad:</strong> {cabana.capacidad} personas
                        </div>
                        {!isFiltered && (
                            <div>
                                <button onClick={() => onEdit(cabana)}>Editar</button>
                                <button onClick={() => onDelete(cabana)}>Eliminar</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CabanaList;