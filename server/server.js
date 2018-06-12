var express = require('express');
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;
var {mongoose} = require('./db/mongoose');
var {User} = require('./model/user');
const {ObjectId} = require('mongodb');

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
app.get('/todo/:id',(req,res)=>{
    var id = new ObjectId(req.params.id)
    if(!ObjectId.isValid(id)){
        console.log("Id not valid")
        return res.status(404).send({});
    }
        User.findById(id).then((doc)=>{
            console.log("res",doc)
            if(!doc){
                return res.status(404).send({});
            }
        res.send({doc});
            
        }).catch((e)=>{
            res.status(404).send();
        })
    
    
})


app.listen(port,()=>{
    console.log("App started at",port);
})

module.exports={
    app
}

