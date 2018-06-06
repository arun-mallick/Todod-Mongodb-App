var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {User} = require('./model/user');

var app = express();
app.use(bodyParser.json());

app.post('/todo',(req,res)=>{
    console.log("Request",req.body.email)
    var newUser = new User({
        email:req.body.email
    });
    newUser.save().then((docs)=>{
        res.status(200).send(docs)
    },(e)=>{
        res.status(400).send(e);
        
    });
});
app.get('/todo',(req,res)=>{
   User.find().then((user)=>{
       res.status(200).send({user})
   },(e)=>{
       res.status(400).send(e);
   })
})


app.listen(3000,()=>{
    console.log("App started");
})

module.exports={
    app
}

