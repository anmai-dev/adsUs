const mongoose = require('mongoose');

const MatchSchema = new mongoose.Schema({
    team1: {
        type: String,
        required: true
    },
    team2: {
        type: String,
        required: true
    },
    team1Logo: {
        type: String,
        required: true
    },
    team2Logo: {
        type: String,
        required: true
    },
    matchTime: {
        type: Date,
        required: true
    },
    cupType: {
        type: String,
        default: 'Chưa có giải đấu'
    }
}, { timestamps: true });

module.exports = mongoose.model('Match', MatchSchema); 