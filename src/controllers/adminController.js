const { createTimeBlockService, listreservationsService } = require('../services/adminService');

const createTimeBlock = async(req, res) => {
  if(req.user.role !== 'ADMIN') {
    return res.status(403).json({error: 'Access denied'});
  }

  const { startTime, endTime } = req.body;

  try {
    const newTimeBlock = await createTimeBlockService(startTime, endTime);
    res.status(201).json(newTimeBlock);
  } catch(error) {
    res.status(500).jsonz({error: 'Error creating time block'});
  }
};

const listReservations = async (req, res) => {
  if(req.user.role !== 'ADMIN') {
    return res.status(403).json({error: 'Access denied'});
  }
  
  try {
    const reservations = await listreservationsService();
    res.json(reservations);
  } catch(error ) {
    res.status(500).jsonz({error: 'Error creating time block'});
  }
};

module.exports = { createTimeBlock, listReservations };