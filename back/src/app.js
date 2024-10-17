const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const clienteRoutes = require('./routes/clienteRoutes');
const cabañaRoutes = require('./routes/cabañaRoutes');
const reservaRoutes = require('./routes/reservaRoutes');

const app = express();


app.use(cors({
    origin: 'http://localhost:8080',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));


app.use(bodyParser.json());


app.use('/api/clientes', clienteRoutes);
app.use('/api/cabanias', cabañaRoutes);
app.use('/api/reservas', reservaRoutes);


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
