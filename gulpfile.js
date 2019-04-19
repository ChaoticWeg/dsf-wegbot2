const gulp = require("gulp");

gulp.task("copy", () => {
    return gulp.src("./src/commands/impl/echo/contents/**/*").pipe(gulp.dest("./lib/commands/impl/echo/contents/"));
});
