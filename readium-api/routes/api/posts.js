const router = require("express").Router();
const Post = require("../../models/Post");

router.post('/posts', async (req, res) => {
    const post = new Post(req.body)

    try {
        await post.save()
        res.status(201).send(post)
    } catch {
        res.status(400).send({ message: ["Some errors occur in create posts"] })
    }
})

router.get('/posts', async (req, res) => {

    try {
        const post = await Post.find({})
        res.status(201).send(post)
    } catch {
        res.status(500).send({ message: ["Some errors occur in finding posts"] })
    }
})

router.get('/posts/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const post = await Post.findById(_id)
        if (!post){
            return res.status(404).send({ message: ["Cannot find post with ID"] })
        }
        res.status(201).send(post)
    } catch {
        res.status(500).send({ message: ["Error in finding post with ID"] })
    }

})

router.delete('/posts/:id', async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id)

        if (!post){
            res.status(404).send({ message: ["Cannot find post with ID"] })
        }

        res.send(post)
    } catch (e) {
        res.status(500).send({ message: ["Error in deleting post with ID"] })
    }
})

module.exports = router