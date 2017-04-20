var url=require("path");
var shell=require("shelljs");
var fs=require("fs");
class factoryClass{
    constructor(path){
        this.contents=[];
        this.path=path;
        this.getCon();
    }
    getCon(){
        var extname=url.extname(this.path);
        var dirname=url.dirname(this.path);
        var fullname=this.path;

           var arr= shell.find("-p",fullname).filter(function(file){
               return file
            });


           var that=this;
           arr.forEach(function(val,index){

                var obj={};
                obj.content=fs.readFileSync(val);
                obj.name=url.basename(val);
                that.contents.push(obj);
           })


    }
}
module.exports=function(path){
   return new factoryClass(path);
}