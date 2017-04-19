var stream=require("stream");
var fs=require("fs");
/*
  100m  a -  b
* 1.  可读流
*
*      a.  在内存里面要开辟一块空间用来存储数据（10m）
*      b.  在什么时候要进行使用流
*          1. 手动去消费流
*          2. data事件去消费流
 *         3. 通过指定目的地区消费流
*
* 2.  可写流
* 3.  双工流
* 4.  转换流
*
 *
 *  所有的数据都是二进制
 *
 *  保存在v8所能调用的内存里面
 *
 *    buffer   定长  存取速度很快  分批去处理这样的信息
 *
 *    图片  文件信息    gulp


     1.  push()
     2.  消费流
     3.  数据写入 可写流  write()
     4.  输出到目的地   _write=function(a,b,c){}
          a代表即将要输出的数据
          b 数据的格式
          c  进行下一次传输
*
*    双工流-》transform流
* */

var transform1=new stream.Transform;
var transform2=new stream.Transform;
var transform3=new stream.Transform;

transform1._read=function(){
    this.push("a");
    this.push("b");
    this.push(null);
}

transform2._transform=function(a,b,c){
      this.push(a.toString().toUpperCase());
      c();

}
transform3._transform=function(a,b,c){
    console.log(a.toString());
    c();
}

transform1.pipe(transform2).pipe(transform3)












