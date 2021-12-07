var socket = null;

function update(input) {
    var dict = {};
    var split = input.split(" ");
    if (split[0] === "info") {
        for (i = 1; i < split.length; i++) {
            var pair = split[i].split(":");
            dict[pair[0]] = pair[1];
        }
    }
    for(var key in dict) {
        if (key === "name") {
            document.getElementById("lamp_name").innerText = dict[key];
        }
        if (key === "led_count") {
            document.getElementById("lamp_leds").innerText = dict[key];
        }
        if (key === "red") {
            document.getElementById("red-input").value = dict[key];
            document.getElementById("red-slider").value = dict[key];
        }
        if (key === "green") {
            document.getElementById("green-input").value = dict[key];
            document.getElementById("green-slider").value = dict[key];
        }
        if (key === "blue") {
            document.getElementById("blue-input").value = dict[key];
            document.getElementById("blue-slider").value = dict[key];
        }
        if (key === "brightness") {
            document.getElementById("brightness-input").value = dict[key];
            document.getElementById("brightness-slider").value = dict[key];
        }
        if (key === "speed") {
            document.getElementById("speed-input").value = dict[key];
            document.getElementById("speed-slider").value = dict[key];
        }
    }
}

function connect() {
    var ip_address = document.getElementById("enter_ip_address").value;

    socket = new WebSocket("ws://" + ip_address + ":80/");
    socket.onopen = function (event) {
        console.log("Connection established");
        document.getElementById("initialize_connection").style.display = "none";
        document.getElementById("connection_status").style.display = "block";
        var ip_address_label = document.getElementById("ip_address");
        ip_address_label.innerText = ip_address;
    }
    socket.onmessage = function (event) {
        update(event.data);
        console.log(event.data);
    }
    socket.onerror = function (event) {
        console.log("Error with Websocket");
    }
}

function disconnect() {
    socket.close();
    socket = null;
    document.getElementById("initialize_connection").style.display = "block";
    document.getElementById("connection_status").style.display = "none";
}

function send_all_colors(red, green, blue) {
    if (socket !== null) {
        socket.send("program:change-color red:" + red + " green:" + green + " blue:" + blue);
    }
}

function send_color(color, value) {
    if (socket !== null) {
        socket.send("program:change-color " + color + ":" + value);
    }
}

function send_brightness(value) {
if (socket !== null) {
        socket.send("program:change-brightness brightness:" + value);
    }
}

function send_speed(value) {
    if (socket !== null) {
        socket.send("program:change-speed speed:" + value);
    }
}

function set_program (program) {
    if (socket !== null) {
        socket.send("program:" + program);
    }
}