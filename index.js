#!/usr/bin/env node

var fs=require("fs");
var path=require("path");
fs.readdir("./",function(error,data){
    data.forEach(function(file,index){
        if(path.extname(file)==".css"){
            fs.unlinkSync(file);
            console.log("删除成功");
        }
    })
})

/*

  cmd   amd
* require()
* php    环境准备好了   apache  php
* node   代码准备好了->环境(v8引擎)->载入相应的包
*
* require()
 *
 * 1.  载入模块  ./sdjk
 * 2.  目录  .js  .json .node
 *
 * 3.  包  不能有路径
 *    a.  核心包
 *    b.  自定义的包->node_modules
 *    c.  第三方   npm install packagename
 *    d.  如何自己写一个命令行的命令
 *
 *
* */
