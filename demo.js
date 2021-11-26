var socket = null;

function connect() {
    socket = new WebSocket("ws://localhost:80/");
    socket.onopen = function (event) {
        console.log("Connection established");
    }
    socket.onmessage = function (event) {
        console.log(event.data);
    }
}

function send() {
    if (socket !== null) {
        socket.send("program:test");
    }
}