const mongoose = require('mongoose');

const MatchSchema = new mongoose.Schema({
    team1: {
        type: String,
        required: true // Sửa từ "require" thành "required"
    },
    team2: {
        type: String,
        required: true // Sửa từ "require" thành "required"
    },
    team1Logo: {
        type: String,
        required: true // Sửa từ "require" thành "required"
    },
    team2Logo: {
        type: String,
        required: true
    },
    matchTime: {
        type: Date,
        required: true

    }
}, { timestamps: true });

module.exports = mongoose.model('Match', MatchSchema);