const app = require('express')
const router = app.Router()

const userRoutes = require('./user-routes')
const postRoutes = require('./post-routes')
router.use('/users', userRoutes) // initialize the /users subdomain
router.use('/posts', postRoutes)

module.exports = router
