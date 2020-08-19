const app = require('express')
const router = app.Router()
const { Post, User, Vote } = require('../../models')

// get all posts
router.get('/', (req, res) => {
    Post.findAll({
        attributes: ['id', 'post_url', 'title', 'created_at'],
        order: [['created_at', 'DESC']],
        include: [
            {
                model: User,
                attributes: ['username'],
            },
        ],
    })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})

router.get('/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id,
        },
        attributes: ['id', 'post_url', 'title', 'created_at'],
        include: [
            {
                model: User,
                attributes: ['username'],
            },
        ],
    })
        .then(post => {
            if (!post) {
                res.status(400).json({ message: 'No post found with that id!' })
                return
            }
            res.json(post)
        })
        .catch(err => res.status(500).json(err))
})

// create a post
router.post('/:id', (req, res) => {
    Post.create({
        title: req.body.title,
        post_url: req.body.post_url,
        user_id: req.body.user_id,
    })
        .then(newPost => res.json(newPost))
        .catch(err => res.status(500).json(err))
})

// PUT /api/posts/upvote
router.put('/upvote', (req, res) => {
    Vote.create({
        user_id: req.body.user_id,
        post_id: req.body.post_id,
    })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => res.json(err))
})

// update a post title
router.put('/:id', (req, res) => {
    Post.update(
        {
            title: req.body.title,
        },
        {
            where: {
                id: req.params.id,
            },
        }
    )
        .then(updatedPost => {
            if (!updatedPost) {
                res.status(404).json({
                    message: "Post not found and couldn't be updated",
                })
                return
            }
            res.json(updatedPost)
        })
        .catch(err => res.status(500).json(err))
})

router.delete('/:id', (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id,
        },
    })
        .then(status => {
            if (!status) {
                res.status(404).json({ message: 'No post found' })
                return
            }
            res.json(status)
        })
        .catch(err => res.status(500).json(err))
})

module.exports = router
