const noteModel = require('../models/NotesModel.js');
const express = require('express');
const noteRoutes = express.Router();
const handleError = (res, err, notFoundId) => {
    if (err.name === 'ValidationError') {
        return res.status(400).send({ message: err.message });
    }
    if (err.name === 'CastError') {
        return res.status(400).send({ message: `Invalid note id: ${notFoundId || err.value}` });
    }
    return res.status(500).send({ message: err.message || 'Some error occurred.' });
};
noteRoutes.post('/notes', async (req, res) => {
    if (!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }
    try {
        const { noteTitle, noteDescription, priority, dateAdded, dateUpdated } = req.body.content;
        const note = new noteModel({ noteTitle, noteDescription, priority, dateAdded, dateUpdated });
        const saved = await note.save();
        res.status(201).send(saved);
    } catch (err) {
        handleError(res, err);
    }
});
noteRoutes.get('/notes', async (req, res) => {
    try {
        const notes = await noteModel.find();
        res.status(200).send(notes);
    } catch (err) {
        handleError(res, err);
    }
});
noteRoutes.get('/notes/:noteId', async (req, res) => {
    try {
        const note = await noteModel.findById(req.params.noteId);
        if (!note) {
            return res.status(404).send({ message: `Note not found with id ${req.params.noteId}` });
        }
        res.status(200).send(note);
    } catch (err) {
        handleError(res, err, req.params.noteId);
    }
});
noteRoutes.put('/notes/:noteId', async (req, res) => {
    if (!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }
    try {
        const { noteTitle, noteDescription, priority } = req.body.content;
        const update = { dateUpdated: Date.now() };
        if (noteTitle !== undefined) update.noteTitle = noteTitle;
        if (noteDescription !== undefined) update.noteDescription = noteDescription;
        if (priority !== undefined) update.priority = priority;

        const note = await noteModel.findByIdAndUpdate(req.params.noteId, update, {
            new: true,
            runValidators: true
        });
        if (!note) {
            return res.status(404).send({ message: `Note not found with id ${req.params.noteId}` });
        }
        res.status(200).send(note);
    } catch (err) {
        handleError(res, err, req.params.noteId);
    }
});
noteRoutes.delete('/notes/:noteId', async (req, res) => {
    try {
        const note = await noteModel.findByIdAndDelete(req.params.noteId);
        if (!note) {
            return res.status(404).send({ message: `Note not found with id ${req.params.noteId}` });
        }
        res.status(200).send({ message: "Note deleted successfully!" });
    } catch (err) {
        handleError(res, err, req.params.noteId);
    }
});
module.exports = noteRoutes;
