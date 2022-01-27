var BeastsDB = require('../model/model')

function cleaner(a1, a2, a3, a4, a5){
    var array = [];
    for(i = 0; i < arguments.length; i++){
        array = arguments[i]
        for(j = 0; j < array.length; j++)
            if(!array[j].name){
                array.splice(j, 1)
                j -= 1;
            }
    }
}

//Retrieve and return all or single beasts.
exports.find = (req, res) => {

    if(req.query.id){ //If the id parameter was passed to the query object.
        const id = req.query.id
        
        BeastsDB.findById(id).then(beast => {
            if(!beast){
                res.status(404).send({ message : "Could not find a user with id: " + id})
            }
            else{
                res.send(beast)
            }
        }).catch(err => {
            res.status(500).send({ message : "Error retrieving user with id: " + id})
        })
    }
    else{
        BeastsDB.find().sort( { name : 1}).then(beasts => {
            if(req.query.level){
                var lev = req.query.level
                var pos
                //modify data based on level resitrictions.
                if(lev > 1 && lev < 4){
                    //Remvoe all beasts with a high CR.
                    for(i = 0; i < beasts.length; i++){
                        if(beasts[i].challenge !== "0" && beasts[i].challenge !== "1/4"){
                            var pos = i
                            beasts.splice(pos, 1)
                            i -= 1;
                        }
                    }

                    //Remove all beasts with flying and swimming.
                    for(i = 0; i < beasts.length; i++){
                        for(j = 0; j < beasts[i].movement.length; j++){
                            if(beasts[i].movement[j].name == "Fly" || beasts[i].movement[j].name == "Swim"){
                                var pos = i
                                beasts.splice(pos, 1)
                                i -= 1; //Account for the loss of element in the current index.
                            }
                        }
                    }

                        
                        
                        
                        /*else{
                            //Remove all beasts with flying and swimming.
                            for(j = 0; j < beasts[i].movement.length; j++){
                                if(beasts[i].movement[j].name == "fly" || beasts[i].movement[j].name == "swim"){
                                    var pos = i
                                    beasts.splice(pos, 1)
                                    i -= 1; //Account for the loss of element in the current index.
                                }
                            }
                        }
            
            
            
                    //{ $and: [ { challenge: { $lt: 0.25 } }, {$or: [{"movement.name": {$not : { $eq: "fly"}}}, {"movement.name": {$not : { $eq: "swim"}}}]} ] }
                    /*BeastsDB.find({ $and: [ { challenge: { $lt: 2 } }, {"movement.name": {$not : { $eq: "fly"}}}, {"movement.name": {$not : { $eq: "swim"}}} ] }).sort( { name : 1}).then(beasts => {
                        res.send(beasts)
                    })
                    .catch(err => {
                        res.status(500).send( {message : err.message || "Error Occurred while retrieving beast information."})
                    });*/
                    
                }
                else if(lev > 3 && lev < 8){
                    //Remvoe all beasts with a high CR.
                    //Remvoe all beasts with a high CR.
                    for(i = 0; i < beasts.length; i++){
                        if(beasts[i].challenge !== "0" && beasts[i].challenge !== "1/4" && beasts[i].challenge !== "1/2"){
                            var pos = i
                            beasts.splice(pos, 1)
                            i -= 1;
                        }
                    }

                    //Remove all beasts with flying.
                    for(i = 0; i < beasts.length; i++){
                        for(j = 0; j < beasts[i].movement.length; j++){
                            if(beasts[i].movement[j].name == "Fly"){
                                var pos = i
                                beasts.splice(pos, 1)
                                i -= 1; //Account for the loss of element in the current index.
                            }
                        }
                    }
                }
                else{
                    //Remvoe all beasts with a high CR.
                    for(i = 0; i < beasts.length; i++){
                        if(beasts[i].challenge > 1){
                            var pos = i
                            beasts.splice(pos, 1)
                            i -= 1;
                        }
                    }
                }

            }

            if(req.query.movement){
                var move = req.query.movement
                var pos = 1
                var temp = []

                for(i = 0; i < beasts.length; i++){
                    for(j = 0; j < beasts[i].movement.length; j++){
                        if(beasts[i].movement[j].name == move){
                            temp.push(beasts[i])
                        }
                    }      
                }

                beasts = temp
            }

            if(req.query.ability){
                var ability = req.query.ability
                var pos = 1
                var temp = []

                for(i = 0; i < beasts.length; i++){
                    for(j = 0; j < beasts[i].abilities.length; j++){
                        if(beasts[i].abilities[j].name == ability){
                            temp.push(beasts[i])
                        }
                    }      
                }

                beasts = temp
            }

            if(req.query.dtype){
                var dtype = req.query.dtype
                var pos = 1
                var temp = []

                for(i = 0; i < beasts.length; i++){
                    for(j = 0; j < beasts[i].actions.length; j++){
                        if(beasts[i].actions[j].dam_type == dtype){
                            temp.push(beasts[i])
                        }
                    }      
                }

                beasts = temp
            }

            /*if(req.query.filter){
                switch(filter){
                    case 1:
                        break;
                    case 2:
                        break;
                    default:
                        break;
                }

                res.send(beasts)
            }*/

            res.send(beasts)
            })
            .catch(err => {
                res.status(500).send( {message : err.message || "Error Occurred while retrieving beast information."})
            })
    }
}

