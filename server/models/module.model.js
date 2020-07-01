const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

var moduleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Module name can\'t be empty',
        unique: false
    },
    description: {
        type: String,
        required: 'description can\'t be empty',
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    }
});

mongoose.model('Module', moduleSchema);