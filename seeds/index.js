const mongoose = require("mongoose");
mongoose.set('strictQuery', true);

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async (Model) => {
    const cities = require('./cities');
    const { places, descriptors } = require('./seedHelpers');
    await Model.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const camp = new Model({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`
        })
        await camp.save();
    }
}

mongoose.connect('mongodb://localhost:27017/camp-data', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("Connected to MongoDB Successfully on Port 27017");
    const Campground = require('../models/campground');
    seedDB(Campground);
}).catch((err) => {
    console.log('Mongoose Connection Error');
});