const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

hbs.registerPartials(path.join(__dirname + '/views/partials'));

// Add the route handlers here:


// Home route
app.get('/', (req, res) => {
  res.render('index.hbs');
});


// Beers route
app.get("/beers", (req, res) => {

  punkAPI.getBeers()
  .then(beersFromAPI => {

    console.log(beersFromAPI);

    res.render("beers.hbs", {
      beersList: beersFromAPI
    })

  })
  .catch(error => console.log(error))
})


// Random beer route
app.get("/random-beer", (req, res) => {

  punkAPI.getRandom()
  .then(randomBeer => {

    res.render("random-beer.hbs", {
      beerItems: randomBeer[0]  // randomBeer array will always have only one object inside
    })
  })
  .catch(error => console.log(error))
})


// Bonus 6: Clickable image route (bonus doesn't indicate which info to list in the handlebars)
app.get("/beers/:beer", (req, res) => {

  const {beer} = req.params;
 
  punkAPI.getBeer(beer)
  .then(response => {

    res.render("particular-beer.hbs", {
      propertiesList: response[0]
    })
  })
  .catch(error => console.log(error))

})


// Client actions listening on port 3000
app.listen(3000, () => console.log('🏃‍ on port 3000'));
