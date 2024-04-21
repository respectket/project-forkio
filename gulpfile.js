import gulp from "gulp";
import concat from "gulp-concat";
import minify from 'gulp-minify';
import autoprefixer from 'gulp-autoprefixer';
import cleanCSS from 'gulp-clean-css';
import clean from 'gulp-clean';
import browserSync from 'browser-sync';
import imagemin from 'gulp-imagemin';

import rename from 'gulp-rename'
import gulpif from 'gulp-if'
import minifyjs from 'gulp-js-minify'


import dartSass from 'sass';
import gulpSass from 'gulp-sass';

const sass = gulpSass(dartSass);


const html = () => {
    return gulp.src("./src/*.html")
        .pipe(gulp.dest("./dist"));
}

const css = () => {
    return gulp.src("./src/scss/*.scss")
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('scss.css'))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions'],
            cascade: false
        }))

        .pipe(rename("style.min.css"))

        .pipe(gulp.dest("./dist/css"))

        .pipe(browserSync.stream())

}

const js = () => {
    return gulp.src("./src/scripts/**/*.js")
        .pipe(concat('script.js'))
        // .pipe(minify({
        //     ext: {
        //         src: '.js',
        //         min: '.min.js'
        //     },
        // }))
        .pipe(minifyjs())
        .pipe(rename("scripts.min.js"))
        .pipe(gulp.dest("./dist/scripts"))
        .pipe(browserSync.stream())

}

const image = () => {
    return gulp.src("./src/images/**/*.*")
        .pipe(imagemin())
        .pipe(gulp.dest("./dist/images"));
}

const cleanDist = () => {
    return gulp.src('./dist', {read: false})
        .pipe(clean());
}

const server = () => {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });
}

const watcher = () => {
    gulp.watch("./src/*.html", html).on('all', browserSync.reload);
    gulp.watch("./src/scss/**/*.{scss,sass,css}", css).on('all', browserSync.reload);
    gulp.watch("./src/scripts/**/*.js", js).on('all', browserSync.reload);
    gulp.watch("./src/images/**/*.*", image).on('all', browserSync.reload);
}

// TASK ================================
gulp.task("html", html);
gulp.task("style", css);
gulp.task("script", js);
gulp.task("image", image);
gulp.task("browser-sync", server);

gulp.task("dev", gulp.series(
    gulp.parallel(html, css, js, image),
    gulp.parallel(server, watcher)
))

gulp.task("cleanDist", cleanDist);

gulp.task("build", gulp.series(
    cleanDist,
    gulp.parallel(html, css, js, image)
));






