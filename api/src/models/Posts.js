const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String, default: null }
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);