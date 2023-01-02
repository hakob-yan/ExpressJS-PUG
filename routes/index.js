const Users = require('../models/Users')
const Articles = require('../models/Articles')

exports.home = async (req, res) => {
    const articles = await Articles.find({});
    res.render('index', { articles })

}
exports.login = (req, res, next) => {
    if (req.session && req.session.auth) {
        return res.redirect('/')
    }
    else {
        res.render('includes/login')
    }
}


exports.authenticate = async function (req, res, next) {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.render('includes/login', { error: 'Please enter your email and password.' })
    }

    const user = await Users.findOne({ email: username, password })
    if (user) {
        req.session.auth = true
        req.session.user = user
        req.session.admin = user.admin
        res.redirect('/')
    }
    else {
        return res.render('includes/login', { error: 'Please enter valid email or/and password.' })
    }
}


exports.register = async (req, res) => {
    res.render('includes/register')
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
    articles.published = !articles.published
    await articles.save();
    res.redirect('/')
}
exports.articleDelete = async (req, res) => {
    const articles = await Articles.findById(req.params.id).remove();
    res.redirect('/')
}