//Handler for creating a new beast in the database.
exports.create = (req, res) => {
    if(!req.body){
        res.status(400).send({ message: "Form cannot be empty"})
        return;
    }
    
    
    //Declare and populte arrays for instertion.
    //Ability array.
    var ability_arr = [{
        name : req.body.ability_name1,
        text : req.body.ability_text1,
        keyword : [req.body.ability_keywords1]
    },
    {
        name : req.body.ability_name2,
        text : req.body.ability_text2,
        keyword : [req.body.ability_keywords2]
    },
    {
        name : req.body.ability_name3,
        text : req.body.ability_text3,
        keyword : [req.body.ability_keywords3]
    },
    {
        name : req.body.ability_name4,
        text : req.body.ability_text4,
        keyword : [req.body.ability_keywords4]
    }]

    //Ability mod array
    var ability_mod_arr = [{
        name: req.body.ability_mod_name1,
        number: req.body.ability_mod_bonus1
    },
    {
        name: req.body.ability_mod_name2,
        number: req.body.ability_mod_bonus2
    },
    {
        name: req.body.ability_mod_name3,
        number: req.body.ability_mod_bonus3
    },
    {
        name: req.body.ability_mod_name4,
        number: req.body.ability_mod_bonus4
    }];

    //Movement array.
    var movement_arr = [{
        name: req.body.movement_name1,
        number: req.body.movement_number1
    },
    {
        name: req.body.movement_name2,
        number: req.body.movement_number2
    },
    {
        name: req.body.movement_name3,
        number: req.body.movement_number3
    },
    {
        name: req.body.movement_name4,
        number: req.body.movement_number4
    },
    {
        name: req.body.movement_name5,
        number: req.body.movement_number5
    }];

    //Senses array.
    var sense_arr = [{
        name: req.body.sense_name1,
        number: req.body.sense_number1
    },
    {
        name: req.body.sense_name2,
        number: req.body.sense_number2
    },
    {
        name: req.body.sense_name3,
        number: req.body.sense_number3
    },
    {
        name: req.body.sense_name4,
        number: req.body.sense_number4
    }];

    //Action array.
    var action_arr = [{
        name : req.body.attack_name1,
        atype : req.body.attack_type1,
        mod : req.body.attack_mod1,
        reach : req.body.attack_reach1,
        target : req.body.attack_target1,
        dice_amount : req.body.dice_amount1,
        dice_type : req.body.dice_type1,
        dice_mod : req.body.dice_modifier1,
        dam_avg : req.body.damage_average1,
        dam_type : req.body.damage_type1,
        text : req.body.attack_text1,
        keywords : [req.body.attack_keywords1]
    },
    {
        name : req.body.attack_name2,
        type : req.body.attack_type2,
        mod : req.body.attack_mod2,
        reach : req.body.attack_reach2,
        target : req.body.attack_target2,
        dice_amount : req.body.dice_amount2,
        dice_type : req.body.dice_type2,
        dice_mod : req.body.dice_modifier2,
        dam_avg : req.body.damage_average2,
        dam_type : req.body.damage_type2,
        text : req.body.attack_text2,
        keywords : [req.body.attack_keywords2]
    },
    {
        name : req.body.attack_name3,
        type : req.body.attack_type3,
        mod : req.body.attack_mod3,
        reach : req.body.attack_reach3,
        target : req.body.attack_target3,
        dice_amount : req.body.dice_amount3,
        dice_type : req.body.dice_type3,
        dice_mod : req.body.dice_modifier3,
        dam_avg : req.body.damage_average3,
        dam_type : req.body.damage_type3,
        text : req.body.attack_text3,
        keywords : [req.body.attack_keywords3]
    },
    {
        name : req.body.attack_name4,
        type : req.body.attack_type4,
        mod : req.body.attack_mod4,
        reach : req.body.attack_reach4,
        target : req.body.attack_target4,
        dice_amount : req.body.dice_amount4,
        dice_type : req.body.dice_type4,
        dice_mod : req.body.dice_modifier4,
        dam_avg : req.body.damage_average4,
        dam_type : req.body.damage_type4,
        text : req.body.attack_text4,
        keywords : [req.body.attack_keywords4]
    }];

    //filter out empty inputs in the array.
    cleaner(ability_arr, ability_mod_arr, movement_arr, sense_arr, action_arr)

    //Create new database model instance.
    const newBeast = new BeastsDB({
        name: req.body.name,
        size: req.body.size,
        type: req.body.type,
        alignment: req.body.alignment,
        challenge: req.body.cr,
        hp: req.body.hp,
        ac: req.body.ac,
        scores: {
            str: req.body.str,
            str_mod: req.body.str_modifier,
            dex: req.body.dex,
            dex_mod: req.body.dex_modifier,
            con: req.body.con,
            con_mod: req.body.con_modifier,
            int: req.body.int,
            int_mod: req.body.int_modifier,
            wis: req.body.wis,
            wis_mod: req.body.wis_modifier,
            cha: req.body.cha,
            cha_mod: req.body.cha_modifier
        },
        abilities : ability_arr,
        ability_modifiers : ability_mod_arr,
        movement : movement_arr,
        senses : sense_arr,
        actions : action_arr,
        image : req.body.imgURL
    })

    //Save the new beast in the database.
    newBeast.save(newBeast).then(data => {
        res.redirect('/add-beast')
    })
    .catch(err => {
        res.status(500).send({
            message : err.message || "Some error occured during document creation."
        })
    })

    /*newBeast.save(newBeast).then(data => {
        res.redirect('/add-beast')
    })
    .catch(err => {
        res.status(500).send({ message: err.message || "Some error ocurred during save operation."})
    })*/
}

exports.update = (req, res) => {
    //Check to make sure there is data in the request body.
    if(!req.body){
        return res.status(400).send( {message : 'Cannot update user. No data available or user could not be found.'})
    }

    //Initialize id variable from query parameters.
    const id = req.params.id;

    //Update beast in the database.
    BeastsDB.findByIdAndUpdate(id, req.body, { useFindAndModify: false}).then(data => {
        if(!data){
            res.status(404).send( {message : 'Cannot update beast with that ID. User not found.'})
        }else{
            res.send(data)
        }
    }).catch(err => {
        res.status(500).send( {message: 'Error updating information.'})
    })

}

exports.delete = (req, res) => {
    //Initialize id variable from query parameters.
    const id = req.params.id;

    //Delete the beast from the database and render the page.
    BeastsDB.findByIdAndDelete(id).then( data => {
        if(!data){
            req.status(400).send( {message : 'Cannot delete user with that ID. User could not be found.'})
        }else{
            res.send({message : 'User was deleted successfully.'})
        }
    }).catch( err => {
        res.status(500).send({ message : 'Something went wrong during user deletion.'})
    })
}