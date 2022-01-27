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

route.get('/add-beast', services.add_beast)

route.get('/edit-menu', services.edit_menu)

route.get('/edit-beast', services.edit_beast)

route.get('/flight', services.flying)

/*route.get('/add-beast', (req, res) => {
    res.render('add-beast')
})*/

//API
route.get('/api/beasts', controller.find)
route.post('/api/beasts', controller.create)
route.put('/api/beasts/:id', controller.update)
route.delete('/api/beasts/:id', controller.delete)

module.exports = route;