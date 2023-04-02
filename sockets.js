const http = require('http');

const WebSocketServer = require('websocket').server;

let connections = [];

const httpServer = http.createServer();

const webSocket = new WebSocketServer({"httpServer": httpServer});

httpServer.listen(8080, () => console.log("My server is listening on port 8080"));

webSocket.on("request",request => {
    const connection = request.accept(null,request.origin);

    connection.on("message", message =>{
        connections.forEach(con => {
            if(connection.socket.remotePort !== con.socket.remotePort)
                con.send(`User ${connection.socket.remotePort} says : ${message.utf8Data}`);
        });
    });

    connections.push(connection);

    connections.forEach(con => con.send(`User ${con.socket.remotePort} just connected.`));

});