const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        username: {
            type: String,
            required: true
        },
        phoneNumber: {
            type: Number,
            required: true,
            unique: true,
        },

        password: {
            type: String,
            required: true,
            min: [5, "The password must be at least 5 characters long"],
        },
        resetToken: {
            type: String,
            required: false,
        },
    }, 
    {timestamps: true}
    );

module.exports = mongoose.model('user', userSchema);