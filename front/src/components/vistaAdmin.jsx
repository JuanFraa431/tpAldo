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

    const [cabanaRelacionada, setCabanaRelacionada] = useState(null);
    const [clienteRelacionado, setClienteRelacionado] = useState(null);
    const [reservaRelacionada, setReservaRelacionada] = useState(null);


    const [busquedaId, setBusquedaId] = useState('');
    const [isFiltered, setIsFiltered] = useState(false); 

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

    const buscarCabanaPorId = async (id) => {
        try {
            const cabana = await fetchEntities(`/api/cabanias/${id}`);
    
            if (!cabana || Object.keys(cabana).length === 0) {
                setErrorMessage(`No se encontró la cabaña con ID ${id}.`);
                setCabanas([]);
                setReservas([]);
                return;
            }
    
            const reservasCabana = await fetchEntities(`/api/cabanias/${id}/reservas`);
    
            setCabanas([cabana]);
            setReservas(reservasCabana);
            setClienteRelacionado(null);
            setIsFiltered(true);
            setErrorMessage(null);
        } catch (error) {
            console.error('Error al buscar la cabaña:', error);
            setErrorMessage('Ocurrió un error al buscar la cabaña.');
        }
    };
    
    
    const buscarClientePorId = async (id) => {
        try {
            const cliente = await fetchEntities(`/api/clientes/${id}`);
    
            if (!cliente || Object.keys(cliente).length === 0) {
                setErrorMessage(`No se encontró el cliente con ID ${id}.`);
                setClientes([]); 
                setReservas([]);
                return;
            }
    
            const reservasCliente = await fetchEntities(`/api/clientes/${id}/reservas`);
    
            setClientes([cliente]);
            setReservas(reservasCliente);
            setCabanaRelacionada(null); 
            setIsFiltered(true); 
            setErrorMessage(null);  
        } catch (error) {
            console.error('Error al buscar el cliente:', error);
            setErrorMessage('Ocurrió un error al buscar el cliente.');
        }
    };
    
    const buscarReservaPorId = async (id) => {
        try {
            const [reserva] = await fetchEntities(`/api/reservas/${id}`);
    
            if (!reserva) {
                setErrorMessage(`No se encontró la reserva con ID ${id}.`);
                setReservas([]);
                setClienteRelacionado(null);
                setCabanaRelacionada(null);
                return;
            }
    
            let cliente = null;
            let cabana = null;
    
            if (reserva.id_cliente) {
                cliente = await fetchEntities(`/api/clientes/${reserva.id_cliente}`);
            }
    
            if (reserva.id_cabania) {
                cabana = await fetchEntities(`/api/cabanias/${reserva.id_cabania}`);
            }
    
            setReservas([reserva]);
            setClienteRelacionado(cliente);
            setCabanaRelacionada(cabana);
            setIsFiltered(true);
            setErrorMessage(null);
        } catch (error) {
            console.error('Error al buscar la reserva:', error);
            setErrorMessage('Ocurrió un error al buscar la reserva.');
        }
    };
    
    
    
    
    
    
    const handleVerTodos = async () => {
        await loadEntities('/api/cabanias', setCabanas);
        await loadEntities('/api/clientes', setClientes);
        await loadEntities('/api/reservas', setReservas);
    
        setBusquedaId('');
        setIsFiltered(false);
        setCabanaRelacionada(null);
        setClienteRelacionado(null);
        setReservaRelacionada(null);
    };

    const handleBuscar = async () => {
        if (!busquedaId) return;

        switch (selectedCategory) {
            case 'cabanas':
                await buscarCabanaPorId(busquedaId);
                break;
            case 'clientes':
                await buscarClientePorId(busquedaId);
                break;
            case 'reservas':
                await buscarReservaPorId(busquedaId);
                break;
            default:
                setErrorMessage('Selecciona una categoría antes de buscar.');
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
        if (!confirmacion) return;
    
        try {
            await deleteEntity(endpoint, id);
            await loadEntities(endpoint, setState);
            setErrorMessage(null);
        } catch (error) {
            console.error(`Error al eliminar el ${entityName}:`, error);
            setErrorMessage(`Error al eliminar el ${entityName}.`);
        }
    };
    

    const renderList = () => {
        switch (selectedCategory) {
            case 'cabanas':
                return (
                    <>
                        <CabanaList
                            cabanas={cabanas}
                            isFiltered={isFiltered}
                            onEdit={(cabana) => setCabanaEditada(cabana)}
                            onDelete={(cabana) => handleEliminar(cabana.id, '/api/cabanias', 'cabaña', setCabanas)}
                        />
                        {isFiltered && reservas.length > 0 && (
                            <ReservaList reservas={reservas} isFiltered={isFiltered} />
                        )}
                    </>
                );
            case 'clientes':
                return (
                    <>
                        <ClienteList
                            clientes={clientes}
                            isFiltered={isFiltered}
                            onEdit={(cliente) => setClienteEditado(cliente)}
                            onDelete={(cliente) => handleEliminar(cliente.id, '/api/clientes', 'cliente', setClientes)}
                        />
                        {isFiltered && reservas.length > 0 && (
                            <ReservaList reservas={reservas} isFiltered={isFiltered} />
                        )}
                    </>
                );
            case 'reservas':
                return (
                    <>
                        <ReservaList
                            reservas={reservas}
                            isFiltered={isFiltered}
                            onEdit={(reserva) => setReservaEditada(reserva)}
                            onDelete={(reserva) => handleEliminar(reserva.id, '/api/reservas', 'reserva', setReservas)}
                        />
                        {isFiltered && clienteRelacionado && (
                            <ClienteList clientes={[clienteRelacionado]} isFiltered={isFiltered} />
                        )}
                        {isFiltered && cabanaRelacionada && (
                            <CabanaList cabanas={[cabanaRelacionada]} isFiltered={isFiltered} />
                        )}
                    </>
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

            {selectedCategory && (
                <div className="busqueda">
                    <input
                        type="text"
                        value={busquedaId}
                        onChange={(e) => setBusquedaId(e.target.value)}
                        placeholder="Buscar por ID"
                    />
                    <button onClick={handleBuscar}>Buscar</button>
                    {isFiltered && <button onClick={handleVerTodos}>Ver Todos</button>}
                </div>
            )}

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
                        onSave={(cabana) => {
                            if (cabana.id === 0) {
                                handleCrear(cabana, '/api/cabanias', setCabanas);
                            } else {
                                handleEditar(cabana, '/api/cabanias', setCabanas);
                            }
                            setCabanaEditada(null);
                        }}
                    />
                )}

                {clienteEditado && (
                    <ClienteForm
                        clienteEditado={clienteEditado}
                        onChange={setClienteEditado}
                        onCancel={() => setClienteEditado(null)}
                        onSave={(cliente) => {
                            if (cliente.id === 0) {
                                handleCrear(cliente, '/api/clientes', setClientes);
                            } else {
                                handleEditar(cliente, '/api/clientes', setClientes);
                            }
                            setClienteEditado(null);
                        }}
                    />
                )}

                {reservaEditada && (
                    <ReservaForm
                        reservaEditada={reservaEditada}
                        onChange={setReservaEditada}
                        onCancel={() => setReservaEditada(null)}
                        onSave={(reserva) => {
                            if (reserva.id === 0) {
                                handleCrear(reserva, '/api/reservas', setReservas);
                            } else {
                                handleEditar(reserva, '/api/reservas', setReservas);
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
