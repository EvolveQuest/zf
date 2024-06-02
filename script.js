// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-analytics.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBI0mLoUz8mSJnGF6lNxiDg9rBLSqRrmTw",
    authDomain: "kfxt-7d2f1.firebaseapp.com",
    projectId: "kfxt-7d2f1",
    storageBucket: "kfxt-7d2f1.appspot.com",
    messagingSenderId: "355905987432",
    appId: "1:355905987432:web:2ca15e137a7a824de8acdd",
    measurementId: "G-L9S3H9RZXC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firestore
const db = getFirestore(app);

// Reference to the Firestore collection
const messagesRef = collection(db, 'messages');

// Custom welcome message
const customMessage = '请将您的问题及支付订单号一起发送,并留下您的联系方式,您也可以点击下方两位技术老师的电报号直接联系,我们会尽快回复您,谢谢！';

// Function to display a message on the page
function displayMessageOnPage(text, sender) {
    const messagesDiv = document.getElementById('messages');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);

    if (sender === 'customerService') {
        messageElement.innerHTML = `<img src="Logo.png" alt="客服头像" class="avatar"><div class="messageBox">${text}</div>`;
    } else {
        messageElement.innerHTML = `<div class="messageBox">${text}</div>`;
    }
    
    messagesDiv.appendChild(messageElement);
    messagesDiv.scrollTop = messagesDiv.scrollHeight; // Scroll to the bottom
}

// Function to send a message
async function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const messageText = messageInput.value;

    console.log("Message text:", messageText); // 添加调试信息

    if (messageText.trim() !== "") {
        // Display the message immediately on the page
        displayMessageOnPage(messageText, 'user');
        messageInput.value = '';

        try {
            await addDoc(messagesRef, {
                text: messageText,
                timestamp: serverTimestamp(),
                sender: 'user'
            });
            console.log("Message sent successfully"); // 添加调试信息
        } catch (error) {
            console.error('Error writing document: ', error);
        }
    }
}

// Function to display welcome message
function displayWelcomeMessage() {
    const messagesDiv = document.getElementById('messages');
    messagesDiv.innerHTML = ''; // Clear any existing messages

    // Display custom welcome message
    displayMessageOnPage(customMessage, 'customerService');
}

// Initialize display welcome message
window.onload = async () => {
    // Display welcome message
    displayWelcomeMessage();

    // Add event listener to the button
    document.getElementById('sendButton').addEventListener('click', sendMessage);
}