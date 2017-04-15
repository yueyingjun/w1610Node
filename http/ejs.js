function compile(str){
    var tpl = str.replace(/\n/g, '').replace(/'/g,'"').replace(/<%=([\s\S]+?)%>/g, function (a, b) {
        return "'+" + b + "+'";
    }).replace(/<%([\s\S]+?)%>/g, function (a, b) {
        return "'\n" + b + "tpl+='";
    })

    tpl = "with(obj){\nvar tpl='" + tpl + "';\n return tpl}";

    return new Function("obj", tpl);
}



module.exports.render=function(str,data){
   return  compile(str)(data);
};



