  import firebase from "firebase";

  const firebaseApp =firebase.initializeApp({
    apiKey: "AIzaSyBACWR-fxURRz_yWXqI4RFkH011B1qmrMY",
    authDomain: "todo-app-cp-d40d2.firebaseapp.com",
    databaseURL: "https://todo-app-cp-d40d2.firebaseio.com",
    projectId: "todo-app-cp-d40d2",
    storageBucket: "todo-app-cp-d40d2.appspot.com",
    messagingSenderId: "734877990834",
    appId: "1:734877990834:web:7f7cd49044f4b20dfb2eab",
    measurementId: "G-E25QSR7GM5"
  });

  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();

  export {db , auth , storage};
