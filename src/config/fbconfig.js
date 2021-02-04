import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'
import * as admin from 'firebase-admin';

const firebaseConfig = {
    apiKey: "AIzaSyCWI5B8iJw66xDfuVbMQfRMwDsXp1seG7Y",
    authDomain: "elad-training.firebaseapp.com",
    credential: admin.credential.applicationDefault(),
    databaseURL: "https://elad-training-default-rtdb.firebaseio.com",
    projectId: "elad-training",
    storageBucket: "elad-training.appspot.com",
    messagingSenderId: "67812074699",
    appId: "1:67812074699:web:564209529c7091cac9a74e"
  };

firebase.initializeApp(firebaseConfig);
//firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase;