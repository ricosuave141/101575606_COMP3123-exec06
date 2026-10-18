const express = require('express');
const mongoose = require('mongoose');
const noteRoutes = require('./routes/NoteRoutes.js');
// const DB_URL = process.env.DB_URL || "mongodb+srv:<user|password|cluster>.zbwpmam.mongodb.net/<notesdbcluster>";
const PORT = process.env.PORT || 8081;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.send("<h1>Welcome to Note-taking application - Week06 Exercise</h1>");
});
app.use('/', noteRoutes);
mongoose.connect(DB_URL).then(() => {
    console.log("Successfully connected to mongoDB Atlas Server database");
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });
}).catch(err => {
    console.log('Could not connect to database. Exiting...', err);
    process.exit();
});
