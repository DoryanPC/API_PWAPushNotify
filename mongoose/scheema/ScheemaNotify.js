const mongoose = require('mongoose');

const NotifySchema = new mongoose.Schema({
id_notify: {
   type: Number,
  required: false
},
title: {
  type: String,
  required: true
},
body: {
  type: String,
  required: true
},
img_url: {
  type: String,
  required: false
}
});

module.exports = {
    NotifySchema
}
