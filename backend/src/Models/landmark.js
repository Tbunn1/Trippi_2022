const mongoose = require("mongoose");
const { Schema } = mongoose;


const landmarkSchema = Schema({
    name:{
        type: String,
        required: true,
    },
    streetAddress: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    zipCode: {
        type: Number,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    image: {
        type: String
    },
    description: {
        type: String,
        default: ''
    },
    latitude: {
        type: Number,
        required: false,
    },
    longitude: {
        type: Number,
        required: false
    },
    comments: [
        { 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'LandmarkComment'
        }
    ],
    likes: Number
});

module.exports = Landmark = mongoose.model("Landmark", landmarkSchema);
