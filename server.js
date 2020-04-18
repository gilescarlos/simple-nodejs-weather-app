// Express: a minimalist framework for Node.js; makes it easy to create and run a web server with Node
const bodyParser = require('body-parser');	// body-parser middleware allows use of key-value pairs stored on the req-body object
const express = require('express') 			// require express package that was just installed
const request = require('request');
const app = express()						// create instance by invoking Express

const apiKey = 'b8cdb1c5bea71d8035c9f8d055a0f06d'	// key generated from OpenWeatherMap.org API keys

app.use(express.static('public'));			// getting CS file from public directory
app.use(bodyParser.urlencoded({ extended: true})); 
app.set('view engine', 'ejs')				// Using EJS (Embedded Javascript) with a template engine which replaces variables in a template file with actual values in order to respond with an HTML file
											// EJS is accessed by default in views directory
app.get('/', function (req, res) {			// focusing on root URL
	res.render('index')						// visiting the URL will display index.ejs, sends equivalent HTML to the client
})

app.post('/', function (req, res) {			// Post request is similar to get request
	let city = req.body.city;				// Grab the city off of req.body
  	let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`		//url string to access OpenWeatherMap API, note: imperial for fahrenheit

  	request(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, error: 'Error, please try again'});		// visiting the URL will display index.ejs, error statement if city input is invalid
    } else {
      let weather = JSON.parse(body)				
      if(weather.main == undefined){												// check if city input is valid
        res.render('index', {weather: null, error: 'Error, please try again'}); 
      } else {
        let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`; 	// Display weather 
        res.render('index', {weather: weatherText, error: null});
      }
    }
  });
})

app.listen(3000, function () {				// creating a server that is listening on port 3000
	console.log('Example app listening on port 3000!')
})

