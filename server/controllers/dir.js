const config = require("../config/config")
const fs = require("fs")
const path = require("path")
const utils = require("../utils")

module.exports = function (res, headers, body, query, files) {
	var url = config.cwd

	console.log(query);

	if (query.path) {
		url = path.join(url, query.path)
	}

	fs.readdir(url, (err, files) => {
		console.log(err, files)

		if (err) {
			return utils.resolve(res, { status: 500, result: err })
		}

		var result = {}
		var count = 0

		files.map(file => {
			result[file] = null

			fs.stat(path.join(url, file), function (err, data) {
				if (err) {
					return utils.resolve(res, { status: 500, result: err })
				}

				result[file] = {
					size: data.size,
					ext: path.extname(file).split(".")[1]
				}
				count++

				if (count === files.length) {
					return utils.resolve(res, { status: 200, result })
				}
			})
		});
	})
}