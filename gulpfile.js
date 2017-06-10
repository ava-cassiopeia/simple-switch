const gulp = require("gulp");
const sass = require("gulp-sass");

gulp.task("default", ["build-css"]);

gulp.task("build-css", function() {
    return gulp.src(["src/sass/*.scss", "src/sass/**/*.scss"])
        .pipe(sass())
        .pipe(gulp.dest("dist/css/"));
});

gulp.task("watch", function() {
    gulp.watch(["src/sass/*.scss", "src/sass/**/*.scss"], ["build-css"]);
});
