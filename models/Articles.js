const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const ArticleSchema = new Schema(
    {
        "title": {
            type: String,
            required: true,
            validate: {
                validator: (title) => title !== '',
                message: "Error:missing fields to be created"
            }
        },
        "slug": String,
        "published": Boolean,
        "text": {
            required: true,
            type: String,
            set: (v) => v.toLowerCase()
        }
    }
)

const Article = model('article', ArticleSchema)
module.exports = Article 