import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const config = {
    apiKey: "AIzaSyBbgoooEN8ESqde9jIYUbRfGZwKL-I2yq4",
    authDomain: "crwn-db-bb2ea.firebaseapp.com",
    projectId: "crwn-db-bb2ea",
    storageBucket: "crwn-db-bb2ea.appspot.com",
    messagingSenderId: "961577615253",
    appId: "1:961577615253:web:09ca69925c70d7b133809c",
    measurementId: "G-0GNHKME3KH"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return null;

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
