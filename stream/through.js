var transform=require("stream").Transform
class throughClass extends transform{
    constructor(param){
        super(param);
    }
}
function through(callback){
     return function(opt,cb){
         if(cb==undefined){
             cb=opt;
         }

        return  callback(opt,cb);
     }
}


module.exports=through(function(opt,cb){
     var obj=new throughClass(opt);
     obj._transform=cb;
     return obj;
})
module.exports.obj=through(function(opt,cb){
    var obj=new throughClass({objectMode:true});
    obj._transform=cb;
    return obj;
})

module.exports.read=through(function(opt,cb){
    var obj=new throughClass(opt);
    obj._read=cb;
    return obj;
})
module.exports.readObj=through(function(opt,cb){
    var obj=new throughClass({objectMode:true});
    obj._read=cb;
    return obj;
})