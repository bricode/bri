'use strict';

const gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync'),
    sourcemaps = require('gulp-sourcemaps'),
    reload = browserSync.reload;

gulp.task('sass', function(){
    return gulp.src('src/css/main.scss')//lee el archivo
        .pipe(sourcemaps.init())
        .pipe(sass())//compila sass
        .pipe(autoprefixer({ browsers: ['last 2 versions'], cascade: false}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('.tmp/css'))//guarda en carpeta css
        .pipe(reload({stream : true})); // recarga el navegador
});

gulp.task('sass:prod', function(){
    return gulp.src('src/css/main.scss')//lee el archivo
        .pipe(sass({outputStyle: 'compressed'}))//compila sass
        .pipe(autoprefixer({ browsers: ['last 2 versions'], cascade: false}))
        .pipe(gulp.dest('build/css'));//guarda en carpeta css
});

gulp.task('html:prod', function(){
    return gulp.src('src/*.html')
        .pipe(gulp.dest('build'));
});


gulp.task('build', ['sass:prod', 'html:prod']);

gulp.task('watch', function(){
    gulp.watch(['src/css/main.scss','src/*.html'], ['sass', 'html']);//obsrva cambios en archivo y aplica la tarea 'sass'
});

gulp.task('html', function(){
    return gulp.src('src/*.html')
        .pipe(gulp.dest('.tmp'))
        .pipe(reload({stream : true}));
});

gulp.task('serve', ['sass', 'html'],function(){
    browserSync({
        server: {
            baseDir: ['.tmp','src']
        }
    });
    gulp.start('watch');
});

gulp.task('default', ['serve']); //tarea por defecto
