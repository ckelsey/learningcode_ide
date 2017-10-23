"use strict"

const gulp = require("gulp")
const fs = require("fs")
const path = require("path")

var rmdir = function (dir) {
	var stats = fs.statSync(dir)

	if (!stats.isDirectory()) {
		return fs.unlinkSync(dir)
	}

	var list = fs.readdirSync(dir);

	for (var i = 0; i < list.length; i++) {
		var filename = path.join(dir, list[i]);
		var stat = fs.statSync(filename);

		if (filename == "." || filename == "..") {
			// pass these files
		} else if (stat.isDirectory()) {
			// rmdir recursively
			rmdir(filename);
		} else {
			// rm fiilename
			fs.unlinkSync(filename);
		}
	}
	fs.rmdirSync(dir);
}

gulp.task("moveFiles", function () {
	try {
		rmdir(path.join(__dirname, 'server'))
	}catch(e){}

	try {
		rmdir(path.join(__dirname, 'static'))
	} catch (e) { }

	try {
		rmdir(path.join(__dirname, 'index.html'))
	} catch (e) { }

	var cssPath = "../client/dist/static/css"
	var cssFiles = fs.readdirSync(cssPath)

	cssFiles.forEach(function (file) {
		var src = path.join(cssPath, file)
		gulp.src(src).pipe(gulp.dest("static/css"))
	})

	var jsPath = "../client/dist/static/js"
	var jsFiles = fs.readdirSync(jsPath)

	jsFiles.forEach(function (file) {
		var src = path.join(jsPath, file)
		gulp.src(src).pipe(gulp.dest("static/js"))
	})

	gulp.src(["../server/**/*"]).pipe(gulp.dest("server"))

	fs.readFile("../client/dist/index.html", "utf8", function (err, data) {
		if (err) { return console.log(err) }

		var result = data.replace(/\/static\//g, "static/")

		fs.writeFile("index.html", result, "utf8", function (err) {
			if (err) {return console.log(err)}
		})
	})
})

gulp.task("default", [
	"moveFiles"
], function () {

	function tryWrite() {
		var exists = fs.statSync("server/app.js")

		if (!exists) {
			setTimeout(function () {
				tryWrite()
			}, 200)
		} else {
			fs.readFile("server/app.js", "utf8", function (err, data) {
				if (err) { return console.log(err) }

				var result = "module.exports = function(){\n" + data + "\n}"

				fs.writeFile("server/app.js", result, "utf8", function (err) {
					if (err) { return console.log(err) }
				})
			})
		}
	}

	setTimeout(function () {
		tryWrite()
	}, 200)
})