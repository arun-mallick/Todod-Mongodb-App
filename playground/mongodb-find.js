const {MongoClient,ObjectId} = require('mongodb');
MongoClient.connect('mongodb://localhost:27017/Users',(err,client)=>{
    if(err){
        return console.log("Error while connecting to Database");
    }
    console.log('Connected to Mongodb server');
    const db = client.db('Users');
   db.collection('Users').find({
       name:'Arun Mallick'
   }).toArray().then((res)=>{
        console.log(`Successfully fetched data ${JSON.stringify(res)}`);
   },(err)=>{
        console.log(`Unable to fetch data`);
   })
    client.close();
});