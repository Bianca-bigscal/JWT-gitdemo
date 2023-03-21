require('dotenv').config()
const { encrypt } = require('./service');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookies = require('cookie-parser');
const app = express();
app.use(express.json());

const port = process.env.PORT || 3001;

const users = [
    {
        email: "bianca@gmail.com",
        password: "123456"
    },
    {
        email: "komal@gmail.com",
        password: "123456789"
    }
];

app.get("/", (req, res) => {
    res.json(users);
    // res.send("its working");
})

app.post("/register", async (req, res) => {
    let { email, password } = req.body;
    let data = users.find((element) => {
        if (element.email == email)
            return true;
    })
    if (data) {
        res.send('user exists');
    } else {
        users.push({ email: email, password: encrypt(password) });
        res.send('done')
    }

});

app.post('/login', (req, res) => {
    let {email, password} = req.body;
    let user = users.filter((item) => {
        if(item.email == email && item.password == password)
            return true;
    })
    if(user){
        let payLoad = {
            email : email,
        }
        const token = jwt.sign(payLoad, process.env.TOKEN_SECRET,{expiresIn : '150s'})
        console.log(">>>",token);
    }
})


function tokenVerify(req, res, next) {
    try {
        const authHeader = req.headers['authorization'];
        console.log("+++", authHeader);
       const token = authHeader && authHeader.split(' ')[1];
       console.log(">>>", token);
       const data = jwt.verify(token, process.env.TOKEN_SECRET);
       console.log("<<<", data);
       req.users = data;
       next();
    } catch (e) {
        res.send(e);
    }
}

app.get('/profile', tokenVerify, (req, res) => {
    res.send(`Hello ${req.users.email}`);
})

app.listen(port, () => {
    console.log(`Listening port : ${port}`);
})