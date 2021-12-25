import { initializeApp} from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import {getFirestore, collection, addDoc, getDocs} from 'firebase/firestore';

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

//bd

export function getFavs(uid){
    let db = getFirestore();
    return getDocs(collection(db, uid))
        .then(snap => {
            return snap.data.favoritos
        })
}

export function updateDB(array, uid){
    //let db = getFirestore().collection('favs');
    let db = getFirestore();
    try {
        return addDoc(collection(db, "favs"), {
            favoritos: {...array}
        })
        //return db.doc(uid).set({favoritos: {...array}});
    } catch (error) {
        console.log('updateDB Error '+error);
    }
};

//auth
export function signOutGoogle(){
    signOut(getAuth());
}

export function loginWithGoogle(){
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider)
        .then(snap => snap.user)
}