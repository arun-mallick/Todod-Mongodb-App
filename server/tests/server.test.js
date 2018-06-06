/*const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../model/user');

describe('POST/ Todos',()=>{
    it('It should post data',(done)=>{
        var text = "Hello World";
        request(app)
         .post('/Todos')
         .send({text})
         .expect(200)
         .expect((res) => {
             expect(res.body.text).toBe(text);
         })
         end((err,res)=>{
             if(err){
                 return done(err)
             }
             Todo.find().then((res)=>{
                expect(res.length).toBe(1);
             }).catch((e)=>{
                 done(e)
             })
         })
    })
})*/