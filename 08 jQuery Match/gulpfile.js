var gulp = require('gulp'),
	browserSync = require('browser-sync'),
	to5 = require('gulp-6to5'),
	g = require('gulp-load-plugins')();;


gulp.task('lint', function(){
	gulp.src('app/src/**/*.js')
		.pipe(g.jshint())
		.pipe(g.jshint.reporter('default'));
});

gulp.task('js', function() {
	gulp.src(['app/src/js/view.js', 'app/src/**/!(app)*.js', 'app/src/js/app.js'])
		.pipe(g.plumber())
		.pipe(g.concat('app.js'))
		.pipe(g.sourcemaps.init())
        .pipe(to5())
		//.pipe(g.uglify())
		.pipe(g.sourcemaps.write('./'))
		.pipe(gulp.dest('app'));
});


gulp.task('css', function() {
	gulp.src('app/src/css/**/*.css')
		.pipe(g.sourcemaps.init())
		.pipe(g.autoprefixer())
		.pipe(g.concat('styles.min.css'))
		.pipe(g.sourcemaps.write())
		.pipe(g.minifyCss({keepBreaks: true}))
		.pipe(gulp.dest('app'));
});

gulp.task('browser-sync', function(){
	browserSync({
		server: {
			baseDir: "./",
			port: 3000
		},
		browser: ["google chrome"]
	});
});

gulp.task('default', ['browser-sync'], function(){
	gulp.watch(['app/src/**/*.js'], [ /*'lint',*/ 'js']);
	gulp.watch(['app/src/**/*.css'], ['css'])
	gulp.watch(['app/src/**/*.js', 'app/src/**/*.css', '*.html'], browserSync.reload);
});