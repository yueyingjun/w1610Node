var server=require("./server.js");
var fs=require("fs");
server.listen(7777);

server.get("/a/b/c",function(req,res){
   res.sendFile("demo.html");
})
server.get("/a/b/c/d",function(req,res){
   res.end("get2");
})
server.post("/a/b/c",function(req,res){
   res.end("post1");
})
server.post("/a/b/c/d",function(req,res){
    res.end("post2");
})







