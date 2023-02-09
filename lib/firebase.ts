import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

import { TAuthInfo, TFirebaseUser } from "@/project-types";

const firebaseConfig = {
  apiKey: "AIzaSyDD61kl9EOdsHw5toEZMqYa4hofQjWrCNo",
  authDomain: "pin-it-69ab6.firebaseapp.com",
  projectId: "pin-it-69ab6",
  storageBucket: "pin-it-69ab6.appspot.com",
  messagingSenderId: "1067820271469",
  appId: "1:1067820271469:web:8493083aa96d1b88b2fc64"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const registerUser = async (registerInfo: TAuthInfo): Promise<TFirebaseUser | undefined> => {
  try {
    const { user } = await createUserWithEmailAndPassword(auth, registerInfo.email, registerInfo.password);
    const { uid, email } = user;
    return { userId: uid, email };
  } catch (error) {
    console.log("Error registering user with firebase");
  }
}

export const loginUser = async (loginInfo: TAuthInfo): Promise<TFirebaseUser | undefined> => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, loginInfo.email, loginInfo.password)
    const { uid, email } = user;
    return { userId: uid, email };
  } catch (error) {
    console.log("Error logging in user to firebase");
  }
}

export const logoutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error) {
    console.log("Error logging out user from firebase");
  }
}
