import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from "@/router/index.js";
import store from "./store/index.js"

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDZkCS3oXKn3jXA_myLvcwzDL4CQIHtHf8",
    authDomain: "lms-nvd-b383d.firebaseapp.com",
    projectId: "lms-nvd-b383d",
    storageBucket: "lms-nvd-b383d.appspot.com",
    messagingSenderId: "1073139911653",
    appId: "1:1073139911653:web:7d15846b25fc5ecf857d0c"
};

// Initialize Firebase
const app1 = initializeApp(firebaseConfig);
const auth = getAuth(app1)

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
