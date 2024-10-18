import React from "react";

const CabanaForm = ({ cabanaEditada, onChange, onCancel, onSave }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        onChange({ ...cabanaEditada, [name]: value });
    };

    // Asegúrate de que los valores no sean undefined
    const nombre = cabanaEditada.nombre || '';
    const ubicacion = cabanaEditada.ubicacion || '';
    const capacidad = cabanaEditada.capacidad || '';

    return (
        <div className="cabana-form">
            <h2>{cabanaEditada.id === 0 ? "Crear Cabaña" : "Editar Cabaña"}</h2>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    onSave(cabanaEditada); // Llama a la función onSave pasando el objeto cabanaEditada
                }}
            >
                <label>
                    Nombre:
                    <input
                        type="text"
                        name="nombre"
                        value={nombre} // Usa el valor asegurado
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Ubicación:
                    <input
                        type="text"
                        name="ubicacion"
                        value={ubicacion} // Usa el valor asegurado
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Capacidad:
                    <input
                        type="number"
                        name="capacidad"
                        value={capacidad} // Usa el valor asegurado
                        onChange={handleChange}
                        required
                    />
                </label>
                <button type="submit">Guardar</button>
                <button type="button" onClick={onCancel}>
                    Cancelar
                </button>
            </form>
        </div>
    );
};

export default CabanaForm;
