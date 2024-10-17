import React, { useState, useEffect } from 'react';

function Reservas() {
    const [reservas, setReservas] = useState([]);
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');

    useEffect(() => {
        fetch('/api/reservas')
            .then((response) => response.json())
            .then((data) => setReservas(data));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('/api/reservas', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fecha_inicio: fechaInicio, fecha_fin: fechaFin }),
        })
            .then((response) => response.json())
            .then((newReserva) => {
                setReservas([...reservas, newReserva]);
                setFechaInicio('');
                setFechaFin('');
            });
    };

    return (
        <div>
            <h2>Reservas</h2>
            <form onSubmit={handleSubmit}>
                <input type="date" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} />
                <input type="date" value={fechaFin} onChange={(e) => setFechaFin(e.target.value)} />
                <button type="submit">Crear Reserva</button>
            </form>
            <ul>
                {reservas.map((reserva) => (
                    <li key={reserva.id}>Reserva del {reserva.fecha_inicio} al {reserva.fecha_fin}</li>
                ))}
            </ul>
        </div>
    );
}

export default Reservas;