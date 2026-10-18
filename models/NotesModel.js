const mongoose = require('mongoose');
const NoteSchema = new mongoose.Schema({
    noteTitle: {
        type: String,
        required: [true, 'noteTitle is required'],
        trim: true
    },
    noteDescription: {
        type: String,
        required: [true, 'noteDescription is required'],
        trim: true
    },
    priority: {
        type: String,
        enum: {
            values: ['HIGH', 'LOW', 'MEDIUM'],
            message: 'priority must be HIGH, LOW or MEDIUM'
        },
        default: 'MEDIUM',
        uppercase: true
    },
    dateAdded: {
        type: Date,
        default: Date.now
    },
    dateUpdated: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('Note', NoteSchema);
