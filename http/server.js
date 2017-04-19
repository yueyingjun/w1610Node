var http=require("http");
var fs=require("fs");
var path=require("path");
var ejs=require("./ejs");
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
        this.flag=true;
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
        var attrArr=url.match(/:[^\/]+/g).map(function(a,b){
            return a.substr(1);
        })
        var url=url.replace(/:[^\/]+/g,"([^\/]+)");
        var url="/^"+url.replace(/\//g,"\\/")+"$/"
        this.getArr[url]={};
        this.getArr[url].attr=attrArr;
        this.getArr[url].callback=callback;

    }

    post (url,callback){
        var attrArr=url.match(/:[^\/]+/g).map(function(a,b){
            return a.substr(1);
        })
        var url=url.replace(/:[^\/]+/g,"([^\/]+)");
        var url="/"+url.replace(/\//g,"\\/")+"/"
        this.postArr[url]={};
        this.postArr[url].attr=attrArr;
        this.postArr[url].callback=callback;
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

               this.flag=true;

               var fullpath=path.resolve(url.dir,url.base);
               console.log(fullpath);
               console.log(this.getArr);
               console.log(req.method);

               res.send=function(info){
                   res.write(info);
                   res.end();
               }

               res.sendFile=function(url){

                   fs.createReadStream(url).pipe(res);
               }
               res.render=function(url,data){
                    var str=fs.readFileSync(url,"utf-8");

                   var newstr= ejs.render(str,data);
                   res.write(newstr);
                   res.end();

               }



               if(req.method=="GET"){
                  for(var i in this.getArr){
                     if(eval(i).test(fullpath)){
                         this.flag=false;
                         var result=eval(i).exec(fullpath);
                         for(var j=0;j<this.getArr[i].attr.length;j++){
                            res[this.getArr[i].attr[j]]=result[j+1];

                         }

                         this.getArr[i].callback(req,res);
                         break;
                     }

                  }

                  if(this.flag){
                      this.setError(res,"迷路了")
                  }

               }else if(req.method=="POST"){
                   for(var i in this.postArr){
                       if(eval(i).test(fullpath)){
                           this.flag=false;
                           var result=eval(i).exec(fullpath);
                           for(var j=0;j<this.postArr[i].attr.length;j++){
                               res[this.postArr[i].attr[j]]=result[j+1];

                           }

                           this.postArr[i].callback(req,res);
                           break;
                       }

                   }

                   if(this.flag){
                       this.setError(res,"迷路了")
                   }

               }
           }

       }
    }
}

module.exports=new server();