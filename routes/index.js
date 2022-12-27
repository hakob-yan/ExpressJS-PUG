const Users = require('../models/Users')
const Articles = require('../models/Articles')

exports.home = async (req, res) => {
    const articles = await Articles.find({});
    res.render('index', { articles })
}
exports.article = async (req, res) => {
    const articles = await Articles.findById(req.params.id);
    res.render('index', { articles: [articles] })
}
exports.post = async (req, res) => {
    const articles = await Articles.find({});
    res.render('includes/post', { articles })
}

exports.createPost = async (req, res) => {
    try {

        const article = await Articles.create({
            ...req.body,
            published: true,
            slug: 'default'
        })
        console.log(article);
    }
    catch (e) {
        console.log(e);
    }
    res.redirect('/')

}
exports.admin = async (req, res) => {
    const articles = await Articles.find({});
    res.render('includes/admin', { articles })
}

exports.articlePublish = async (req, res) => {
    const articles = await Articles.findById(req.params.id);
    articles.published= !articles.published
    await articles.save();
    res.redirect('/')
}
exports.articleDelete = async (req, res) => {
    const articles = await Articles.findById(req.params.id).remove();
   
    res.redirect('/')
}


