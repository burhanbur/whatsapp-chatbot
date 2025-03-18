const express = require('express');
const { addResponse, getResponses, updateResponse, deleteResponse, logs } = require('../controllers/responseController');
const router = express.Router();

router.get('/logs', logs);
router.post('/', addResponse);
router.get('/', getResponses);
router.put('/:id', updateResponse);
router.delete('/:id', deleteResponse);

module.exports = router;
