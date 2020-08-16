const app = require('express')
const router = app.Router()
const User = require('../../models/User')

// GET /api/users
router.get('/', (req, res) => {
    User.findAll({
        attributes: {
            // exclude: ['password'],
        },
    })
        .then(users => res.json(users))
        .catch(err => {
            console.error(err)
            res.status(500).json(err)
        })
})

// GET /api/users/2
// SELECT * FROM users WHERE id = 1

router.get('/:id', ({ req }, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id,
        },
    })
        .then(user => {
            !user
                ? res
                      .status(404)
                      .json({ message: 'No user found with that ID :-/' })
                : res.json(user)
        })
        .catch(err => {
            console.error(err)
            res.status(500).json(err)
        })
})

// POST /api/users (create a user)

/* 
INSERT INTO users
  (username, email, password)
VALUES
  ("John", "John@gmail.com", "password1234");
*/

router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    })
        .then(newUser => res.json(newUser))
        .catch(err => {
            console.error(err)
            res.status(500).json({ message: 'User already exists', data: err })
        })
})

router.post('/login', (req, res) => {
    // expects { email: "jm@gmail.com", password: '1234'}
    User.findOne({
        where: {
            email: req.body.email,
        },
    }).then(user => {
        if (!user) {
            res.status(400).json({ message: 'No user found ' })
            return
        }

        const validPassword = user.checkPassword(req.body.password)
        if (!validPassword) {
            res.status(400).json({ message: 'incorrect password!' })
            return
        }

        res.json({ user: user, message: 'Logged in!' })
    })
})

// PUT /api/users/2 (aka update)

/* 
UPDATE users
SET username = "john", email = "john@gmail.com", password = "newPassword1234"
WHERE id = 1;
 */

router.put('/:id', (req, res) => {
    // expects {username: 'john', email: 'john@gmail.com', password: 'password1234'}
    // if req.body has exact key/value pairs, send it over
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id,
        },
    })
        .then(updatedUser => {
            !updatedUser[0]
                ? res.status(404).json({ message: 'no user found 😥' })
                : res.json(updatedUser)
        })
        .catch(err => {
            console.error(err)
            res.status(500).json.err
        })
})

// DELETE /api/users/2
router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id,
        },
    })
        .then(deletedUser => {
            if (!deletedUser) {
                res.status(400).json({
                    message: 'no user found with that id 😥',
                })
                return
            }
            res.json(deletedUser)
        })
        .catch(err => {
            console.error(err)
            res.status(500).json.err
        })
})

module.exports = router
