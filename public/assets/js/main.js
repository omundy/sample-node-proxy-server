/**
 *	CORS note: If you run this frontend JS ...
 * 	- on Heroku => both fetch() calls will succeed - neither will be a cross-origin request
 * 	- on localhost => only #2 will succeed - #1 will be a different origin than localhost
 */

// #1
fetch('https://sample-node-proxy-server.herokuapp.com/proxy/satellites')
	.then(d => d.text())
	.then(d => console.log(d))
	.catch(err => console.error("fetch #1", err));

// #2
fetch('/proxy/satellites')
	.then(d => d.text())
	.then(d => console.log(d))
	.catch(err => console.error("fetch #2", err));
