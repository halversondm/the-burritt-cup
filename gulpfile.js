// Assigning modules to local variables
const gulp = require("gulp");
const less = require("gulp-less");
const browserSync = require("browser-sync").create();
const header = require("gulp-header");
const cleanCSS = require("gulp-clean-css");
const rename = require("gulp-rename");
const uglify = require("gulp-uglify");
const rimraf = require("rimraf");
const pkg = require("./package.json");

// Set the banner content
const banner = ["/*!\n",
    " * Start Bootstrap - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n",
    " * Copyright 2013-" + (new Date()).getFullYear(), " <%= pkg.author %>\n",
    " * Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n",
    " */\n",
    ""
].join("");

// copy html files to dist directory
gulp.task("html", () => {
    return gulp.src("src/*.html").pipe(gulp.dest("dist"));
});

// copy html files to dist directory
gulp.task("images", () => {
    return gulp.src("src/img/**/*").pipe(gulp.dest("dist/img"));
});

// Less task to compile the less files and add the banner
gulp.task("less", () => {
    return gulp.src("src/less/clean-blog.less")
        .pipe(less())
        .pipe(header(banner, {pkg: pkg}))
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// Minify CSS
gulp.task("minify-css", ["less"], () => {
    return gulp.src("dist/css/clean-blog.css")
        .pipe(cleanCSS({compatibility: "ie8"}))
        .pipe(rename({suffix: ".min"}))
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// Minify JS
gulp.task("minify-js", () => {
    return gulp.src("src/js/clean-blog.js")
        .pipe(uglify())
        .pipe(header(banner, {pkg: pkg}))
        .pipe(rename({suffix: ".min"}))
        .pipe(gulp.dest("dist/js"))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// Copy Bootstrap core files from node_modules to vendor directory
gulp.task("bootstrap", () => {
    return gulp.src(["node_modules/bootstrap/dist/**/*", "!**/npm.js", "!**/bootstrap-theme.*", "!**/*.map"])
        .pipe(gulp.dest("dist/vendor/bootstrap"))
});

// Copy jQuery core files from node_modules to vendor directory
gulp.task("jquery", () => {
    return gulp.src(["node_modules/jquery/dist/jquery.js", "node_modules/jquery/dist/jquery.min.js"])
        .pipe(gulp.dest("dist/vendor/jquery"))
});

// Copy Font Awesome core files from node_modules to vendor directory
gulp.task("fontawesome", () => {
    return gulp.src([
        "node_modules/font-awesome/**",
        "!node_modules/font-awesome/**/*.map",
        "!node_modules/font-awesome/.npmignore",
        "!node_modules/font-awesome/*.txt",
        "!node_modules/font-awesome/*.md",
        "!node_modules/font-awesome/*.json"
    ])
        .pipe(gulp.dest("dist/vendor/font-awesome"))
});

// Copy Magnific Popup files from node_modules to vendor directory
gulp.task("magnificpopup", () => {
    return gulp.src([
        "node_modules/magnific-popup/dist/**"
    ])
        .pipe(gulp.dest("dist/vendor/magnific-popup"))
});

// Configure the browserSync task
gulp.task("browserSync", ["build"], () => {
    browserSync.init({
        server: {
            baseDir: "./dist/"
        },
    })
});

// Default task
gulp.task("default", ["build"]);

// Copy all third party dependencies from node_modules to vendor directory
gulp.task("copy", ["bootstrap", "jquery", "fontawesome", "magnificpopup"]);

// build process and build testing
gulp.task("build", ["less", "minify-css", "minify-js", "html", "images", "copy"]);

// Watch Task that compiles LESS and watches for HTML or JS changes and reloads with browserSync
gulp.task("dev", ["browserSync"], () => {
    gulp.watch("src/less/*.less", ["less", "minify-css"]);
    gulp.watch("src/js/*.js", ["minify-js"]);
    gulp.watch("src/*.html", ["html"]);
    gulp.watch("src/img/**/*", ["images"]);
    // Reloads the browser whenever HTML or JS files change
    gulp.watch("src/*.html", browserSync.reload);
    gulp.watch("src/js/**/*.js", browserSync.reload);
});