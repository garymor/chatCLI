'use strict'
const users = require('../data/users.js')
const WS = require('./Req_Res_WS')
let msgsJson = require('../data/msgs.json');
const { time } = require('console');

//establish req/res socket handler
let SocketHandl = {};
SocketHandl.rspnd =  WS.Responder();
SocketHandl.rqst = WS.Requester();
SocketHandl.userEstablish = false;
SocketHandl.Cuser = "";



function validate(txt){
    let regxp = new RegExp (/^[A-Z0-9a-z.?<>!@#$%^&*_\-\, ]*$/g)
    return regxp.test(txt)
   }

exports.ChatInit = async function() { 
    const readline = require("readline");
    const readlineI = readline.createInterface({
        input:process.stdin,
        output:process.stdout,  
    })
    
    readlineI.on("line",line => {
        if (validate(line.trim()) && !SocketHandl.userEstablish ) {
            users.createChatUser(process.pid,line.trim()).then( chatInfo => {
                readlineI.setPrompt(`${line.trim()}> `)
                readlineI.prompt();
                SocketHandl.userEstablish = true;
                SocketHandl.Cuser = line.trim();
                SocketHandl.chatInfo = chatInfo;
            });
        } else if ( !validate(line.trim()) &&  !SocketHandl.userEstablish ) {
            console.log(msgsJson.error.nmNotvalid)
        }  else {
            SocketHandl.rqst._request(`${ new Date().toLocaleTimeString()}-${SocketHandl.Cuser}> ${line.trim()}`)
        
        }
    })
}
 

process.on("SIGINT",()=>{
    console.log("....EXITING")
    SocketHandl.rspnd._close()
    process.kill(process.pid)
})