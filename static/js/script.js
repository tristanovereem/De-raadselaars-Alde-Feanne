// Initialiseer de camera
let useBackCamera = true;
let videoElement = document.getElementById("video");
let canvas = document.createElement("canvas");
let context = canvas.getContext("2d");

let lastScanTime = 0; 

// Probeer de achterste camera in te laden. Als dit niet lukt, laad de volgende beschikbare in
async function startCamera() {
    try {
        const constraints = {
            video: { facingMode: useBackCamera ? "environment" : "user" }
        };
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        videoElement.srcObject = stream;
        console.log("Camera ingeladen");

        videoElement.onloadeddata = () => {
            console.log("Video ingeladen");
            scanQRCode(); 
        };
    } catch (error) {
        console.error("Error: ", error);
        alert("Geen toegang tot camera. Probeer toestemming te geven.");
    }
}

// Switch van camera
function switchCamera() {
    useBackCamera = !useBackCamera;
    console.log("Switch!");
    startCamera();
}

// Scan elke 0.5 seconden de frame voor QR code's
function scanQRCode() {
    const currentTime = Date.now();
    if (currentTime - lastScanTime < 500) {
        requestAnimationFrame(scanQRCode);
        return;
    }

    lastScanTime = currentTime; 

    // Debug voor als de camera/video niet in laad
    if (!videoElement.srcObject || videoElement.videoWidth === 0 || videoElement.videoHeight === 0) {
        console.error("...");
        return;
    }

    // Laat camera zien aan gebruiker
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;

    // Laad frame van camera in, scan voor QR codes en decode als er 1 is
    context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
    let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    let code = jsQR(imageData.data, canvas.width, canvas.height);

    // Als specifieke link de QR code link is, gaan we naar de vraag pagina
    if (code) {
        console.log("QR code gevonden! Link: ", code.data);
        if (code.data === "https://aldefeanentest.pythonanywhere.com/VRAAG1META") {  
            console.log("YEAH! HET  WERKT!!");
            window.location.href = "/test-vraag-1"; 
        }
        if (code.data === "https://aldefeanentest.pythonanywhere.com/VRAAG2META") {  
            console.log("YEAH! HET  WERKT!!");
            window.location.href = "/test-vraag-2"; 
        }
        if (code.data === "https://aldefeanentest.pythonanywhere.com/VRAAG3META") {  
            console.log("YEAH! HET  WERKT!!");
            window.location.href = "/test-vraag-3"; 
        }
        if (code.data === "https://aldefeanentest.pythonanywhere.com/VRAAG4META") {  
            console.log("YEAH! HET  WERKT!!");
            window.location.href = "/test-vraag-4"; 
        }
    } else {
        console.log("Geen QR code gevonden");
    }

    requestAnimationFrame(scanQRCode); 
}

startCamera();

// Check of een antwoord de juiste argument heeft
function checkAnswer(answer) {
    const resultDiv = document.getElementById('result');
    const resultCon = document.getElementsByClassName('resultContainer')[0];
    const main = document.getElementsByClassName('main')[0];
    if (answer === 'correct') {
        main.style.display = "none";
        resultCon.style.display = "flex"
        resultDiv.textContent = 'Correct!';
        resultDiv.style.color = 'green';
    } else {
        main.style.display = "none";
        resultCon.style.display = "flex"
        resultDiv.textContent = 'Helees, dit was niet het juiste antwoord.';
        resultDiv.style.color = 'red';
    }
}
