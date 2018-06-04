const {MongoClient,ObjectId} = require('mongodb');
MongoClient.connect('mongodb://localhost:27017/Users',(err,client)=>{
    if(err){
        return console.log("Error while connecting to Database");
    }
    console.log('Connected to Mongodb server');
    const db = client.db('Users');
    db.collection('Users').findOneAndUpdate({
        _id:new ObjectId('5b138f0439ffd5029b700bf4')
    },{
        $set:{
            name:'Ashish Dash'
        },
        $inc:{
            age:-2
        }
    },{
        returnOriginal:false
    }).then((res)=>{
            console.log(`Successfully daleted data ${JSON.stringify(res)}`);
    },(err)=>{
            console.log(`Unable to fetch data`);
    })
    client.close();
});