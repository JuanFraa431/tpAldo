import React from 'react';
import Clientes from './components/cliente';
import Cabañas from './components/cabaña';
import Reservas from './components/reserva';
import VistaAdmin from './components/vistaAdmin';

function App() {
    return (
        <div>
            <h1>Gestión de Clientes, Cabañas y Reservas</h1>
            <VistaAdmin/>
        </div>
    );
}

export default App;