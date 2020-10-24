import firebase from 'firebase';
import "firebase/auth";

firebase.initializeApp({
    apiKey: "AIzaSyCvT3JayUN2zDqZCXN7tMRMxcc8LyJ1e7o",
    authDomain: "ceas-tutoring-queue.firebaseapp.com",
    databaseURL: "https://ceas-tutoring-queue.firebaseio.com",
    projectId: "ceas-tutoring-queue",
    storageBucket: "ceas-tutoring-queue.appspot.com",
    messagingSenderId: "119380435857",
    appId: "1:119380435857:web:a5e90c1868ec9743aaf030",
    measurementId: "G-W87DG8YVGF",
});

export const auth = firebase.auth();
auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);

export default firebase;