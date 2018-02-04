// Assigning modules to local variables
var gulp = require("gulp");
var less = require("gulp-less");
var browserSync = require("browser-sync").create();
var header = require("gulp-header");
var cleanCSS = require("gulp-clean-css");
var rename = require("gulp-rename");
var uglify = require("gulp-uglify");
var pkg = require("./package.json");

// Set the banner content
var banner = ["/*!\n",
    " * Start Bootstrap - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n",
    " * Copyright 2013-" + (new Date()).getFullYear(), " <%= pkg.author %>\n",
    " * Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n",
    " */\n",
    ""
].join("");

// Default task
// Default task
gulp.task("default", ["less", "minify-css", "minify-js", "copy"]);

// Less task to compile the less files and add the banner
gulp.task("less", function () {
    return gulp.src("src/less/clean-blog.less")
        .pipe(less())
        .pipe(header(banner, {pkg: pkg}))
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// Minify CSS
gulp.task("minify-css", function () {
    return gulp.src("src/css/clean-blog.css")
        .pipe(cleanCSS({compatibility: "ie8"}))
        .pipe(rename({suffix: ".min"}))
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// Minify JS
gulp.task("minify-js", function () {
    return gulp.src("src/js/clean-blog.js")
        .pipe(uglify())
        .pipe(header(banner, {pkg: pkg}))
        .pipe(rename({suffix: ".min"}))
        .pipe(gulp.dest("src/js"))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// Copy Bootstrap core files from node_modules to vendor directory
gulp.task("bootstrap", function () {
    return gulp.src(["node_modules/bootstrap/dist/**/*", "!**/npm.js", "!**/bootstrap-theme.*", "!**/*.map"])
        .pipe(gulp.dest("src/vendor/bootstrap"))
});

// Copy jQuery core files from node_modules to vendor directory
gulp.task("jquery", function () {
    return gulp.src(["node_modules/jquery/dist/jquery.js", "node_modules/jquery/dist/jquery.min.js"])
        .pipe(gulp.dest("src/vendor/jquery"))
});

// Copy Font Awesome core files from node_modules to vendor directory
gulp.task("fontawesome", function () {
    return gulp.src([
        "node_modules/font-awesome/**",
        "!node_modules/font-awesome/**/*.map",
        "!node_modules/font-awesome/.npmignore",
        "!node_modules/font-awesome/*.txt",
        "!node_modules/font-awesome/*.md",
        "!node_modules/font-awesome/*.json"
    ])
        .pipe(gulp.dest("src/vendor/font-awesome"))
});

// Copy Magnific Popup files from node_modules to vendor directory
gulp.task("magnificpopup", function () {
    return gulp.src([
        "node_modules/magnific-popup/dist/**"
    ])
        .pipe(gulp.dest("src/vendor/magnific-popup"))
});

// Copy all third party dependencies from node_modules to vendor directory
gulp.task("copy", ["bootstrap", "jquery", "fontawesome", "magnificpopup"]);

// Configure the browserSync task
gulp.task("browserSync", function () {
    browserSync.init({
        server: {
            baseDir: "./src/"
        },
    })
});

// build process and build testing

gulp.task("create-dist", function () {
    gulp.src(["src/css/clean-blog.min.css"]).pipe(gulp.dest("dist/css/"));
    gulp.src(["src/img/**"]).pipe(gulp.dest("dist/img"));
    gulp.src(["src/js/clean-blog.min.js"]).pipe(gulp.dest("dist/js"));
    gulp.src(["src/vendor/**"]).pipe(gulp.dest("dist/vendor"));
    return gulp.src(["src/*.html"]).pipe(gulp.dest("dist"));
});

gulp.task("run-dist", function () {
    browserSync.init({
        server: {
            baseDir: "./dist/"
        },
    })
});

// Watch Task that compiles LESS and watches for HTML or JS changes and reloads with browserSync
gulp.task("dev", ["browserSync", "copy", "less", "minify-css", "minify-js"], function () {
    gulp.watch("src/less/*.less", ["less"]);
    gulp.watch("src/css/*.css", ["minify-css"]);
    gulp.watch("src/js/*.js", ["minify-js"]);
    // Reloads the browser whenever HTML or JS files change
    gulp.watch("src/*.html", browserSync.reload);
    gulp.watch("src/js/**/*.js", browserSync.reload);
});