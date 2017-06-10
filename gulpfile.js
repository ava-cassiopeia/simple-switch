const gulp = require('gulp-param')(require('gulp'), process.argv);;
const sass = require("gulp-sass");
const zip = require("gulp-zip");
const uglify = require("gulp-uglify");
const clean = require("gulp-clean");
const webpack2 = require("webpack");
const webpackStream = require("webpack-stream");

var path = require("path");

gulp.task("default", ["build-css", "build-js"]);

gulp.task("build-css", function() {
    return gulp.src(["src/sass/*.scss", "src/sass/**/*.scss"])
        .pipe(sass({
            outputStyle: "compressed"
        }))
        .pipe(gulp.dest("dist/css/"));
});

gulp.task("build-js", function() {
    return gulp.src(["src/javascript/*.js", "src/javascript/**/*.js"])
        .pipe(webpackStream(require("./webpack.config.js"), webpack2))
        .pipe(uglify())
        .pipe(gulp.dest("dist/js/"));
});

gulp.task("watch", function() {
    gulp.watch(["src/sass/*.scss", "src/sass/**/*.scss"], ["build-css"]);
    gulp.watch(["src/javascript/*/js", "src/javascript/**/*.js"], ["build-js"]);
});

/**
 * RELEASE TOOLS
 */

gulp.task("build-release", ["prepare-release"], function(version) {
    if(!version) {
        version = "unknown";
    }

    const releaseName = "simple-switch_v" + version + ".zip";

    return gulp.src(["release/*", "release/**/*"])
        .pipe(zip(releaseName))
        .pipe(gulp.dest("releases/"));
});

gulp.task("prepare-release", ["build-css", "build-js", "release-sass"], function() {
    return gulp.src(["dist/*", "dist/**/*"])
        .pipe(gulp.dest("release/"));
});

gulp.task("release-sass", function() {
    return gulp.src(["src/sass/*.scss", "src/sass/**/*.scss"])
        .pipe(gulp.dest("dist/sass/"));
});

gulp.task("clean", function() {
    return gulp.src([
        "dist/",
        "release/",
        "releases/"
    ]).pipe(clean());
});
