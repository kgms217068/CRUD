const mongoose = require('mongoose');

const diarySchema = new mongoose.Schema({
    title:String,
    content:String,
    date:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('Diary',diarySchema);