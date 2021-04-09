'use strict'
let msgsJson = require('../data/msgs.json')
//on first connect
const users = require('../data/users.js')


function validate(txt){
    let regxp = new RegExp (/^[A-Z0-9a-z.?<>!@#$%^&*_\-\, ]*$/g)
    return regxp.test(txt)
   }

exports.nickName = async function() { 
    const readline = require("readline");
    const readlineI = readline.createInterface({
        input:process.stdin,
        output:process.stdout,
        
    })
    

    readlineI.on("line",line => {
        if (validate(line.trim())) {
            users.createChatUser(process.pid,line.trim()).then( value => {
                console.log(value)
                readlineI.setPrompt(`${line.trim()}> `)
                readlineI.prompt();
            });
        } else  console.log(msgsJson.error.nmNotvalid);
    })

}
 

