const gulp = require('gulp');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const del = require('del');
const browserSync = require('browser-sync').create();

const cssFiles = [
    './src/css/main.css',
    './src/css/call_us.css',
    './src/css/footer.css',
    './src/css/how_it_works.css',
    './src/css/our_preferences.css',
    './src/css/recalls.css',
    './src/css/seach_top.css',
    './src/css/specialists.css',
    './src/css/top_banner.css',
    './src/css/header.css',
    './src/css/media.css'
];

function styles() {
    return gulp.src(cssFiles)
        .pipe(concat('style.css'))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cleanCSS({
            level: 2
        }))
        .pipe(gulp.dest('./build/css'))
        .pipe(browserSync.stream());
}
function image(){

}
function clean() {
    return del(['build/css/'])
}
function watch(){
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch('./src/css/**/*.css', styles)
    gulp.watch("./*.html").on('change', browserSync.reload);
}

gulp.task('styles', styles);
gulp.task('del', clean);
gulp.task('watch',watch);
gulp.task('build', gulp.series(clean,styles));
gulp.task('dev', gulp.series('build', 'watch'));