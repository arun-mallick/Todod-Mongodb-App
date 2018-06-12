const {User} = require('./../server/model/user');
const {mongoose} = require('./../server/db/mongoose');
const {ObjectId} = require('mongodb');


User.remove({}).then((res)=>{
    console.log("Item deleted ",res)
})