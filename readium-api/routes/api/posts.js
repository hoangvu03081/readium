const router = require("express").Router();
const { authMiddleware } = require("../../utils/auth");
const Post = require("../../models/Post");

router.post('/posts',authMiddleware, async (req, res) => {
    const post = new Post(req.body)
    try {
        await post.save()
        res.status(201).send(post)
    } catch {
        res.status(400).send({ message: "Some errors occur in create posts" })
    }
})

router.get('/posts', async (req, res) => {

    try {
        const post = await Post.find({})
        res.send(post)
    } catch {
        res.status(500).send({ message: "Some errors occur in finding posts" })
    }
})

router.get('/posts/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const post = await Post.findById(_id)
        if (!post){
            return res.status(404).send({ message: "Cannot find post with ID" })
        }
        res.send(post)
    } catch {
        res.status(500).send({ message: "Error in finding post with ID" })
    }

})

router.delete('/posts/:id', authMiddleware, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post){
            res.status(404).send({ message: "Cannot find post with ID" })
        }

        if (req.user._id==post.author._id){
            await Post.deleteOne({id: req.params.id})
            res.send(post)
        }
        else{
            res.status(404).send({message: "User_id does not match with author"})
        }
    } catch (e) {
        res.status(500).send({ message: "Error in deleting post with ID" })
    }
})

module.exports = router