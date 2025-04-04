const { Timestamp } = require('bson');
const mongoose = require('mongoose')

const videoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    useURL: {
        type: Boolean,
        required: true, // Trường này là bắt buộc
    },
    thumbnail: {
        type: String,
        required: true,
    },
    videoFile: {
        type: String,
        required: function () {
            return !this.useURL; // Chỉ bắt buộc nếu useURL là false
        },
    },
    videoURL: {
        type: String,
        required: function () {
            return this.useURL; // Chỉ bắt buộc nếu useURL là true
        },
    },
    tags: [String],
    duration: Number,
    isPublic: {
        type: Boolean,
        default: true,
    },
}
    , { timestamps: true });
module.exports = mongoose.model('Video', videoSchema)