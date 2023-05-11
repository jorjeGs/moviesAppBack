const { Schema, model } = require('mongoose');

const movieSchema = new Schema({
    title: String,
    category: String,
    released: String,
    imgurl: String,
    imdbid: String,
    synopsis: {
        type: String,
        required: true
    },

    ratings: [
        {
        star: Number,
        user: String,
        }
    ],

    globalrating:{
        type: String,
        default: 0,
    },

    votes:{
        type: Number,
        default: 0,
    }

}, {
    timestamps: true
});

module.exports = model('Movie', movieSchema);