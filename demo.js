var socket = null;

// Audio variables
var audioInterval = null;

var audioContext = null;
var audioSource = null;
var audioAnalyser = null;
var audioGain = null;
var audioData = null;
var volume = null;

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
    stopAllPrograms();
    if (socket !== null) {
        socket.send("program:test");
    }
}

function red() {
    stopAllPrograms();
    if (socket !== null) {
        socket.send("program:static red:255 green:0 blue:0");
    }
}

function green() {
    stopAllPrograms();
    if (socket !== null) {
        socket.send("program:static red:0 green:255 blue:0");
    }
}

function blue() {
    stopAllPrograms();
    if (socket !== null) {
        socket.send("program:static red:0 green:0 blue:255");
    }
}

function rainbow() {
    stopAllPrograms();
    if (socket !== null) {
        socket.send("program:rainbow");
    }
}

function audio() {
    navigator.getUserMedia = ( navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia);

    navigator.getUserMedia( {
        audio: true,
        video: false
    }, audioSucess, audioError);
}

var audioSucess = function (stream) {
    console.log("Success");
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    
    var fftSize = 4096;
    
    audioContext = new AudioContext();
    audioSource = audioContext.createMediaStreamSource(stream);
    
    audioGain = audioContext.createGain();
    audioGain.gain.value = 1.0; //Lautstärke
    audioGain.connect(audioContext.destination);
    
    audioAnalyser = audioContext.createAnalyser();
    audioAnalyser.fftSize = fftSize;
    audioAnalyser.connect(audioContext.destination);
    
    audioData = new Uint8Array(fftSize * 0.5);
    //audioSource.connect(audioGain);
    audioSource.connect(audioAnalyser);
    
    var sampleAudioStream = function() {
        audioAnalyser.getByteFrequencyData(audioData);
        
        for (var i = 0, length = audioData.length/70, sum = 0; i < length; i++) {
            // console.log(i + ": " + audioData[i]);
            sum += audioData[i];
        }
        
        volume = sum / (length * 256);
        console.log(volume);

        if (socket !== null) {
            console.log("Send audio data");
            socket.send("program:audio volume:" + (parseInt(volume * 250)));
        }

    };
    
    audioInterval = setInterval(sampleAudioStream, 5);
    
    volume = 0;
}

var audioError = function (event) {
    console.log("Auio error: " + event.data);
}

function stopAllPrograms() {
    clearInterval(audioInterval);
}