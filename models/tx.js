const db = require('../db')

const Schema = db.Schema;

const schema = new Schema({
    title: String,
    author: String,
    published_date: { type: Date, default: Date.now  }
});

module.exports = db.model('Transaction', schema)