import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyCWI5B8iJw66xDfuVbMQfRMwDsXp1seG7Y",
    authDomain: "elad-training.firebaseapp.com",
    databaseURL: "https://elad-training-default-rtdb.firebaseio.com",
    projectId: "elad-training",
    storageBucket: "elad-training.appspot.com",
    messagingSenderId: "67812074699",
    appId: "1:67812074699:web:564209529c7091cac9a74e"
  };

firebase.initializeApp(firebaseConfig);

export default firebase;