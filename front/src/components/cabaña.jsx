import React, { useState, useEffect } from 'react';

function Cabañas() {
    const [cabañas, setCabañas] = useState([]);
    const [nombre, setNombre] = useState('');
    const [ubicacion, setUbicacion] = useState('');
    const [capacidad, setCapacidad] = useState('');

    useEffect(() => {
        fetch('/api/cabanias')
            .then((response) => response.json())
            .then((data) => setCabañas(data));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('/api/cabanias', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, ubicacion, capacidad }),
        })
            .then((response) => response.json())
            .then((newCabaña) => {
                setCabañas([...cabañas, newCabaña]);
                setNombre('');
                setUbicacion('');
                setCapacidad('');
            });
    };

    return (
        <div>
            <h2>Cabañas</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre" />
                <input type="text" value={ubicacion} onChange={(e) => setUbicacion(e.target.value)} placeholder="Ubicación" />
                <input type="number" value={capacidad} onChange={(e) => setCapacidad(e.target.value)} placeholder="Capacidad" />
                <button type="submit">Crear Cabaña</button>
            </form>
            <ul>
                {cabañas.map((cabaña) => (
                    <li key={cabaña.id}>{cabaña.nombre} - {cabaña.ubicacion}</li>
                ))}
            </ul>
        </div>
    );
}

export default Cabañas;