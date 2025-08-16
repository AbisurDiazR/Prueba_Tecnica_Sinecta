const express = require('express');
const router = express.Router();
const propietarioController = require('../controllers/propietarioController');
const { authenticateToken } = require('../middlewares/authMiddleware');

// Rutas protegidas para propietarios
router.post('/propietarios', authenticateToken, propietarioController.createPropietario);
router.get('/propietarios', authenticateToken, propietarioController.getAllPropietarios);
router.get('/propietarios/:id', authenticateToken, propietarioController.getPropietarioById);
router.put('/propietarios/:id', authenticateToken, propietarioController.updatePropietario);
router.delete('/propietarios/:id', authenticateToken, propietarioController.deletePropietario);

module.exports = router;