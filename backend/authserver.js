require('dotenv').config();

const express = require("express");
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs').promises;

app.use(express.json());

let refreshTokens = [] // PUT THIS INTO A DATABASE IN THE FUTURE

const generateAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1hr' });
}

const addUser = (user, res) => {
    fs.readFile('db.json', 'utf-8', (err, data) => {
        if (err) return res.status(500).send("Error reading DB");
        const db = JSON.parse(data);
        db.users.push(user);
        fs.writeFile('db.json', JSON.stringify(db), (err) => {
            if (err) return res.status(500).send("Error writing to DB");
            res.status(201).send();
        });
    });
}

const addRefreshToken = (rtoken, res) => {
    fs.readFile('db.json', 'utf-8', (err, data) => {
        if (err) return res.status(500).send("Error reading DB");
        const db = JSON.parse(data);
        db.refreshTokens.push(rtoken);
        fs.writeFile('db.json', JSON.stringify(db, null, 2), (err) => {
            if (err) return res.status(500).send("Error writing to DB");
            res.status(201).send();
        });
    });
}

const getDB = async () => {
    try {
        const data = await fs.readFile('db.json', 'utf-8');
        return JSON.parse(data);
    } catch {
        throw new Error('Error reading DB');
    }
};

app.get('/users', (req, res) => {
    fs.readFile('db.json', 'utf-8', (err, data) => {
        if (err) return res.status(500).send("Error reading DB");
        const db = JSON.parse(data);
        res.status(200).json(db.users);
    })
});

// Called with the refreshToken to request a new accessToken
app.post('/token', async (req, res) => {
    const refreshToken = req.body.token;
    const db = await getDB();
    if (refreshToken == null) return res.status(401).send()
    if (!db.refreshTokens.includes(refreshToken)) return res.status(403).send();
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
        addUser(user, res);
        res.status(201).send();
    } catch {
        res.status(500).send();
    }
});

app.post('/login', async (req, res) => {
    // find a user where user.username = req.body.username
    const db = await getDB();
    const user = db.users.find(user => user.username === req.body.username);
    if (user == null ) {
        return res.status(400).send('Cannot Find User');
    }

    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            const accessToken = generateAccessToken(user);
            const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
            addRefreshToken(refreshToken, res);
            res.json({ accessToken: accessToken, refreshToken: refreshToken });
        } else {
            res.send('Incorrect Credentials');
        }
    } catch {
        res.status(500).send();
    }
})

app.delete('/logout', async (req, res) => {
    const db = await getDB();
    refreshTokens = db.refreshTokens.filter(token => token !== req.body.token)
    res.send(204).send();
})

app.listen(4000);