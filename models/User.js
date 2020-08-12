const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/connection')

// create User model
class User extends Model {}
// define table columns and config
User.init(
    {
        id: {
            type: DataTypes.INTEGER, // specialized data type
            allowNull: false, // same as NOT NULL
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true, // can't be duplicates of email addresses
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: 6,
            },
        },
    },
    {
        // TABLE CONFIGURATION OPTIONS GO HERE (https://sequelize.org/v5/manual/models-definition.html#configuration))
        sequelize, // pass in our imported sequelize connection (the direct connection to our database)
        timestamps: false, // don't automatically create createdAt/updatedAt timestamp fields
        freezeTableName: true, // don't pluralize name of database table
        underscored: true, // use underscores instead of camel-casing (i.e. `comment_text` and not `commentText`)
        modelName: 'user', // make it so our model name stays lowercase in the database
    }
)

module.exports = User
