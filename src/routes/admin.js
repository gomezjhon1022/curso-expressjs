const { Router } = require('express');
const { createTimeBlocks, listReservations } = require('../controllers/adminController');

const router = Router();

router.post('time-blocks', createTimeBlocks);
router.get('/reservations', listReservations);

