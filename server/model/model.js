const mongoose = require('mongoose')

var schema = new mongoose.Schema({
    name : {
        type : String,
        required: true,
        unique: true
    },
    challenge : {
        type : String,
        required: true
    },
    size : {
        type : String,
        required : true
    },
    type : {
        type: String,
        required : true
    },
    alignment : {
        type : String,
        required : true
    },
    hp : {
        type : Number,
        required: true
    },
    ac : {
        type : Number,
        required : true
    },
    abilities : [Object] ,
    ability_modifiers : [Object],
    movement : [Object],
    scores : {
        type : Object,
        required : true,
        properties : {
            str : { type : Number, required : true},
            str_mod : { type : Number, required : true},
            dex : { type : Number, required : true},
            dex_mod : { type : Number, required : true},
            con : { type : Number, required : true},
            con_mod : { type : Number, required : true},
            int : { type : Number, required : true},
            int_mod : { type : Number, required : true},
            wis : { type : Number, required : true},
            wis_mod : { type : Number, required : true},
            cha : { type : Number, required : true},
            cha_mod : { type : Number, required : true}
        }
    },
    senses : [Object],
    actions : {
        type : Object,
        required : false,
        properties : {
            name : { type : String, required : true},
            type : { type : String, required : true},
            mod : { type : Number, required : true },
            reach : { type : Number, required : true},
            target : { type : Number, required : true},
            dice1 : { type : Number, required : true},
            dice2 : { type : Number, required : true},
            dice_mod : { type : Number, required : false},
            dam_type : { type : String, required : true},
            text : { type : String, required : true},
            keywords : [String]
        }
    }
})

const BeastsDB = mongoose.model('beasts', schema)

module.exports = BeastsDB