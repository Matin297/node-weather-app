const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoCoding = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');

const app = express();

const port = process.env.PORT || 3000;

//set paths for express config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../temps/views');
const partialsPath = path.join(__dirname, '../temps/partials');

//tell express where is our static assets to be served
app.use(express.static(publicDirPath));
hbs.registerPartials(partialsPath);

//setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Asma'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Asma'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Asma',
        helpMess: 'This is some help message.'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address)
        return res.send({
            error: 'You should provide an adress first!'
        })

    //use the address and get te long and lat
    geoCoding(req.query.address, (error, {
        longitude,
        latitude,
        location
    } = {}) => {
        if (error)
            return res.send({
                error
            })
        forecast(longitude, latitude, (error, forcastData) => {
            if (error)
                return res.send({
                    error
                })
            res.send({
                address: req.query.address,
                location: location,
                forecast: forcastData
            })
        })
    })

})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 NOT FOUND',
        errorMess: 'This help article does not exists!',
        name: 'Asma'
    });
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 NOT FOUND',
        errorMess: 'This page does not exists!',
        name: 'Asma'
    });
})

const server = app.listen(port, () => {
    console.log('server is up on port ' + server.address().port);
})