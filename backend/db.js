const mongoose = require('mongoose');

const mongoUri = 'mongodb://localhost:27017/appointments_db?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false';

const connectToMongo = () => {
    mongoose.connect(mongoUri, () => {
        console.log('Connected to mongo successfully.');
    })
}

module.exports = connectToMongo;