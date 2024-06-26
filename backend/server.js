require("dotenv").config();

const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const cors = require("cors");

app.use(
  cors({
    origin: "http://127.0.0.1:4200",
  })
);
app.use(express.json());

const songs = [
  {
    song: "Jump",
    album: "11th Dimension",
    artist: "Ski Mask The Slump God",
    username: "elvin",
    id: 1,
  },
  {
    song: "Alright",
    album: "To Pimp A Butterfly",
    artist: "Kendrick Lamar",
    username: "tuesday",
    id: 2,
  },
  {
    song: "Tuk Tuk",
    album: "11th Dimension",
    artist: "Ski Mask The Slump God",
    username: "elvin",
    id: 3,
  },
  {
    song: "DNA.",
    album: "DAMN.",
    artist: "Kendrick Lamar",
    username: "tuesday",
    id: 4,
  },
];

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  // Bearer TOKEN
  // return undefined or the token
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.status(401).send();

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).send();
    req.user = user;

    // next() moves on from the middleware (aka authenticateToken)
    next();
  });
};

app.get("/songs", authenticateToken, (req, res) => {
  res.json(songs.filter((song) => song.username === req.user.username));
});

// Upload video

// Redirect to page that can display the video

app.listen(3000);
