'use strict'
const progressBar = require('progress')

var pb = {
    printMsg:function(txt){
     if (txt) console.log(txt);
    },
    bar : new progressBar(':bar',{
        total:50,
    }),
    help:{
        "printmsg": "insert the txt",

    },
    init : function() { 
         const timer = setInterval( () => {
            this.bar.tick()
            if (this.bar.complete){
                clearInterval(timer);
            }
        },10)
    }
}
module.exports = pb;

