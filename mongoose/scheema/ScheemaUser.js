const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
endpoint: {
  type: String,
  required: true
},
expirationTime: {
  type: String,
  required: false
},
keys:{
  type:Object,
  required:true
},
registered:{
  type:Date,
  required:false
}
});

module.exports = {
    UserSchema
}
