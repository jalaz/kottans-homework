var gulp = require('gulp'),
	browserSync = require('browser-sync');

gulp.task('browser-sync', function(){
	browserSync({
		server: {
			baseDir: "./",
			port: 3000
		}
	});
});

gulp.task('default', ['browser-sync'], function(){
	gulp.watch('js/*.js', browserSync.reload);
});