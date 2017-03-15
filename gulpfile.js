var gulp = require('gulp'),

		sass = require('gulp-sass'),
		sourcemaps = require('gulp-sourcemaps'),
		gcmq = require('gulp-group-css-media-queries'),

		minifyCss = require('gulp-clean-css'),
		autoprefixer = require('gulp-autoprefixer'),
		uncss = require('gulp-uncss'),

		rename = require('gulp-rename'),
		wiredep = require('wiredep').stream;

		notify = require("gulp-notify"),
		livereload = require('gulp-livereload'),
		connect = require('gulp-connect'),


		spritesmith = require('gulp.spritesmith'),
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
    css    : 'sass/**/*.scss',
    bower  : 'bower.json'
  }
};


//server connect
gulp.task('connect', function() {
	connect.server({
		root: 'app',
		livereload: true
	});
});

//Reload html
gulp.task('html',function(){
	gulp.src(path.app.html)
	.pipe(connect.reload());
})

//Reload js
gulp.task('js',function(){
	gulp.src(path.app.js)
	.pipe(connect.reload());
})


//Reload + compiled css
gulp.task('css', function () {
	return gulp.src(path.watch.css)
		//.pipe(sourcemaps.init())
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))//expended
		.pipe(gcmq())
		.pipe(autoprefixer({
						browsers: ['last 2 versions', '> 1%','ie 9'],
						cascade: false
				}))
		//.pipe(rename("bundle.min.css"))
		//.pipe(sourcemaps.write())
		.pipe(gulp.dest('app/css'))
		.pipe(connect.reload())
		.pipe(notify("Done !"));
});

// Uncss
gulp.task('uncss', function () {
	return gulp.src(path.app.css)
			.pipe(uncss({
					html: [path.app.html]
			}))
			.pipe(gulp.dest('app/css'));
});

// add connect library
gulp.task('bower', function () {
	gulp.src('app/index.html')
		.pipe(wiredep({
			directory : "app/bower_components/"
		}))
		.pipe(gulp.dest('app/'));// rewright it self
});

//gulp.task('watch', function () {
//	gulp.watch('bower.json', ['bower']);
//})

//<!-- bower:css -->
//<!-- endbower -->

//<!-- bower:js -->
//<!-- endbower -->


//watch
gulp.task('watch', function () {
	gulp.watch(path.watch.html,['html'])
	gulp.watch(path.watch.css, ['css'])
	gulp.watch(path.watch.js,  ['js'])
	gulp.watch(path.watch.bower, ['bower']);
});



//default
gulp.task('default', ['connect', 'html', 'css', 'js', 'bower','watch']);






//Create sprites
gulp.task('sprite', function () {
	var spriteData = gulp.src('app/images/pay*.jpg').pipe(spritesmith({
		imgName: 'sprite-pay.png',//png || jpg
		cssName: 'sprite-pay.scss',
		padding: 5,
		algorithm: 'left-right'
	}));
	return spriteData.pipe(gulp.dest('app/sprites/'));
});

//Copy fonts
gulp.task('copy_fonts',function(){
	return gulp.src([
		'./app/bower_components/bootstrap-sass/assets/fonts/bootstrap/*'
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

//Replace path for files > fonts in bower_components || src for sprite images
gulp.task('replace_path', function(){
	gulp.src(['dist/css/main.css'])
		.pipe(replace(/\.\.\/bower_components\/*[-0-9a-zA-Z.]*\/*[-0-9a-z._]*\/font\w*\/*[-0-9a-z._]*/g, '/fonts'))
		.pipe(replace(/\.\.\/sprites\//g, '/images/sprites/'))
		.pipe(gulp.dest('dist/css/'));
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