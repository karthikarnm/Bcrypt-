const express = require("express");
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser')


const app = express();



app.use(express.json())


app.use(express.static('views'));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));




const users = []


app.get('/get', (req, res) => {

    res.json(users);
})
app.get('/register', (req, res) => {
    res.sendFile(__dirname + "/views/index.html")
})
app.get('/login', (req, res) => {
    // res.writeHead(200,'Content-Type : application/json')
    res.sendFile(__dirname + "/views/Login.html")

})

app.post('/register', async (req, res) => {
    // const salt = await bcrypt.genSalt();
    const hashedPass = await bcrypt.hash(req.body.password, 10);
    const user = {
        name: req.body.name,
        email: req.body.email,
        password: hashedPass,
        confirmPassword: hashedPass,

    }
    users.push(user)
    res.redirect('/login');
})
app.post('/login', async (req, res) => {
    const user = users.find(user =>
        user.password = req.body.password
    )
    if (user == null) {
        res.sendStatus(404);
    }
    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            res.send("Success")
        }
        else {
            res.send("not found")
        }

    }
    catch {
        res.sendStatus(404)
    }
})

app.listen(3000, () => {
    console.log("SERVER STARTED :)")
})