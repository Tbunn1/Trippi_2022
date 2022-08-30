const mongoose = require("mongoose");
const { Schema } = mongoose;

const landmarkCommentSchema = Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    landmark: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Landmark',
        required: true,
    },
    text: {
        type: String,
        trim: true,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    likes: {
        type: Number,
        default: 0
    }
});

module.exports = LandmarkComment = mongoose.model("LandmarkComment", landmarkCommentSchema);
