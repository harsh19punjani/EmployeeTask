const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/Employee',{ useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true, useUnifiedTopology: true,  bufferMaxEntries: 0 }, (err) => {
    if (!err) {
        console.log('Mongodb connection successfully');
    } else {
        console.log('Error in mongodb connection:', JSON.stringify(err, undefined, 2));
    }
});

require('./employee.model');