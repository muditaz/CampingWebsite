const mongoose = require("mongoose");
mongoose.set('strictQuery', true);

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async (Model) => {
    const cities = require('./cities');
    const { places, descriptors } = require('./seedHelpers');
    await Model.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Model({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'https://source.unsplash.com/collection/483251',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price
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