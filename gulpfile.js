const gulp = require("gulp");
const sass = require("gulp-sass")(require("node-sass"));
const webpackStream = require("webpack-stream");
const webpack2 = require("webpack");
const uglify = require("gulp-uglify");
const zip = require("gulp-zip");
const clean = require("gulp-clean");
const args = require("really-simple-args")();

const OUTPUT_DIR = "dist";

const JS_SRCS = ["src/javascript/*.js", "src/javascript/**/*.js"];
const CSS_SRCS = ["src/sass/*.scss", "src/sass/**/*.scss"];

/**
 * =============================================================================
 * | DEV BUILDS
 * =============================================================================
 */

function buildCSS() {
  return gulp.src(CSS_SRCS)
    .pipe(sass({
      outputStyle: "compressed"
    }))
    .pipe(gulp.dest(`${OUTPUT_DIR}/css/`));
}

function buildJS() {
  return gulp.src(JS_SRCS)
    .pipe(webpackStream(require("./webpack.config.js"), webpack2))
    .pipe(uglify())
    .pipe(gulp.dest(`${OUTPUT_DIR}/js/`));
}

function watch() {
  gulp.watch(CSS_SRCS, buildCSS);
  gulp.watch(JS_SRCS, buildJS);
}

/**
 * =============================================================================
 * | RELEASES
 * =============================================================================
 */

function buildRelease() {
  let version = "";
  if(args.hasParameter("version")) {
    version = args.getParameter("version");
  } else {
    version = require("./package.json").version;
  }

  const releaseName = `simple-switch_v${version}.zip`;

  return gulp.src(["release/*", "release/**/*"])
    .pipe(zip(releaseName))
    .pipe(gulp.dest("releases/"));
}

function prepareRelease() {
  return gulp.src(["dist/*", "dist/**/*"])
    .pipe(gulp.dest("release/"));
}

function prepareReleaseSass() {
  return gulp.src(CSS_SRCS)
    .pipe(gulp.dest("dist/sass/"));
}

function cleanBuildArtifacts() {
  return gulp.src([
    "dist/",
    "release/",
    "releases/"
  ]).pipe(clean());
}

exports.default = gulp.parallel(buildCSS, buildJS);
exports.buildCSS = buildCSS;
exports.buildJS = buildJS;
exports.watch = watch;
exports.buildRelease = gulp.series(
  gulp.parallel(buildCSS, buildJS, prepareReleaseSass),
  prepareRelease,
  buildRelease,
);
exports.clean = cleanBuildArtifacts;
