const gulp = require("gulp");
const sass = require("gulp-sass")(require("node-sass"));
const webpackStream = require("webpack-stream");
const zip = require("gulp-zip");
const clean = require("gulp-clean");
const ts = require("gulp-typescript");
const args = require("really-simple-args")();

const OUTPUT_DIR = "dist";

const JS_SRCS = ["src/javascript/*.js", "src/javascript/**/*.js"];
const TS_SRCS = ["src/typescript/*.ts", "src/typescript/**/*.ts"];
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

function buildReleaseJS() {
  return gulp.src(TS_SRCS)
    .pipe(webpackStream({
      mode: "production",
      entry: {
        SimpleSwitch: "./src/typescript/index.ts",
      },
      module: {
        rules: [
          {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
          },
        ],
      },
      resolve: {
        extensions: ['.ts', '.js'],
      },
      output: {
        filename: '[name].min.js',
        library: 'SimpleSwitch',
      },
    }))
    .pipe(gulp.dest(`${OUTPUT_DIR}/js/`));
}

function buildJS() {
  return gulp.src(TS_SRCS)
    .pipe(ts({
      target: "es6",
      module: "nodenext",
      moduleResolution: "nodenext",
      declaration: true, // generate .d.ts files
    }))
    .pipe(gulp.dest(`${OUTPUT_DIR}/commonjs/`));
}

function watch() {
  gulp.watch(CSS_SRCS, buildCSS);
  gulp.watch(JS_SRCS, buildJS, buildReleaseJS);
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

exports.default = gulp.parallel(buildCSS, buildJS, buildReleaseJS);
exports.buildCSS = buildCSS;
exports.buildJS = buildJS;
exports.watch = watch;
exports.buildRelease = gulp.series(
  gulp.parallel(buildCSS, buildJS, buildReleaseJS, prepareReleaseSass),
  prepareRelease,
  buildRelease,
);
exports.clean = cleanBuildArtifacts;
