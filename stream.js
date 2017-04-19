var stream=require("stream").Readable;
var read=new stream({});
read._read=function(){
    var num=97;
    for(var i=num;i<"z".charCodeAt(0);i++){
        read.push(String.fromCharCode(i));

    }
    read.push( null);
}


read.pipe(process.stdout);






