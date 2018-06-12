const MongoClient = require('mongodb').MongoClient;
MongoClient.connect('mongodb://localhost:27017/Sample',(err,client)=>{
    if(err){
        return console.log("Error while connecting to Database");
    }
    console.log('Connected to Mongodb server');
    const db = client.db('Users');
    db.collection('Users').insertOne({
        name:'Dipti',
        age:25,
        location:'Bhubaneswar'
    },(err,res)=>{
        if(err)
            return console.log("Error while inserting into Database");
        console.log(JSON.stringify(res.ops));    
    });
    client.close();
});