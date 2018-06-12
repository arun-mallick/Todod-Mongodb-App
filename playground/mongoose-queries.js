const {User} = require('./../server/model/user');
const {mongoose} = require('./../server/db/mongoose');
const {ObjectId} = require('mongodb');

var id = "5b158ae20516a808554fa755";
if(!ObjectId.isValid(id)){
    console.log("Id is not valid");
}
User.findById(id).then((res)=>{
    if(!res){
        return console.log("No Data Found")
    }
    console.log("Data Found ",res)
}).catch((e)=>{
    console.log("Error",e)
})
