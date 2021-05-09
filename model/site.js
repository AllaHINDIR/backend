const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const siteSchema = mongoose.Schema({

    nom: {type : String , required:true},
    longitude:{type:Number , required: true},
    latitude:{type:Number , required: true},
    _regionId : {type : mongoose.Schema.Types.ObjectID, ref : "Region" , required: true},
    isdmr : {type : Boolean, default : false}

});

siteSchema.plugin(uniqueValidator);

const site = mongoose.model('Site',siteSchema);

module.exports = site;
