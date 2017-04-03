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


//css
gulp.task('css', function () {
	return gulp.src(path.watch.css)
		//.pipe(sourcemaps.init())
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))//expended
		.pipe(gcmq())
		.pipe(autoprefixer({
						browsers: ['last 2 versions', '> 1%','ie 9','ie 7','ie 8'],
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
gulp.task('default', ['connect', 'html', 'css', 'js', 'watch']);








//Copy images
gulp.task('copy_images', function() {
	return gulp.src(path.app.images)
		.pipe(gulp.dest(path.dist.images));
});

//Create sprites
gulp.task('sprite', function () {
	var spriteData = gulp.src('app/images/contact-*.png').pipe(spritesmith({
		imgName: 'sprite-contact.png',//png || jpg
		cssName: 'sprite-contact.scss',
		padding: 5,
		algorithm: 'top-down'// top-down || left-right || diagonal
	}));
	return spriteData.pipe(gulp.dest('sprites/'));
});

//Optimize Images
gulp.task('image_min', function(){
		gulp.src(path.app.images)
				.pipe(imagemin())
				.pipe(gulp.dest(path.dist.images))
});

//Copy fonts
gulp.task('copy_fonts',function(){
	return gulp.src([
		//'./app/bower_components/bootstrap-sass/assets/fonts/bootstrap/*',
		//'./app/bower_components/font-awesome-sass/assets/fonts/font-awesome/*',
		'./app/fonts/acromExb/*',
		'./app/fonts/acromL/*',
		'./app/bower_components/components-font-awesome/fonts/*'])
	.pipe(gulp.dest('./dist/fonts/'));
});

//Replace path for files
gulp.task('replace_path', function(){
	//gulp.src(['dist/css/main.css','dist/css/vendor.css'])
		gulp.src(['dist/css/main.css'])
	//.pipe(replace(/\.\.\/bower_components\/*[-0-9a-zA-Z.]*\/*[-0-9a-z._]*\/font\w*\/*[-0-9a-z._]*/g, '../fonts'))
	//.pipe(replace(/\/fonts\/*[-0-9a-zA-Z.]*\//g, '../fonts/'))
	//.pipe(replace(/\.\.\.\.\/fonts/g, '../fonts'))
		.pipe(replace(/bower_components\/*[-0-9a-zA-Z.]*\/*[-0-9a-z._]*\/font\w*\/*[-0-9a-z._]*/g, 'fonts'))
		.pipe(replace(/\/fonts\/*[-0-9a-zA-Z.]*\//g, '../fonts/'))
		.pipe(gulp.dest('./dist/css/'));
});

//Clean directory
gulp.task('clean_directory', function () {
		return gulp.src('dist', {read: false})
				.pipe(clean());
});

//Combine || Compressed - CSS || JS in project
gulp.task('combine-compressed',['clean_directory'], function () {
		return gulp.src('app/*.html')
				.pipe(useref())
				.pipe(gulpif('*.js', uglify()))
				.pipe(gulpif('*.css', minifyCss()))
				.pipe(gulp.dest('dist'))
				//.pipe(notify("Build Done !"));
});
//<!-- build:css css/combined.css -->
//<!-- endbuild -->
//<!-- build:js scripts/combined.js -->
//<!-- endbuild -->

/********************************************************************************/
// Actually now for 'full build' you need run this tasks :
// 1 - gulp combine-compressed
// 2 - gulp image_min
// 3 - gulp copy_fonts
// 4 - gulp replace_path
/********************************************************************************/
