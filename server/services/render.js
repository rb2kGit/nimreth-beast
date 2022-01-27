const axios = require('axios')

exports.homeRoutes = (req, res) => {
    axios.get('https://nimreths-beasts.herokuapp.com/api/beasts').then(function(response){
        res.render('index', { beasts : response.data})
    })
    .catch(err => {
        res.send(err)
    })
}

exports.view_beast =  (req, res) => {
    axios.get('https://nimreths-beasts.herokuapp.com/api/beasts', { params : {...req.query}}).then(function(beastdata){
        res.render('view-beast', { beast : beastdata.data})
    })
    .catch(err =>{
        res.send(err)
    })
}

exports.filter_result =  (req, res) => {
    axios.get('https://nimreths-beasts.herokuapp.com/api/beasts', { params : {...req.query}}).then(function(beastdata){
        res.render('view-results', { beasts : beastdata.data})
    })
    .catch(err =>{
        res.send(err)
    })
}

exports.add_beast =  (req, res) => {
    axios.get('https://nimreths-beasts.herokuapp.com/api/beasts', { params : {...req.query}}).then(function(beastdata){
        res.render('add-beast', { beasts : beastdata.data})
    })
    .catch(err =>{
        res.send(err)
    })
}

exports.edit_menu = (req, res) => {
    axios.get('https://nimreths-beasts.herokuapp.com/api/beasts').then(function(response){
        res.render('edit-menu', { beasts : response.data})
    })
    .catch(err => {
        res.send(err)
    })
}

exports.edit_beast =  (req, res) => {
    axios.get('https://nimreths-beasts.herokuapp.com/api/beasts', { params : {...req.query}}).then(function(beastdata){
        res.render('edit-beast', { beast : beastdata.data})
    })
    .catch(err =>{
        res.send(err)
    })
}

exports.flying = (req, res) => {
    res.render('flight')
    /*axios.get('http://localhost:3000/flight'/*'https://nimreths-beasts.herokuapp.com/flight').then(function(response){
        res.render('flight')
    })
    .catch(err => {
        res.send("Big Error Boy")
    })*/
}

//http://localhost:3000/api/beasts