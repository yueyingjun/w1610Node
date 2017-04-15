var http=require("http");
var path=require("path");
var fs=require("fs");
var config=require("./config");
var zlib=require("zlib");

/*

    nodejs

     apache 类似的一种服务器
     单入口文件  mvc

      controller

      modle->view








*    客户端                  服务器
*    1.html                 1.html->修改
*    如何知道我服务器的内容修改了
*
*
*    1.css 修改的时间
*
*
*     http
*      last-modified:10：10
*
*
*
*      动态的服务器
*      读取地址栏里面的查询
 *      php
*      nodejs   mvc
*      c  ->  地址栏
*      v
*      m  ->
* */
var cookies={};

var obj=http.createServer(function(req,res){

    var url=path.parse(req.url);
    if(url.base=="favicon.ico"){
        res.end();
    }else{
        var root=config.root.dir;
        fs.readdir(root,function(error){
            if(error){
                res.writeHead(404,{"content-type":"text/html;charset=utf-8"});
                res.end("跟目录不存在");
                process.exit();
            }
        })

        var fullpath=root+path.resolve(url.dir,url.base);
        var ext=url.ext;
        if(!ext){
            fullpath=path.resolve(fullpath,config.index.index);
        }

        fs.readFile(fullpath,function (error,file) {
           if(error){
               res.writeHead(404,{"content-type":"text/html;charset=utf-8"});
               res.end(fullpath+"这个文件不存在");
           }else{
               var info=fs.statSync(fullpath);
               var mtime=info.mtime.toUTCString();
               console.log(req.headers["if-modified-since"]+"\n"+mtime);
               if((req.headers["if-modified-since"])&&req.headers["if-modified-since"]==mtime){
                   res.writeHead(304,{
                       "content-type":type+";charset=utf-8"});
                   res.end();
               }else {

                   var type = config.type[url.ext];
                   res.setHeader("cache-control", "max-age=" + 1000 * 60);

                   res.setHeader("last-modified", info.mtime.toUTCString());

                   res.writeHead(200, {
                       "content-type": type + ";charset=utf-8"
                   });

                   //console.log(req.headers);
                   res.write(file);
                   res.end();
               }
           }
        })



    }

}).listen(8888);



