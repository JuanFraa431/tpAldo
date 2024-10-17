import React, { useState, useEffect } from 'react';

function Clientes() {
    const [clientes, setClientes] = useState([]);
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');

    useEffect(() => {
        fetch('/api/clientes')
            .then((response) => response.json())
            .then((data) => setClientes(data));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('/api/clientes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, apellido, email, telefono }),
        })
            .then((response) => response.json())
            .then((newCliente) => {
                setClientes([...clientes, newCliente]);
                setNombre('');
                setApellido('');
                setEmail('');
                setTelefono('');
            });
    };

    return (
        <div>
            <h2>Clientes</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre" />
                <input type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} placeholder="Apellido" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                <input type="text" value={telefono} onChange={(e) => setTelefono(e.target.value)} placeholder="Teléfono" />
                <button type="submit">Crear Cliente</button>
            </form>
            <ul>
                {clientes.map((cliente) => (
                    <li key={cliente.id}>{cliente.nombre} - {cliente.email}</li>
                ))}
            </ul>
        </div>
    );
}

export default Clientes;