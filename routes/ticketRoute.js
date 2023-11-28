const express = require('express');
const router = express.Router();
const Controller = require('../controllers/ticketController.js');


router.get('/', Controller.TicketController.showDashboard );
router.post('/raise', Controller.TicketController.raiseTicket );
router.get('/edit', Controller.TicketController.showEditDashboard );
router.post('/edit',  Controller.TicketController.editTicket );
router.get('/delete',Controller.TicketController.showDeleteDashboard  );
router.post('/delete',Controller.TicketController.deleteTicket  );
router.get('/status',Controller.TicketController.showIdDashboard  );
router.post('/status',Controller.TicketController.getTicketDetails  );
router.get('/all', Controller.TicketController.getAllTickets )
router.get('/dept', Controller.TicketController.getDeptTickets )

module.exports = {
    router
}


