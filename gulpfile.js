var del          = require('del');
var gulp         = require('gulp');
var copy         = require('gulp-contrib-copy');
var raster       = require('gulp-raster');
var rename       = require('gulp-rename');
var replace      = require('gulp-replace');

var paths        = require('./manifest.json'); // PROJECT CONFIG FILE
var brands       = paths.brands;

// CLEAN TASK - EMPTIES './build/' DIRECTORY

gulp.task('clean', function () {
	return del('build/**/*');
});

// SVG TASK - INJECTS COLOR VARIABLES FROM 'manifest.json' AND CREATES MULTIPLE VERSIONS OF SOURCE FILE

gulp.task('svg', function() {

	for ( i = 0; i < brands.length; i++ ) {
		var brand = brands[i];
		gulp.src(paths.src.svg)
		.pipe(copy())
		.pipe(replace('$svgfill', brand.svgfill))
		.pipe(replace('$svgline', brand.svgline))
		.pipe(rename({basename: "svg-build"}))
		.pipe(gulp.dest('./build/' + brand.brandname))

	}

});

// PNG TASK - CREATES PNG VERSIONS OF OUPUTTED SVG FILES

gulp.task('png', function() {

	for ( i = 0; i < brands.length; i++ ) {
		var brand = brands[i];
		gulp.src('./build/' + brand.brandname + '/svg-build.svg')
		.pipe(raster())
		.pipe(rename('png-build.png'))
		.pipe(gulp.dest('./build/' + brand.brandname + '/'))
	}

});

// DEFAULT TASK

gulp.task('default', ['svg', 'png']);