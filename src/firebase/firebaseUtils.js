import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyChsnAu5ABU7Yw_MrrW0j0FUHFXjGmTnok",
    authDomain: "fashionista-db.firebaseapp.com",
    projectId: "fashionista-db",
    storageBucket: "fashionista-db.appspot.com",
    messagingSenderId: "391426228358",
    appId: "1:391426228358:web:ad1fea2d67e4133f8f9107",
    measurementId: "G-ZR1XHQ4543"
  };

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth) return;

 const userRef = firestore.doc(`users/${userAuth.uid}`);
 const snapShot = await userRef.get();
 
 if(!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message )
    }
 }
  return userRef;
}

// Initialize Firebase
firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;