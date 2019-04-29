require('dotenv').config()

const express = require('express')
const app = express()
// const mongoose = require('mongoose');

const levelup = require('levelup');
const db = levelup('./db');

db.put('name', 'LevelUP', function (err) { 
    if (err) return console.log('Ooops!', err) 
    // some kind of I/O error 
    // 3) fetch by key 
    
    db.get('name', function (err, value) { 
        if (err) return console.log('Ooops!', err) 
        // likely the key was not found 
        // ta da! 
        console.log('name=' + value) 
    }) 
})

const bodyParser = require('body-parser');

const router = require('./router')(app)

const Schema = mongoose.Schema;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// mongoose.Promise = global.Promise;

// // CONNECT TO MONGODB SERVER
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log('Successfully connected to mongodb'))
//   .catch(e => console.error(e));


  

// const schema = new Schema({
//     title: String,
//     author: String,
//     published_date: { type: Date, default: Date.now  }
// });

// module.exports = mongoose.model('YGGDRASH', schema);