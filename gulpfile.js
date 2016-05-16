var gulp = require('gulp');
var minify = require('gulp-minify');
var open = require('gulp-open');


gulp.task('default', function() {
    gulp.src('src/puk-start.js')
        .pipe(minify({
            ext:{
                min:'.min.js'
            },
            exclude: ['tasks'],
            ignoreFiles: ['.min.js']
        }))
        .pipe(gulp.dest('src'));

    gulp.src('example/index.html')
        .pipe(open());
});

