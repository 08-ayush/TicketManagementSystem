const mongoose = require('mongoose');

const ResolverSchema = mongoose.Schema({
    username: {type:'String', required:true, trim: true },
    password: {type: 'String', required: true },
    department: {type: 'String', required: true }
});

const ResolverModel = new mongoose.model('resolver', ResolverSchema );

module.exports = {
    ResolverModel
}