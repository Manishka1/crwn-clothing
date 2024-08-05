import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const config = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = doc(firestore, `users/${userAuth.uid}`);
    const snapshot = await getDoc(userRef);

    if (!snapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userRef, {
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        } catch (error) {
            console.error('Error creating user', error.message);
        }
    }

    return userRef;
};

const firebaseApp = initializeApp(config);

export const auth = getAuth(firebaseApp);
export const firestore = getFirestore(firebaseApp);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = async () => {
    try {
        await signInWithPopup(auth, provider);
    } catch (error) {
        if (error.code === 'auth/popup-closed-by-user') {
            console.log('The popup was closed by the user before completing the sign-in.');
            
        } else {
            console.error('Error during sign-in:', error);
        }
    }
};

export default firebaseApp;
