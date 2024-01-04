import gulp from "gulp";
import less from "gulp-less";

const { dest } = gulp;

gulp.task("less", () =>
  gulp.src("./src/**/*.less").pipe(less()).pipe(dest("dist/css"))
);

gulp.task("watch", () => {
  gulp.watch("./src/**/*.less", gulp.series("less"));
});

gulp.task("default", gulp.series("less", "watch"));
