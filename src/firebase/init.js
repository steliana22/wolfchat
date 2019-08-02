import firebase from 'firebase/app';
import firestore from 'firebase/firestore'
  
const firebaseConfig = {
  apiKey: "AIzaSyCsky7VBvibhtdFpDza-kjvP9PuLj9A69g",
    authDomain: "wolfchat-fcb50.firebaseapp.com",
    databaseURL: "https://wolfchat-fcb50.firebaseio.com",
    projectId: "wolfchat-fcb50",
    storageBucket: "wolfchat-fcb50.appspot.com",
    messagingSenderId: "500282559197",
    appId: "1:500282559197:web:b83402f9e0537435"
};
  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  firebaseApp.firestore().settings({timestampsInSnapshots: true});

  export default firebaseApp.firestore();