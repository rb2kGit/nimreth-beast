const express = require("express")
const route = express.Router()
const services = require('../services/render')
const controller = require('../controller/controller')

/**
 * @description Root Route
 * @method GET
 */
route.get('/', services.homeRoutes)

/**
 * @description View Best route
 * @method GET
 */
route.get('/view-beast', services.view_beast)

route.get('/filter-results', services.filter_result)

route.get('/add-beast', (req, res) => {
    res.render('add-beast')
})

//API
route.get('/api/beasts', controller.find)
route.post('/api/beasts', controller.create)

module.exports = route;