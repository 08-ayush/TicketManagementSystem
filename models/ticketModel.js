const mongoose = require('mongoose');

const ticketSchema =  mongoose.Schema({
    title: { type:String, required:true, trim: true },
    description: {type: String },
    priority: { type: String },
    department: { type: String, required: true },
    status: { type: String }
});

const TicketModel = new mongoose.model('ticketInfo', ticketSchema );

module.exports = {
    TicketModel
}