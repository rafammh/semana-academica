// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-analytics.js";
// Configuração do PROJETO semana-academica-if
const firebaseConfig = {
    apiKey: "AIzaSyBfZA-ogEsvNGmMnNHpTx_pNeOKM7OEyQs",
    authDomain: "semana-academica-if.firebaseapp.com",
    projectId: "semana-academica-if",
    storageBucket: "semana-academica-if.appspot.com",
    messagingSenderId: "892758118372",
    appId: "1:892758118372:web:7d5458669c1540570401f1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app;