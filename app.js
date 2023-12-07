/**
 *	App file - ties all the modules together
 */

// dependencies
const express = require('express');
const fetch = require('node-fetch');
const path = require('path');
const app = express();

// set a whole project directory as public
app.use(express.static('./public'));

// test routes
app.get('/', (req, res) => {
	res.send("Hello world!");
});
app.get('/api', (req, res) => {
	res.json({"message": "Hello world!"});
});


// endpoints that are allowed
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
	ipapi: {
		url: 'http://ip-api.com/json/',
		type: 'json'
	}
};


// add route to create a proxy server
app.get('/proxy/:key?', (req, res) => {
	console.log("req.params.key =", req.params.key);
	if (!req.params || req.params == {} || !req.params.key || !endpoints[req.params.key]) return res.send("🙃");

	fetch(endpoints[req.params.key].url)
		.then(response => {
			// console.log("response =", response);
			return response.text();
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


// export app
module.exports = app;
