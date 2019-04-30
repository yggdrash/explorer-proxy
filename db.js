const mongoose = require('mongoose')

mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Successfully connected to mongodb'))
  .catch(e => console.error(e));

module.exports = mongoose
