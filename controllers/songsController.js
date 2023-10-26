const express= require("express");
const { getAllSongs, getOneSong, createSong } = require("../queries/songs.js")
const { checkName, checkBoolean } = require("../validations/checkSongs.js")
const songs = express.Router();

songs.get("/", async (req, res) => {
    const allSongs = await getAllSongs();
    if(allSongs[0]) {
        res.status(200).json({ success: true, data: {payload: allSongs}});
    } else {
        res.status(500).json({success: false, data: {error: "Failed to get all songs."}})
    }
});

songs.get("/:id", async (req, res) => {
    const { id } = req.params
    const oneSong = await getOneSong();
    if(oneSong) {
        res.json(oneSong)
    } else {
        res.status(404).json({error: "not found!"})
    }
});


songs.post("/", checkName, checkBoolean, async (req, res) => {
    try {
        const createdSong = await createSong(req.body)
        res.json(createdSong)
    } catch (error) {
         res.status(400).json({error: "Failed to create a song."})
    }
});

module.exports = songs;