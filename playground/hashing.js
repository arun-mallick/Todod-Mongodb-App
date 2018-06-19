const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
var data = {
    id:10
};
console.log(data);
var token = jwt.sign(data,'123abc');
console.log(token);
data.id=15;
token = jwt.sign(data,'123abc');

var decode = jwt.verify(token,'123abc')
console.log(decode);