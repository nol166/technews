const app = require('express')
const router = app.Router()

// routes
const apiRoutes = require('./api')
router.use('/api', apiRoutes)

router.use((req, res) => {
    res.status(400).end()
})

module.exports = router
