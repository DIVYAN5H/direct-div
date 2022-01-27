import firebase from 'firebase';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBQt2c5ydeIHR2mg7j_LVWQGReSBQM03KU",
  authDomain: "direct-div.firebaseapp.com",
  projectId: "direct-div",
  storageBucket: "direct-div.appspot.com",
  messagingSenderId: "886731095784",
  appId: "1:886731095784:web:cb363e1773a316616ed35d",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const fv = firebase.firestore.FieldValue;

export { db, auth, provider, fv };
