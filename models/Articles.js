const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const ArticleSchema = new Schema(
    {
        "title": String,
        "slug": String,
        "published": Boolean,
        "text": String
    }
)

const Article = model('article', ArticleSchema)
module.exports = Article 