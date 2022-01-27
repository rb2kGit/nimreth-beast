const mongoose = require('mongoose')

var schema = new mongoose.Schema({
    name : String,
    challenge : String,
    size : String,
    type : String,
    alignment : String,
    hp : Number,
    ac : Number,
    abilities : [{
        name : String,
        text : String,
        keyword : [],
        _id : false
    }], 
    ability_modifiers : [{
        name : String,
        number : Number,
        _id : false
                        }],
    movement : [{
        name : String,
        number : Number,
        _id : false
    }],
    scores : {
        str : Number,
        str_mod : Number,
        dex : Number,
        dex_mod : Number,
        con : Number,
        con_mod : Number,
        int : Number,
        int_mod : Number,
        wis : Number,
        wis_mod : Number,
        cha : Number,
        cha_mod : Number,
    },
    senses : [{
        name : String,
        number : Number,
        _id : false
    }],
    actions : [{
        name : String,
        atype : String,
        text : String,
        mod : Number,
        reach : Number,
        target : Number, 
        dice_amount : Number,
        dice_type : Number,
        dice_mod : Number,
        dam_avg : Number,
        dam_type : String,
        keywords : [String],
        _id : false
    }],
    image : String
})

const BeastsDB = mongoose.model('beasts', schema)

module.exports = BeastsDB