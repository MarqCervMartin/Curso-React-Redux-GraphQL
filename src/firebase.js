import { initializeApp} from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";

let firebaseConfig = {
    apiKey: "AIzaSyA5emfThDVCMKv36dIed69a0TmiMACagC0",
    authDomain: "checkin-9c061.firebaseapp.com",
    databaseURL: "https://checkin-9c061.firebaseio.com",
    projectId: "checkin-9c061",
    storageBucket: "checkin-9c061.appspot.com",
    messagingSenderId: "950283378696",
    appId: "1:950283378696:web:ffb9298b62d28cb31871bd",
    measurementId: "G-TKFH5YX11M"
};
//Initialize firebase
initializeApp(firebaseConfig);

export function signOutGoogle(){
    signOut(getAuth());
}

export function loginWithGoogle(){
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider)
        .then(snap => snap.user)
}