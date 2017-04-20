class mygulp {

    constructor() {
        this.argv=process.argv[2]?process.argv[2]:"default";
      this.taskInfo={};
        var that=this;

        process.nextTick(function(){
            that.run();
        })


    }

    task(taskname,fn){
        this.taskInfo[taskname]=fn;
    }
    run(){
      this.taskInfo[this.argv]();
    }

}

module.exports=new mygulp();