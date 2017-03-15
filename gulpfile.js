var gulp = require('gulp'),

		concatCss = require('gulp-concat-css'),
		minifyCss = require('gulp-clean-css'),
		autoprefixer = require('gulp-autoprefixer'),
		uncss = require('gulp-uncss'),

		rename = require('gulp-rename'),


		notify = require("gulp-notify"),

		imagemin = require('gulp-imagemin'),


		replace = require('gulp-replace'),

		useref = require('gulp-useref'),
		uglify = require('gulp-uglify'),
		gulpif = require('gulp-if'),
		clean = require('gulp-clean');


// Path
var path = {
  app : {          // APP
    html   : 'app/*.html', // app/index.html
    css    : 'app/css/*.css', //style.css
    js     : 'app/js/**/*.js',
    images : 'app/images/**/*.*',
    fonts  : 'app/fonts/**/*'
  },
  dist : {         // Release
    html   : 'dist/',
    css    : 'dist/css/', //main.css vendor.css
    js     : 'dist/js/', //main.js vendor.js
    images : 'dist/images/',
    fonts  : 'dist/fonts/'
  },
  watch : {        // Watching
    html   : 'app/**/*.html',
    js     : 'app/js/**/*.js',
    css    : 'app/css/style.css',
    bower  : 'bower.json'
  }
};



// autoprefixer css
gulp.task('css', function () {
	return gulp.src(path.watch.css)
		.pipe(autoprefixer({
						browsers: ['last 2 versions', '> 1%','ie 9'],
						cascade: false
				}))
		//.pipe(rename("bundle.min.css"))
		.pipe(gulp.dest('app/css'))
		.pipe(notify("Done !"));
});


//Copy fonts
gulp.task('copy_fonts',function(){
	return gulp.src([
		'./app/fonts/**/*'
		]) 
	.pipe(gulp.dest('./dist/fonts/'));
});

//Copy images
gulp.task('copy_images', function() {
	return gulp.src(path.app.images)
		.pipe(gulp.dest(path.dist.images));
});

//Optimize Images
gulp.task('image_min', function(){
    gulp.src(path.app.images)
        .pipe(imagemin())
        .pipe(gulp.dest(path.dist.images))
});


//Clean directory
gulp.task('clean_directory', function () {
		return gulp.src('dist', {read: false})
				.pipe(clean());
});

//Build project
gulp.task('build',['clean_directory'], function () {
		return gulp.src('app/*.html')
				.pipe(useref())
				.pipe(gulpif('*.js', uglify()))
				.pipe(gulpif('*.css', minifyCss()))
				.pipe(gulp.dest('dist'))
				.pipe(notify("Build Done !"));
});
//<!-- build:css css/combined.css -->
//<!-- endbuild -->
//<!-- build:js scripts/combined.js -->
//<!-- endbuild -->


