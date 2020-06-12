const mongoose = require('mongoose');

var empSchema = new mongoose.Schema({
    name: {
        type: String,
        min: [5, 'Too short, min is 5 characters'],
        max: [32, 'Too long, max is 32 characters'],
        required: 'Full Name can\ t be empty'
    },
    skills: {
        type: Array
    },
    rating: {
        type: Array
    },
    notes: {
        type:String
    },
    createdAt: {
        type: String
    },
    
});

mongoose.model('employeedetails', empSchema);