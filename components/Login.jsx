import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from 'firebase/auth';
// import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { initFirebase } from '../firebase/firebaseApp';

const login = () => {
  initFirebase();
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);
  // const router = useRouter();

  if (user) {
    // router.push('/profile');
    // return <div className="mr-8">Logged in as {user.displayName}</div>;
  }

  const signIn = async () => {
    const result = signInWithPopup(auth, provider);
    console.log(result.user);
  };

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      console.log(uid); // "G8ckH0c..."
      const displayName = user.displayName;
      console.log(displayName); // "Ada Lovelace"
      const email = user.email;
      console.log(email); // example@gmail.com
      const photoURL = user.photoURL;
      console.log(photoURL); // "https://lh3.googleusercontent.com/a-/AOh14Gg..."
      const emailVerified = user.emailVerified;
      console.log(emailVerified); // true or false
      const phoneNumber = user.phoneNumber;
      console.log(phoneNumber); // null || "+1 555-555-5555"
      const isAnonymous = user.isAnonymous;
      console.log(isAnonymous); // false || true
      const tenantId = user.tenantId;
      console.log(tenantId); // null || "TENANT_PROJECT_ID"
      const providerData = user.providerData;
      console.log(providerData); // Array of user info from other providers linked to the user as an array object
      const metadata = user.metadata;
      console.log(metadata); // Object with creationTime and lastSignInTime
      const refreshToken = user.refreshToken;
      console.log(refreshToken); // this is for the user to re-authenticate without signing in again
      const accessToken = user.accessToken;
      console.log(accessToken); // this is for the user to re-authenticate with a third party
    } else {
      console.log('user is signed out');
    }
  });

  return (
    <div>
      <button onClick={signIn} type="button" onChange={onAuthStateChanged}>
        <div className="bg-blue-600 mx-8 text-white rounded-md p-1 w-24">
          Sign In
        </div>
      </button>
    </div>
  );
};

export default login;
