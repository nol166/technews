// import sequalize constructor from library
const Sequalize = require('sequelize')
require('dotenv').config()

// create connection to our db
const sequalize = new Sequalize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306,
    }
)

module.exports = sequalize
