import { initializeApp } from 'firebase/app';

import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCYtdKNH9MX7V5jjZPxdvV1vMu916AkVAI",
  authDomain: "crwn-clothing-db-69ff8.firebaseapp.com",
  projectId: "crwn-clothing-db-69ff8",
  storageBucket: "crwn-clothing-db-69ff8.appspot.com",
  messagingSenderId: "510101405990",
  appId: "1:510101405990:web:280ecd5d5e4a1bb67281e7"
};

// eslint-disable-next-line
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);
  
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = () => signOut(auth);

export const onAuthStateChangedListener = (callback) => 
  onAuthStateChanged( auth, callback);

