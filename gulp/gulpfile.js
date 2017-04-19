/*
*   前端自动化的工具
*   前端流构建工具
*   gulp
* */
var gulp=require("gulp");
var uglify=require("gulp-uglify");
var css=require("gulp-uglifycss");
var less=require("gulp-less");
var connect=require("gulp-connect");
var concat=require("gulp-concat");

gulp.task('connect', function() {
    connect.server({
        root: './',
        host:"localhost",
        port: 8888,
        livereload: true
    });
});

gulp.task("concat",function(){
    gulp.src(["src/js/1.js","src/js/2.js"]).pipe(concat("min.js")).pipe(uglify()).pipe(gulp.dest("dest/js"))
})

gulp.task("uglify",function(){
    gulp.src("src/js/*.js").pipe(uglify()).pipe(gulp.dest("dest/js")).pipe(connect.reload());
})
gulp.task("less",function(){
    gulp.src("src/less/*.less").pipe(less()).pipe(css()).pipe(gulp.dest("dest/css")).pipe(connect.reload());
})
gulp.task("html",function(){
    gulp.src("./*.html").pipe(connect.reload());
})




gulp.task("watch",function(){
    gulp.watch("src/js/*.js",["uglify"]);
    gulp.watch("src/less/*.less",["less"]);
    gulp.watch("./*.html",["html"]);
})

gulp.task("default",["watch","connect"])