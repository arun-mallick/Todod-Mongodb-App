var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost:27017/Arun');
mongoose.connect('mongodb://arunslaz@gmail.com:1Situn@tcs4@ds257640.mlab.com:57640/sample');


module.exports = {
    mongoose
}

