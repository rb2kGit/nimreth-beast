const axios = require('axios')

exports.homeRoutes = (req, res) => {
    axios.get('http://localhost:3000/api/beasts').then(function(response){
        res.render('index', { beasts : response.data})
    })
    .catch(err => {
        res.send(err)
    })
}

exports.view_beast =  (req, res) => {
    axios.get('http://localhost:3000/api/beasts', { params : {...req.query}}).then(function(beastdata){
        res.render('view-beast', { beast : beastdata.data})
    })
    .catch(err =>{
        res.send(err)
    })
}

exports.filter_result =  (req, res) => {
    axios.get('http://localhost:3000/api/beasts', { params : {...req.query}}).then(function(beastdata){
        res.render('view-results', { beasts : beastdata.data})
    })
    .catch(err =>{
        res.send(err)
    })
}