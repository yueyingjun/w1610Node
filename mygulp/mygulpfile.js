var mygulp=require("./mygulp");
var small=require("./small");



mygulp.task("aaa",function(){

  mygulp.src("a/b/c/*.js").pipe(mygulp.dest("c/"))
})

mygulp.task("bbb",function(){
    console.log("bbbb");
})

mygulp.task("ccc",function(){
    console.log("ccc");
})


mygulp.task("ddd",function(){
    console.log("dddd");
})



