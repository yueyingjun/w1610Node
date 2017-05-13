var through=require("./through");

module.exports=function(){
    return through.obj(function(a,b,c){
            var arr=[];
            a.forEach(function(con,index){
                var obj={};
                  obj.content= con.content.toString().toLowerCase();
                  obj.name=con.name;
                arr.push(obj);
            })
        this.push(arr);
        c(null,null);
    })
}