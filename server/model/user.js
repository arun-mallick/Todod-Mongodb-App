const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

var userSchema = new mongoose.Schema({
    email:{
        type:String,
        minlength:1,
        required:true,
        unique:true,
        trim:true,
        validate:{
            validator: function(v){
                return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v);

            },
            message:'{VALUE} is not a valid email'
        }
    },
    password:{
        type:String,
        minlength:6
    },
    tokens:[{
        access:{
            type:String,
            required:true
        },
        token:{
            type:String,
            required:true
        }
    }]
})
userSchema.methods.toJSON = function(){
    var user = this;
    var userObj = user.toObject();
    return _.pick(userObj,['email','password','tokens'])
}
userSchema.statics.findByToken = function(token){
    var User = this;
    var decoded;
    console.log("Token: ",token)
    try{
        decoded = jwt.verify(token,'123a')
    }catch(e){
        console.log(e);
        return Promise.reject();
    }
    console.log("Decoded ",decoded)
    return User.findOne({
        '_id':decoded._id,
        'tokens.token':token,
        'tokens.access':'auth'

    })
}
userSchema.methods.generateAuthTokens = function(){
    var user = this;
    var access = "auth";
    var token = jwt.sign({_id:user._id.toHexString(),access},'123a').toString();
    user.tokens={access,token};
    //user.tokens = user.tokens.concat({access, token})
    return user.save().then(()=>{
        return token;
    })
}
userSchema.pre('save',function(next){
    var User = this;
    if(User.isModified('password')){
        console.log("Invjkwbefkalid Username or Password")
        bcrypt.genSalt(10,(err,salt)=>{
            if(err){
                console.log("Error in generating salt",err);
            }else{
                bcrypt.hash(User.password,salt,(err,res)=>{
                    console.log(" in Invalid Username or Password")
                    if(res){
                        User.password = res;
                        next();
                    }else{
                        console.log("Invalid Username or Password")
                        return Promise.reject("Invalid Username or Password");
                    }
                })
            }   
        })
    }else{
        
        next();
    }
})
userSchema.statics.findByCredentials = function(email,password){
    var User = this;
    return User.findOne({email}).then((user)=>{
        if(!user){
            return Promise.reject();
        }
        return new Promise((resolve,reject)=>{
            bcrypt.compare(password,user.password,(err,res)=>{
                if(res){
                    resolve(user);
                }else{
                    reject();
                }
            })
        })
    })
};
var User = mongoose.model('check',userSchema );
module.exports = {
    User
}