const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
    author: {
        type: String,
        required: true,
    },
    heading: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})
postSchema.index({'$**': 'text'})
const post = mongoose.model("Post", postSchema)

module.exports = post;