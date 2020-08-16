const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/connection')
const bcrypt = require('bcrypt')

// create User model
class User extends Model {
    // set up method to run per user to check password
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password)
    }
}
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
        hooks: {
            //* .then version of beforeCreate hook
            // set beforeCreate lifecycle hook functionality
            // beforeCreate(userData) {
            //     return bcrypt
            //         .hash(userData.password, 10)
            //         .then(newUserData => newUserData)
            // },

            //* async version of beforeCreate
            // set beforeCreate lifecycle hook functionality (create)
            async beforeCreate(newUserData) {
                newUserData.password = await bcrypt.hash(
                    newUserData.password,
                    10
                )
                return newUserData
            },

            // set beforeUpdate lifecycle hook functionality (update)
            async beforeUpdate(updatedUserData) {
                updatedUserData.password = await bcrypt.hash(
                    updatedUserData.password,
                    10
                )
                return updatedUserData
            },
        },
        // TABLE CONFIGURATION OPTIONS GO HERE (https://sequelize.org/v5/manual/models-definition.html#configuration))
        sequelize, // pass in our imported sequelize connection (the direct connection to our database)
        timestamps: false, // don't automatically create createdAt/updatedAt timestamp fields
        freezeTableName: true, // don't pluralize name of database table
        underscored: true, // use underscores instead of camel-casing (i.e. `comment_text` and not `commentText`)
        modelName: 'user', // make it so our model name stays lowercase in the database
    }
)

module.exports = User
