var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost:27017/Arun');
mongoose.connect('mongodb://<dbuser>:<dbpassword>@ds257640.mlab.com:57640/sample');


module.exports = {
    mongoose
}

