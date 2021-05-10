/**
 *	This illustrates the CORS issue
 * 	1. the first fetch fails because it is trying to get the whole path
 * 	2. the 2nd fetch() succeeds because it is accessing on a local server
 */

fetch('https://sample-node-proxy-server.herokuapp.com/proxy/satellites')
	.then(d => d.text())
	.then(d => console.log(d))
	.catch(err => console.error("fetch #1", err));

fetch('/proxy/satellites')
	.then(d => d.text())
	.then(d => console.log(d))
	.catch(err => console.error("fetch #2", err));
