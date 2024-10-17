import React, { useState, useEffect } from 'react';
import '../styles/VistaCliente.css';

import CabanaList from './Cabania/CabaniaList';
import CabanaForm from './Cabania/CabaniaForm';

import ClienteList from './Cliente/ClienteList';
import ClienteForm from './Cliente/ClienteForm';

import ReservaList from './Reserva/ReservaList';
import ReservaForm from './Reserva/ReservaForm';

import { fetchEntities, updateEntity, deleteEntity, createEntity } from '../services/crudServices';

const VistaCliente = () => {
    const [errorMessage, setErrorMessage] = useState(null);

    const [cabanas, setCabanas] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [reservas, setReservas] = useState([]);

    const [selectedCategory, setSelectedCategory] = useState(null);

    const [cabanaEditada, setCabanaEditada] = useState(null);
    const [clienteEditado, setClienteEditado] = useState(null);
    const [reservaEditada, setReservaEditada] = useState(null);

    useEffect(() => {
        const loadAllEntities = async () => {
            await loadEntities('/api/cabanias', setCabanas);
            await loadEntities('/api/clientes', setClientes);
            await loadEntities('/api/reservas', setReservas);
        };
        loadAllEntities();
    }, []);

    const loadEntities = async (endpoint, setState) => {
        try {
            console.log(`Fetching data from ${endpoint}`);
            const data = await fetchEntities(endpoint);
            console.log(`Data received from ${endpoint}:`, data);
            setState(data);
        } catch (error) {
            console.error(`Error fetching data from ${endpoint}:`, error);
            setErrorMessage('Error al cargar los datos.');
        }
    };

    const handleCrear = async (entity, endpoint, setState) => {
        try {
            await createEntity(endpoint, entity);
            await loadEntities(endpoint, setState);
            setErrorMessage(null);
        } catch (error) {
            setErrorMessage('Error al crear la entidad.');
        }
    };

    const handleEditar = async (entity, endpoint, setState) => {
        try {
            await updateEntity(`${endpoint}/${entity.id}`, entity);
            await loadEntities(endpoint, setState);
            setErrorMessage(null);
        } catch (error) {
            setErrorMessage('Error al actualizar la entidad.');
        }
    };

    const handleEliminar = async (id, endpoint, entityName, setState) => {
        const confirmacion = window.confirm(`¿Seguro que deseas eliminar el ${entityName} con id ${id}?`);
        if (!confirmacion) {
            return;
        }

        try {
            await deleteEntity(endpoint, id);
            await loadEntities(endpoint, setState);
            setErrorMessage(null);
        } catch (error) {
            setErrorMessage('Error al eliminar la entidad.');
        }
    };

    const renderList = () => {
        switch (selectedCategory) {
            case 'cabanas':
                return (
                    <CabanaList
                        cabanas={cabanas}
                        onEdit={(cabana) => setCabanaEditada(cabana)}
                        onDelete={(cabana) => handleEliminar(cabana.id, '/api/cabanias', 'cabaña', setCabanas)}
                    />
                );
            case 'clientes':
                return (
                    <ClienteList
                        clientes={clientes}
                        onEdit={(cliente) => setClienteEditado(cliente)}
                        onDelete={(cliente) => handleEliminar(cliente.id, '/api/clientes', 'cliente', setClientes)}
                    />
                );
            case 'reservas':
                return (
                    <ReservaList
                        reservas={reservas}
                        onEdit={(reserva) => setReservaEditada(reserva)}
                        onDelete={(reserva) => handleEliminar(reserva.id, '/api/reservas', 'reserva', setReservas)}
                    />
                );
            default:
                return <p>Selecciona una categoría para ver los registros.</p>;
        }
    };

    return (
        <div className="vista-cliente">
            <h1>Vista Cliente</h1>
            <div className="category-buttons">
                <button onClick={() => setSelectedCategory('cabanas')}>Cabañas</button>
                <button onClick={() => setSelectedCategory('clientes')}>Clientes</button>
                <button onClick={() => setSelectedCategory('reservas')}>Reservas</button>
            </div>
            <div>{errorMessage && <p className="error-message">{errorMessage}</p>}</div>
            <div>{renderList()}</div>

            {selectedCategory === 'cabanas' && (
                <button className='boton-crear' onClick={() => setCabanaEditada({ id: 0, nombre: '', ubicacion:'', capacidad: 0 })}>
                    Crear Cabaña
                </button>
            )}

            {selectedCategory === 'clientes' && (
                <button className='boton-crear' onClick={() => setClienteEditado({ id: 0, nombre: '', apellido: '', email: '', telefono: '' })}>
                    Crear Cliente
                </button>
            )}

            {selectedCategory === 'reservas' && (
                <button className='boton-crear' onClick={() => setReservaEditada({ id: 0, id_cabana: 0, id_cliente: 0, fecha_inicio: '', fecha_fin: '' })}>
                    Crear Reserva
                </button>
            )}

            <div>
                {cabanaEditada && (
                    <CabanaForm
                        cabanaEditada={cabanaEditada}
                        onChange={setCabanaEditada}
                        onCancel={() => setCabanaEditada(null)}
                        onSave={async () => {
                            if (cabanaEditada.id === 0) {
                                await handleCrear(cabanaEditada, '/api/cabanias', setCabanas);
                            } else {
                                await handleEditar(cabanaEditada, '/api/cabanias', setCabanas);
                            }
                            setCabanaEditada(null);
                        }}
                    />
                )}
            </div>

            <div>
                {clienteEditado && (
                    <ClienteForm
                        clienteEditado={clienteEditado}
                        onChange={setClienteEditado}
                        onCancel={() => setClienteEditado(null)}
                        onSave={async () => {
                            if (clienteEditado.id === 0) {
                                await handleCrear(clienteEditado, '/api/clientes', setClientes);
                            } else {
                                await handleEditar(clienteEditado, '/api/clientes', setClientes);
                            }
                            setClienteEditado(null);
                        }}
                    />
                )}
            </div>

            <div>
                {reservaEditada && (
                    <ReservaForm
                        reservaEditada={reservaEditada}
                        onChange={setReservaEditada}
                        onCancel={() => setReservaEditada(null)}
                        onSave={async () => {
                            if (reservaEditada.id === 0) {
                                await handleCrear(reservaEditada, '/api/reservas', setReservas);
                            } else {
                                await handleEditar(reservaEditada, '/api/reservas', setReservas);
                            }
                            setReservaEditada(null);
                        }}
                    />
                )}
            </div>
        </div>
    );
};

export default VistaCliente;
