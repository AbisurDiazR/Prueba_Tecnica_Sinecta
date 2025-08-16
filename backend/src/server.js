require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Importar todas las rutas
const userRoutes = require('./routes/userRoutes');
const cotizacionRoutes = require('./routes/cotizacionRoutes');
const propietarioRoutes = require('./routes/propietarioRoutes');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Rutas principales
app.use('/api', userRoutes);
app.use('/api', cotizacionRoutes);
app.use('/api', propietarioRoutes);

app.get('/', (req, res) => {
    res.send('¡Servidor funcionando!');
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});