var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/Arun');
//mongoose.connect('mongodb://admin:admin1234@ds257470.mlab.com:57470/todoapp');


module.exports = {
    mongoose
}

