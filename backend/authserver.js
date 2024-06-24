require('dotenv').config();

const express = require("express");
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { access } = require('fs');

app.use(express.json());

let users = [] // PUT THIS INTO A DATABASE IN THE FUTURE
let refreshTokens = [] // PUT THIS INTO A DATABASE IN THE FUTURE

app.get('/users', (req, res) => {
    res.json(users);
});

const generateAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' });
}

// Called with the refreshToken to request a new accessToken
app.post('/token', (req, res) => {
    const refreshToken = req.body.token;
    if (refreshToken == null) return res.status(401).send()
    if (!refreshTokens.includes(refreshToken)) return res.status(403).send();
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).send();
        const accessToken = generateAccessToken({ username: user.username })
        res.json({ accessToken: accessToken })
    })
})

app.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10); // replaced salt with 10, does same thing
        const user = { username: req.body.username, password: hashedPassword }
        users.push(user);
        res.status(201).send();
    } catch {
        res.status(500).send();
    }
});

app.post('/login', async (req, res) => {
    // find a user where user.username = req.body.username
    const user = users.find(user => user.username === req.body.username);
    if (user == null ) {
        return res.status(400).send('Cannot Find User');
    }

    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            const accessToken = generateAccessToken(user);
            const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
            refreshTokens.push(refreshToken);
            res.json({ accessToken: accessToken, refreshToken: refreshToken });
        } else {
            res.send('Incorrect Credentials');
        }
    } catch {
        res.status(500).send();
    }
})

app.delete('/logout', (req, res) => {
    refreshTokens = refreshTokens.filter(token => token !== req.body.token)
    res.send(204).send();
})

app.listen(4000);