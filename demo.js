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

function red() {
    if (socket !== null) {
        socket.send("program:static red:255 green:0 blue:0");
    }
}

function green() {
    if (socket !== null) {
        socket.send("program:static red:0 green:255 blue:0");
    }
}

function blue() {
    if (socket !== null) {
        socket.send("program:static red:0 green:0 blue:255");
    }
}

function rainbow() {
    if (socket !== null) {
        socket.send("program:rainbow");
    }
}