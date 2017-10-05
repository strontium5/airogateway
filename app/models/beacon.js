// app/models/beacon.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var BeaconSchema   = new Schema({
    id: String
});

module.exports = mongoose.model('Beacon', BeaconSchema);