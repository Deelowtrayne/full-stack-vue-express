const router = require('express').Router();
const mongodb = require('mongodb');

// Get posts
router.get('/', async (req, res) => {
    const posts = await loadPosts();
    res.send(await posts.find({}).toArray());
});

// Add post
router.post('/', async (req, res) => {
    const posts = await loadPosts();
    await posts.insertOne({
        text: req.body.message,
        createdAt: new Date()
    })
    res.status(201).send('Post added successfully')
})

// Delete post
router.delete('/:id', async (req, res) => {
    const posts = await loadPosts();
    await posts.deleteOne({
        _id: new mongodb.ObjectID(req.params.id)
    });
    res.status(201).send('Post deleted!');
});

async function loadPosts() {
    const client = await mongodb.MongoClient
        .connect('mongodb://coder:coder123@ds125273.mlab.com:25273/vue_expressjs', {
            useNewUrlParser: true
        })
    return client.db('vue_expressjs').collection('posts');
}

module.exports = router;