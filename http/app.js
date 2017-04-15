var server=require("./server.js");
var fs=require("fs");


server.listen(7777);

server.get("/list/:id/a/:id1",function(req,res){

      var num=res.id1;

      var result="select * from aaa where id="+num;

     res.render("demo.html",{result:result})
})









