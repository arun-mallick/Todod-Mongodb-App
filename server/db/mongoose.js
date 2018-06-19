var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost:27017/Arun');
var urlLocal = 'mongodb://localhost:27017/POC';
var urlProd = 'mongodb://admin:admin1234@ds257470.mlab.com:57470/todoapp';
mongoose.connect(urlLocal);


module.exports = {
    mongoose
}

