const express = require('express');
const router = express.Router();
const cotizacionController = require('../controllers/cotizacionController');
const { authenticateToken } = require('../middlewares/authMiddleware');

// Rutas protegidas para cotizaciones
// Cada una requiere el middleware `authenticateToken` para validar el token JWT
router.post('/cotizaciones', authenticateToken, cotizacionController.createCotizacion);
router.get('/cotizaciones', authenticateToken, cotizacionController.getAllCotizaciones);
router.get('/cotizaciones/:id', authenticateToken, cotizacionController.getCotizacionById);
router.put('/cotizaciones/:id', authenticateToken, cotizacionController.updateCotizacion);
router.delete('/cotizaciones/:id', authenticateToken, cotizacionController.deleteCotizacion);

module.exports = router;