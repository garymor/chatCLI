'use strict'

 let ws = {
    Responder: () => {
        const WebSocket = require('ws');
        const wss = new WebSocket.Server({ port: 9898 });
        
        wss.on('connection', function connection(ws) {
          ws.on('message', function incoming(data) {
            wss.clients.forEach(function each(client) {
                client.send(data)
            });
          });
        });

        wss.on('error', (err) => {
            console.log('a chat server is runing .. joining- choose ur nick');
    });


          return ({
            type:"Responder",
            Responder:wss,
            _close:() => {
                wss.close();
                console.log('user has disconnected');
            }
        });
    },
    
   

    Requester: () => {
        const WebSocket = require('ws');
        const client = new WebSocket('tcp://localhost:9898', {
        perMessageDeflate: false
        });
        client.on('message', (data) => {
        console.log(`${data.toString()}`);
        });
        client.on('close', () => {
        console.log('CLIENT: I disconnected from the server.');
        });
        return ({
            type:"Requester",
            Requester:client,
            _close:() => {
                Requester.end() 
                console.log('requster exit ')
            },
            _request:  (txt)=>{      
                client.send(txt)
            }
        });
    }    
}

module.exports = ws ;


