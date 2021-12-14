function initialize() {
    document.getElementById("site").style.display = "none";
    const CVS = document.getElementById("music-visu");
    const CTX = CVS.getContext('2d');
    const W = CVS.width = window.innerWidth;
    const H = CVS.height = window.innerHeight;

    const ACTX = new AudioContext();
    const ANALYSER = ACTX.createAnalyser();

    ANALYSER.fftSize = 1024;  
    
    navigator.mediaDevices
    .getUserMedia({ audio: true })
    .then(process);

    function process(stream) {
        const SOURCE = ACTX.createMediaStreamSource(stream);
        SOURCE.connect(ANALYSER);
        const DATA = new Uint8Array(ANALYSER.frequencyBinCount);
        const LEN = DATA.length;
        const h = H / LEN;
        const x = W - 1;
        CTX.fillStyle = 'hsl(280, 100%, 10%)';
        CTX.fillRect(0, 0, W, H);

        loop();

        function loop() {
            window.requestAnimationFrame(loop);
            CTX.fillStyle = 'hsl(280, 100%, 10%)';
                CTX.fillRect(0, 0, W, H);
            ANALYSER.getByteFrequencyData(DATA);
            var volume = 0;
            for (let i = 0; i < LEN; i++) {
                CTX.fillStyle = "rgb(255, 255, 255)";
                CTX.fillRect(i * 8, H, 7, -DATA[i] * 2);
                if (i >= 50 && i <= 100) {
                    volume += DATA[i];
                }
            }
            volume = volume / (50 * 255);
            CTX.fillStyle = "rgb(255, 255, 255)";
            CTX.fillRect(W-30, H, -50, -volume * 1000);
        }
    }
}