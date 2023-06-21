const express  =    require('express');
const app      =    express();
const path     =    require('path');
const hbs      = require('hbs');
const geocode  = require('./utils/geocode');
const forecast = require('./utils/forecast');

const publicDirectoryPath   =   path.join(__dirname, '../public');
const viewsPath =  path.join(__dirname, '../templates/views');
const partialPath =  path.join(__dirname, '../templates/partials');


app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialPath);
app.use(express.static(publicDirectoryPath));



app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Sidney França'
    });
});

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About Me',
        name: 'Sidney França'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Sidney França'
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) => {

            if (error) {
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            });

        });
    })

    // res.send({
    //     forecast: 'It is snowing',
    //     location: 'Philadelphia' ,
    //     address: req.query.address
    // });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Sidney França',
        errorMessage: 'Help article not found'
    });
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Sidney França',
        errorMessage: 'Page not found'
    });
})

app.listen(3000, () =>{
    console.log('Escutando na porta 3000!');
})