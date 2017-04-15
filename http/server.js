var http=require("http");
var fs=require("fs");
var path=require("path");

class server{
    constructor(){
        this.getArr={};
        this.postArr={};
        this.staticInfo=".jpg|.png|.gif|.css|.js";
        this.staticUrl="static";
        this.type={

            ".jpg": "image/jpeg",
            ".png": "image/png",
            ".html": "text/html",
            ".css": "text/css",
            ".js": "application/x-javascript"
        }
    }

    setHead(res,type){
        res.setHeader("content-type",type+";charset=utf-8");
    }

    setError(res,info){
        res.writeHead(404,{"content-type":"text/html;charset=utf-8"});
        res.end(info);
    }
    setStatic (dir){
        this.staticUrl=dir;
    }

    get (url,callback){
       this.getArr[url]=callback;
    }
    post (url,callback){
        this.postArr[url]=callback;
    }
    listen(porl){
            this.create(porl);
    }
    create (porl){
        var that=this;
        http.createServer(function(req,res){
            that.do(req,res);

        }).listen(porl);
    }

    do(req,res){
       var url=path.parse(req.url);
       if(url.base=="favicon.ico"){
           res.end();
       }else {
           var ext=url.ext;
           if(this.staticInfo.indexOf(ext)>-1&&ext!==""){
              var fullStaticUrl=path.join(this.staticUrl,url.dir,url.base);
                this.setHead(res,this.type[ext])
              fs.createReadStream(fullStaticUrl).pipe(res);

           }else{

               var fullpath=path.resolve(url.dir,url.base);
               console.log(fullpath);
               console.log(this.getArr);
               console.log(req.method);
               if(req.method=="GET"){

                   res.send=function(info){
                       res.write(info);
                       res.end();
                   }
                   res.sendFile=function(url){
                       fs.createReadStream(url).pipe(res);
                   }
                   if(this.getArr[fullpath]){
                       this.getArr[fullpath](req,res)
                   }else{
                       this.setError(res,"迷路了")
                   }

               }else if(req.method=="POST"){
                   if(this.postArr[fullpath]){
                       this.postArr[fullpath](req,res)
                   }else{
                       this.setError(res,"迷路了")
                   }
               }
           }

       }
    }
}

module.exports=new server();