 'use strict'

 let msgsJson = require('./msgs.json')
 

 var UsersData = {
    viewData :{
    users: [],
    currentUsers:0,
    },

 createChatUser : async (pID,nickname) => {
    
    UsersData.viewData.users.push(
    {
        processid:pID,
        nickname:nickname
    })

    UsersData.viewData.currentUsers++;
    return (UsersData.viewData);
},

 removeChatUser : async (pID) => {
    let indx = UsersData.viewData.users.findIndex( elm => {
        return elm.pID == pID
    });
    if(indx > -1 ) delete  UsersData.viewData.users[indx];
    UsersData.viewData.currentUsers--;
    return UsersData.viewData;
    }
}

module.exports= UsersData ;