"use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const { top50 } = require("./data/top50.js");

express()
  // Below are methods that are included in express(). We chain them for convenience.
  // --------------------------------------------------------------------------------

  // This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
  .use(morgan("tiny"))
  .use(bodyParser.json())

  // Any requests for static files will go into the public folder
  .use(express.static("public"))

  // Nothing to modify above this line
  // ---------------------------------
  // add new endpoints here 👇

  .get("/", (req, res) => {
    res.status(200).json({ status: 200, message: "Homepage" });
  })

  .get("/top50", (req, res) => {
    const data = top50;
    // console.log(data);
    res.status(200).json({
      status: 200,
      data,
    });
  })

  .get("/top50/song/:id", (req, res) => {
    const songId = req.params.id;
    const rankToNum = Number(songId);
    // console.log(songId);
    // res.send(songId.data);
    const songData = top50.find((song) => {
      return song.rank === rankToNum;
    });

    if (songData) {
      res.status(200).json({
        status: 200,
        songData,
      });
    } else {
      res.status(404).json({
        status: 404,
        message: "Song not found",
      });
    }
  })

  .get("/top50/artist/:artist", (req, res) => {
    const artistId = req.params.artist;
    console.log(artistId);
    // const artistToString = artistId.toString();
    const artistInfo = top50.filter((song) => {
      return song.artist.toLowerCase() === artistId.toLowerCase();
    });
    if (artistInfo) {
      res.status(200).json({
        status: 200,
        data: artistInfo,
      });
    } else {
      res.status(404).json({
        status: 404,
        message: "Song not found",
      });
    }
  })

  .get("/top50/popular-artist", (req, res) => {
    const artistArray = [];
    top50.forEach((song) => {
      artistArray.push(song.artist);
    });

    let count = {};
    for (let i = 0; i < artistArray.length; i++) {
      let num = artistArray[i];
      count[num] = count[num] ? count[num] + 1 : 1;
    }

    let artistArraySort = Object.keys(count).sort((keya, keyb) => {
      return count[keyb] - count[keya];
    });

    const popularArtist = artistArraySort[0];

    const artistSongs = top50.filter((song) => {
      return song.artist.toLowerCase() === popularArtist.toLowerCase();
    });

    res.status(200).json({
      status: 200,
      data: artistSongs,
    });
  })

  .get("/top50/artist", (req, res) => {
    const allArtistsArray = [];
    const artistCheck = top50.map((song) => song.artist);
    function pushData(value, set) {
      allArtistsArray.push(value);
    }
    new Set(artistCheck).forEach(pushData);

    res.status(200).json({
      status: 200,
      data: allArtistsArray,
    });
  })
  // add new endpoints here ☝️
  // ---------------------------------
  // Nothing to modify below this line

  // this is our catch all endpoint.
  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })

  // Node spins up our server and sets it to listen on port 8000.
  .listen(8000, () => console.log(`Listening on port 8000`));
