const express = require('express');
const router = express.Router();
const cabañaController = require('../controllers/cabañaController');


router.get('/', cabañaController.obtenerCabañas);
router.get('/:id', cabañaController.obtenerCabañaPorId);
router.post('/', cabañaController.crearCabaña);
router.put('/:id', cabañaController.actualizarCabaña);
router.delete('/:id', cabañaController.eliminarCabaña);

module.exports = router;
