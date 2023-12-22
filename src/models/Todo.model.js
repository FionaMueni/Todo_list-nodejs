const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema(
    {
        todo: {
            type: String,
            required: true
        },
    }, 
    {timeStamps: true}
    );

    module.exports = mongoose.model("Todo", todoSchema)