//require the liberary
const mongoose = require('mongoose');

//creating schema for tasks 
const taskSchema= new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    category: {
        type: String
    }
});


const Task = mongoose.model('Task', taskSchema);

//exporting the schema
module.exports = Task;