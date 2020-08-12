const app = require('express')
const router = app.Router()

const userRoutes = require('./user-routes')
router.use('/users', userRoutes) // initialize the /users subdomain

module.exports = router
