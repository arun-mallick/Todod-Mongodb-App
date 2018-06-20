var express = require('express');
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;
var {mongoose} = require('./db/mongoose');
var {User} = require('./model/user');
var {authenticate} = require('./middleware/authenticate');
const {ObjectId} = require('mongodb');
const _ = require('lodash');
var app = express();
app.use(bodyParser.json());

app.post('/todo',(req,res)=>{
    console.log("Request",req.body.email)
    var newUser = new User({
        email:req.body.email,
        password:req.body.password
    });
    newUser.save().then(()=>{
        return newUser.generateAuthTokens();
    }).then((token)=>{
        console.log("token",token)
        res.header('x-auth',token).send(newUser);
        
    }).catch((e)=>{
        console.log(e)
        res.status(400).send(e)
    })
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
app.delete('/todo/:id',(req,res)=>{
    var id = req.params.id;
    if(!ObjectId.isValid(id)){
        return res.status(404).send("Invalid Id");
    }
    User.findByIdAndRemove(id).then((doc)=>{
        if(!doc){
            return res.status(404).send("No data found");
        }
        res.status(200).send({doc});
    }).catch((err) =>{
        res.status(404).send(`Error ${err}`);
    });
})

app.patch('/todo/:id',(req,res)=>{
    var id = req.params.id;
    if(!ObjectId.isValid(id)){
        return res.status(404).send("Invalid Id");
    }
    var body = _.pick(req.body,['email','completed']);
    body.completedAt = new Date().getTime();
    body.completed = req.body.completed;
    User.findByIdAndUpdate(id,{
        $set:body
    },{new : true}).then((doc)=>{
        if(!doc){
            return res.status(404).send("No data found");
        }
        res.status(200).send({doc});
    }).catch((error)=>{
        res.status(404).send(`Error ${error}`);
    })
})


//Login functionality
app.post('/users/login',(req,res)=>{
    var body = _.pick(req.body,['email','password']);
    //res.send(body)
    var data = new User(body);
    console.log(data)
    User.findByCredentials(data.email,data.password).then((user)=>{
        return user.generateAuthTokens().then((token)=>{
                res.header('x-auth',token).status(200).send({'results':{
                    'status':'success',
                    'endResult':0,
                    'token':user.tokens
                }})
        })
    }).catch((e)=>{
        res.status(401).send(e);
    })
});
app.post('/createUser',(req,res)=>{
    var body = _.pick(req.body,['email','password']);
    var data = new User(body);
    data.save().then(()=>{
        return data.generateAuthTokens();
    }).then((token)=>{
        //console.log("token",token)
        res.header('x-auth',token).send(data);
    }).catch((e)=>{
        console.log(e)
        res.status(400).send(e)
    })
});


app.get('/users/me',authenticate,(req,res)=>{
    res.status(200).send(req.user)
 });
app.delete('/users/me/removeToken',authenticate,(req,res)=>{
    req.user.removeToken(req.token).then(()=>{
        res.status(200).send(req.user);
    },(err)=>{
        res.status(401).send();
    })
})

app.listen(port,()=>{
    console.log("App started at",port);
})

module.exports={
    app
}

