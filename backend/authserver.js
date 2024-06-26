require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs").promises;

app.use(
  cors({
    origin: "http://127.0.0.1:4200",
  })
);

app.use(express.json());

const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1hr" });
};

const getDB = async () => {
  try {
    const data = await fs.readFile("db.json", "utf-8");
    return JSON.parse(data);
  } catch {
    throw new Error("Error reading DB");
  }
};

const addUser = async (user, res) => {
  try {
    const db = await getDB();
    db.users.push(user);
    await fs.writeFile("db.json", JSON.stringify(db));
    res.sendStatus(201);
  } catch {
    res.sendStatus(500);
  }
};

const addRefreshToken = async (rtoken, res) => {
  try {
    const db = await getDB();
    db.refreshTokens.push(rtoken);
    await fs.writeFile("db.json", JSON.stringify(db));
    res.sendStatus(201);
  } catch {
    res.sendStatus(500);
  }
};

app.get("/users", (req, res) => {
  fs.readFile("db.json", "utf-8", (err, data) => {
    if (err) return res.sendStatus(500);
    const db = JSON.parse(data);
    res.sendStatus(200).json(db.users);
  });
});

// Called with the refreshToken to request a new accessToken
app.post("/token", async (req, res) => {
  const refreshToken = req.body.token;
  const db = await getDB();
  if (refreshToken == null) return res.sendStatus(401);
  if (!db.refreshTokens.includes(refreshToken)) return res.sendStatus(403);
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = generateAccessToken({ username: user.username });
    res.json({ accessToken: accessToken });
  });
});

app.post("/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10); // replaced salt with 10, does same thing
    const user = {
      email: req.body.email,
      username: req.body.username,
      password: hashedPassword,
    };
    addUser(user, res);
  } catch {
    res.sendStatus(500);
  }
});

app.post("/login", async (req, res) => {
  // find a user where user.username = req.body.username
  const db = await getDB();
  const user = db.users.find((user) => user.username === req.body.username);
  if (user == null) return res.sendStatus(400);

  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      const accessToken = generateAccessToken(user);
      const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
      addRefreshToken(refreshToken, res);
      res.json({ accessToken: accessToken, refreshToken: refreshToken });
    } else {
      res.send("Incorrect Credentials");
    }
  } catch {
    res.sendStatus(500);
  }
});

app.delete("/logout", async (req, res) => {
  const db = await getDB();
  try {
    db.refreshTokens = db.refreshTokens.filter(
      (token) => token !== req.body.token
    );
    await fs.writeFile("db.json", JSON.stringify(db));
    res.sendStatus(204);
  } catch {
    res.sendStatus(500);
  }
});

app.listen(4000);
