/**
 *	App file - ties all the modules together
 */

// dependencies
const express = require('express');
const nodeFetch = require('node-fetch');
const path = require('path');
const app = express();
const port = 3000;

// set a whole project directory as public
app.use(express.static('../../')); // this parent directory
// app.use(express.static('../../../learn-javascript/')); // to test another project


app.get('/', (req, res) => {
	res.send("Hello world!");
});


// the endpoints that are allowed
// example: https://localhost:3000/proxy/test
const endpoints = {
	test: {
		url: 'https://owenmundy.com',
		type: 'text'
	},
	catfact: {
		url: 'https://cat-fact.herokuapp.com/facts/random',
		type: 'json'
	},
	satellites: {
		url: 'https://api.n2yo.com/rest/v1/satellite/above/41.702/-76.014/0/90/ANY/&apiKey=XFR4Y5-ULWYWF-H64T3J-4OKO',
		type: 'json'
	}
};


// add route to create a proxy server
app.get('/proxy/:key?', (req, res) => {
	console.log("req.params.key =", req.params.key);
	if (!req.params || req.params == {} || !req.params.key || !endpoints[req.params.key]) return res.send("🙃");

	nodeFetch(endpoints[req.params.key].url)
		.then(apiResponse => {
			// console.log("apiResponse =", apiResponse);
			return apiResponse.text();
		})
		.then(text => {
			// console.log("text =", text);
			if (endpoints[req.params.key].type === "json") {
				// convert the API response string to JSON
				let json = JSON.parse(text);
				// console.log(json);
				// return JSON to endpoint
				res.json(json);
			} else if (endpoints[req.params.key].type === "text") {
				res.send(text);
			} else {
				res.send("no results");
			}
		})
		.catch(err => {
			console.error("ERROR", err);
			res.json({
				"ERROR": err
			});
		});
});


// export app for server, server-http, heroku, etc.
module.exports = [app, port];
