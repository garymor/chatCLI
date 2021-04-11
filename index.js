'use strict';

const pb = require('./lib/progress-bar');
const chatUsersData = require('./lib/chat-api.js');


let msgsJson = require('./data/msgs.json')


pb.init()
console.log(msgsJson.general.welcome)
chatUsersData.ChatInit()

 
process.on("SIGINT",()=>{
    console.log("....EXITING")
    process.kill(process.pid)
})