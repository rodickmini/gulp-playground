var gulp = require('gulp'),
    sass = require('gulp-sass'),
    changed = require('gulp-changed'),
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber')

gulp.task('sass', function() {
    gulp.src('sass/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('css'))
})

function parseSingleFile(file) {
    //sass编译一个scss文件的方法
    return gulp.src(file)
        .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
        .pipe(changed('css'))
        .pipe(sass())
        .pipe(gulp.dest('css'))
}

gulp.task('default', function() {
    gulp.watch("sass/**/*.scss", function(e){
        console.log('\nscss file updated: ' + e.path)
        parseSingleFile(e.path)
    })
})
