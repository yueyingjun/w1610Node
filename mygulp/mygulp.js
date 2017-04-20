var fs=require("fs");
var through=require("./through");
var url=require("path");
var shell=require("shelljs");

var  factory=require("./factory");
class mygulp {
    constructor() {
        this.argv=process.argv[2]?process.argv[2]:"default";
        this.taskInfo={};
        var that=this;
        process.nextTick(function(){
            that.run();
        })
    }
    src(path){
        return through.readObj(function(){

                this.push(factory(path).contents);



                this.push(null);
        })
    }
    dest(path){
        return through.obj(function(a,b,c){
            var basename=url.basename(path);
            var extname=url.extname(path);
            var dirname=url.dirname(path);
            var fullname=path;

            var dirname=extname?dirname:fullname;


             try{
               fs.statSync(dirname);
                 for(var i=0;i<a.length;i++){
                     var lastname=extname?basename:a[i].name;
                     console.log(lastname);
                     fs.writeFileSync(url.join(dirname,lastname),a[i].content,"utf8");
                 }


             }catch (e){
               shell.mkdir("-p",dirname);

               for(var i=0;i<a.length;i++){
                   var lastname=extname?basename:a[i].name;
                   console.log(lastname);

                   fs.writeFileSync(url.join(dirname,lastname),a[i].content,"utf8");

               }

             }
            c(null,null);


        })
    }

    task(taskname,fn){
        this.taskInfo[taskname]=fn;
    }
    run(){
        if(this.taskInfo[this.argv]) {
            this.taskInfo[this.argv]();
        }else{
            console.log(this.argv+"命令不存在")
        }
    }

}

module.exports=new mygulp();