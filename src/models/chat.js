const mongoose = require('mongoose');
const { Schema } = mongoose;

const chatSchema = new Schema({
    nick: String,
    msg: String,
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Chat', chatSchema);