// Built in modules
const path = require('path');

// Mongoose Connection
const mongoose = require("mongoose");
mongoose.set('strictQuery', true);
mongoose.connect('mongodb://localhost:27017/camp-data', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("Connected to MongoDB Successfully on Port 27017");
}).catch((err) => {
    console.log('Mongoose Connection Error');
});

// Custom modules
const Campground = require('./models/campground');

// NPM modules
const express = require('express');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', ejsMate);
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));

app.get('/', (req,res) => {
    res.render('home');
});

app.get('/campgrounds', async (req,res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds });
});

app.post('/campgrounds', async (req,res) => {
    const campground = new Campground(req.body.campground);
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
});

app.get('/campgrounds/new', (req,res) => {
    res.render('campgrounds/new');
});

app.get('/campgrounds/:id', async (req,res) => {
    const {id} = req.params;
    const campground = await Campground.findById(id);
    res.render('campgrounds/show', { campground });
});

app.put('/campgrounds/:id', async (req,res) => {
    const {id} = req.params;
    const campground = await Campground.findByIdAndUpdate(id, {...req.body.campground});
    res.redirect(`/campgrounds/${campground._id}`);
});

app.delete('/campgrounds/:id', async (req,res) => {
    const {id} = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect('/campgrounds');
});

app.get('/campgrounds/:id/edit', async (req,res) => {
    const {id} = req.params;
    const campground = await Campground.findById(id);
    res.render('campgrounds/edit', { campground });
});

app.listen(3000, (req,res) => {
    console.log('Server Started Listening Requests on Port 3000');
});