import gulp from "gulp";
import less from "gulp-less";

const { task, src, dest, watch, series } = gulp;

gulp.task("less", function () {
  return gulp
    .src("./src/**/*.less") // Chemin vers tes fichiers LESS
    .pipe(less())
    .pipe(dest("dist/css")); // Dossier de sortie pour les fichiers CSS compilés
});

gulp.task("watch", function () {
  gulp.watch("./src/**/*.less", gulp.series("less"));
  // Observer les changements de fichier
});

gulp.task("default", gulp.series("less", "watch"));
