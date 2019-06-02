import Firebase from 'firebase';
// Your web app's Firebase configuration
let firebaseConfig = {
    apiKey: "AIzaSyC-JA-QM7sFzQqGKyo6OL1WFqBbj6xYbNM",
    authDomain: "giftwrap-f0fd7.firebaseapp.com",
    databaseURL: "https://giftwrap-f0fd7.firebaseio.com",
    projectId: "giftwrap-f0fd7",
    storageBucket: "giftwrap-f0fd7.appspot.com",
    messagingSenderId: "16954597642",
    appId: "1:16954597642:web:3964a2d9e02d17c0"
  };
  
  // Initialize Firebase
  let app = Firebase.initializeApp(firebaseConfig);  
  export const db = app.database(); 