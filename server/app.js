const http = require('http')
const sanitize = require("./sanitize")


/* SET CONTROLLERS */

const controllers = {
	getDir: require("./controllers/dir.js"),
	getFile: require("./controllers/file.js"),
	saveFile: require("./controllers/file.save.js"),
	rename: require("./controllers/rename.js"),
	deleteItem: require("./controllers/delete.js"),
};



var routes = {
	"get": {
		"/api/dir": "getDir",
		"/api/file": "getFile"
	},

	"post": {
		"/api/file": "saveFile",
		"/api/rename": "rename",
		"/api/delete": "deleteItem"
	},

	"put": {
		"/api/file": "saveFile"
	},

	"delete": {}
}



/* SINCE RESTIFY AND EXPRESS WON'T PASS SECOPS, ROLLING OWN */

function parseQuery(url) {
	var query = url.split("?")[1]

	if (query) {
		let _query = query.split("&")
		query = {}

		_query.forEach(function (element) {
			let elements = element.split("=")
			if (elements[0]) {
				query[elements[0]] = elements[1] === undefined ? true : elements[1]
			}
		}, this)

		query = sanitize.object(query)

		return query
	}

	return {}
}

function parseBody(body) {
	// body = body.replace(/</g, "&lt;").replace(/>/g, "&gt;")
	try {
		body = JSON.parse(body)
	} catch (e) {

		if (typeof body === "string") {

			var _body = body.split("&")
			body = {}

			_body.forEach(function (el) {
				el = el.split("=")
				body[el[0]] = el[1]
			})
		} else {
			body = {}
		}
	}

	// return sanitize.object(body)
	return body
}

function handleRequest(res, headers, url, method, body, query, files) {

	controllers[
		routes[method][url]
	](res, headers, body, query, files)

}

var server = http.createServer().listen(1395);

server.on("request", (req, res) => {
	res.setHeader('Access-Control-Allow-Headers', 'authorization, content-type')
	res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
	res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*')
	var url = sanitize.url(req.url)
	var headers = sanitize.object(req.headers)
	var method = sanitize.string(req.method.toLowerCase())
	var query = parseQuery(url)
	let body = ''
	var files = {}
	url = url.split("?")[0]

	req.on('error', (err) => {

		res.statusCode = 500;
		res.write(JSON.stringify({
			success: false,
			message: err
		}));
		res.end();

	}).on('data', (chunk) => {

		body += chunk

	}).on('end', () => {
		body = parseBody(body)

		if (method === "options") {
			res.statusCode = 200
			return res.end()
		}

		handleRequest(res, headers, url, method, body, query, files)
	})
})