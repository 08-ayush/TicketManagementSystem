const mongoose = require('mongoose');

const connectDB = async (DB_URL) => {

    try {
        const DB_OPTIONS ={
            dbName: 'tms'
        }
        const result = await mongoose.connect(DB_URL, DB_OPTIONS);
        console.log('MOngO is live now');
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    connectDB
}