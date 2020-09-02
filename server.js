'use strict'

const http = require('http')
const fs = require('fs')
const path = require('path')

const hostname = '127.0.0.1'
const port = 8000

const mime = {
	'js': 'text/javascript',
	'htm': 'text/html',
	'html': 'text/html',
	'css':'text/css',
}

const fallback = url => `
	<h1>file ${url} not found</h1>
`

const server = http.createServer(async (req, res) => {
	console.log(req.url)

	const url = path.join(__dirname, req.url)

	const ext = url.split('.').pop()
	if (ext && mime[ext]) {
		res.setHeader('Content-Type', mime[ext])
	}

	let stats
	try {
		stats = fs.statSync(url)
	} catch (ex) {
		stats = ex
	}

	if (stats instanceof Error || !stats || !stats.isFile()) {
		res.statusCode = 404
		res.end(fallback(req.url))
		return
	}

	const file = fs.createReadStream(url, 'utf8')
	file.pipe(res)

})

server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`)
})

server.on('error', err => {
	if (err.code === 'EACCES') {
		console.log(`No access to port: ${port}`)
	}
})