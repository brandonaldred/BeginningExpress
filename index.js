const express = require('express');
const app = new express();

app.use(express.static('public'));

const ejs = require('ejs');
app.set('view engine', 'ejs');

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blog_database', {useNewUrlParser: true});

const BlogPost = require('./models/BlogPost.js');

app.listen(3000, () => {
    console.log('site running on port 3000');

    app.get('/', async (req,res) => {
        const blogposts = await BlogPost.find({});
        res.render('index', { blogposts });
    });

    app.get('/about', (req,res) => {
        res.render('about');
    });

    app.get('/post/:id', async (req,res) => {
        const blogpost = await BlogPost.findById(req.params.id);
        res.render('post', { blogpost });
    });

    app.get('/contact', (req,res) => {
        res.render('contact');
    });

    app.get('/posts/new', (req,res) => {
        res.render('create');
    });

    app.post('/posts/store', async (req,res) => {
        await BlogPost.create(req.body);
        res.redirect('/');
    });
})