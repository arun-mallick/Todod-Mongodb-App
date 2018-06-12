var mongoose = require('mongoose');
var User = mongoose.model('Person', {
    email:{
        type:String,
        minlength:5,
        required:true
    },
    completed :{
        type: Boolean
    },
    completedAt:{
        type:Number
    }
});
module.exports = {
    User
}