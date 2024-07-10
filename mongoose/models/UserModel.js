const mongoose = require('mongoose');
const { UserSchema } = require('../scheema/ScheemaUser');

const UserModel = mongoose.model('Users',UserSchema);

module.exports = {
 UserModel
};