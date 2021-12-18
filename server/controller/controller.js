var BeastsDB = require('../model/model')

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
        res.status(400).send({ message: "Content cannot be empty"})
        return;
    }

    const newBeast = new BeastsDB({
        name: req.body.name,
        size: req.body.size,
        type: req.body.type,
        aligment: req.body.alignment,
        challenge: req.body.cr,
        hp: req.body.hp,
        ac: req.body.ac,
        scores: {
            str: req.body.str,
            str_mod: req.body.sMod,
            dex: req.body.dex,
            dex_mod: req.body.dMod,
            con: req.body.con,
            con_mod: req.body.cMod,
            int: req.boy.int,
            int_mod: req.body.iMod,
            wis: req.body.wis,
            wis_mod: req.body.wMod,
            cha: req.body.cha,
            cha_mod: req.body.cMod
        },
        image: req.body.imgURL,
    })

    newBeast.save(newBeast).then(data => {
        res.redirect('/add-beast')
    })
    .catch(err => {
        res.status(500).send({ message: err.message || "Some error ocurred during save operation."})
    })
}