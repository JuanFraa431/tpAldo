import React from "react";

const CabanaForm = ({ cabanaEditada, onChange, onCancel, onSave }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        onChange({ ...cabanaEditada, [name]: value });
    };

    const nombre = cabanaEditada.nombre || '';
    const ubicacion = cabanaEditada.ubicacion || '';
    const capacidad = cabanaEditada.capacidad || '';

    return (
        <div className="cabana-form">
            <h2>{cabanaEditada.id === 0 ? "Crear Cabaña" : "Editar Cabaña"}</h2>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    onSave(cabanaEditada);
                }}
            >
                <label>
                    Nombre:
                    <input
                        type="text"
                        name="nombre"
                        value={nombre}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Ubicación:
                    <input
                        type="text"
                        name="ubicacion"
                        value={ubicacion}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Capacidad:
                    <input
                        type="number"
                        name="capacidad"
                        value={capacidad}
                        onChange={handleChange}
                        required
                    />
                </label>
                <div className='save-cancel-button'>
                    <button type="submit">Guardar</button>
                    <button type="button" onClick={onCancel} className="cancelar">
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CabanaForm;
