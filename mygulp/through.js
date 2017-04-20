var transform=require("stream").Transform;

class throughClass extends transform{
   constructor (param){
       super(param)
   }
}

function through(callback){
   return function(opt,ck){
       if(ck===undefined){
           ck=opt;
           opt={};
       }
      return callback(opt,ck);
   }
}



module.exports=through(function(opt,ck){
   var obj=new throughClass(opt);
   obj._transform=ck;
   return obj;
})

module.exports.obj=through(function(opt,ck){
    var obj=new throughClass({objectMode:true});
    obj._transform=ck;
    return obj;
})

module.exports.read=through(function(opt,ck){
    var obj=new throughClass(opt);
    obj._read=ck;
    return obj;
})

module.exports.readObj=through(function(opt,ck){
    var obj=new throughClass({objectMode:true});
    obj._read=ck;
    return obj;
})


