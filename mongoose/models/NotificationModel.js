const mongoose = require('mongoose');
const { NotifySchema } = require('../scheema/ScheemaNotify');

const NotifyModel = mongoose.model('notifications',NotifySchema);

module.exports = {
    NotifyModel
};