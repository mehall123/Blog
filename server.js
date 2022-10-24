const express = require('express')
const mongoose = require('mongoose')
const postsRouter = require('./routes/posts')
const aboutRouter = require('./routes/about')
const helpRouter = require('./routes/help')
const app = express()
const post = require('./models/post');

const url = 'mongodb://localhost:27017/blog';
const connect = mongoose.connect(url);

connect.then((db) => {
    console.log("Connected correctly to server");
}, (err) => { console.log(err); });

app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'ejs')

app.use(postsRouter)

app.use(helpRouter)

app.use(aboutRouter)

app.use('/public', express.static('public'))

app.listen(3000)