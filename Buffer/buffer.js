#!/usr/bin/env  node

process.stdin.pipe(process.stdout);

if(process.argv[2]=="aaa"){
    console.log("aaa");
}else if(process.argv[2]=="bbb"){
    console.log("bbb");
}else if(process.argv[2]===undefined){
    console.log("default");
}


















