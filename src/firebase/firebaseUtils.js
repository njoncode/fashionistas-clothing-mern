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
 console.log('userRef: ', userRef);

 const snapShot = await userRef.get(); 
 console.log('snapShot: ', snapShot); 
 
 // If document exists
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

export const addCollectionAndItems = async (collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey);
  console.log('collectionRef: ', collectionRef)

  const batch = firestore.batch();
  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj)
  });

  return await batch.commit();
}

// This function is gonna get the whole snapshot & convert the array into an object and we will add route property to the object
export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map(doc => {
    const { title, items } = doc.data();   // doc.data gets the data of the snapshot 

    return {
      routeName:  (title.toLowerCase()),   // The encodeURI is used to encode a URI by replacing each instance of certain characters by one, two or three escape sequences representing the UTF-8 encoding of the character. 
      id: doc.id,
      title,
      items
    }
  });

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] =  collection;
    return accumulator;
  }, {});

}; 

// Initialize Firebase
firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;