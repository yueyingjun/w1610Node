var through=require("./through");

var obj1=through.read(function(){
    this.push("a");
    this.push("b");
    this.push(null);
})
var obj2=through(function(a,b,c){
    this.push(a.toString().toUpperCase());
    c();
})
var obj3=through(function(a,b,c){
   console.log(a.toString());
    c();
})

obj1.pipe(obj2).pipe(obj3);
