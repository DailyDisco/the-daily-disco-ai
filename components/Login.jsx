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
  const [user] = useAuthState(auth);
  // const router = useRouter();

  if (user) {
    // router.push('/profile');
    // return <div className="mr-8">Logged in as {user.displayName}</div>;
  }

  const signIn = async () => {
    const result = signInWithPopup(auth, provider);
    console.log(result.user);
  };

  onAuthStateChanged(auth, () => {
    if (user) {
      const {
        uid,
        displayName,
        email,
        photoURL,
        emailVerified,
        phoneNumber,
        isAnonymous,
        tenantId,
        providerData,
        metadata,
        refreshToken,
        accessToken,
      } = user;
      console.log(
        user,
        uid,
        displayName,
        email,
        photoURL,
        emailVerified,
        phoneNumber,
        isAnonymous,
        tenantId,
        providerData,
        metadata,
        refreshToken,
        accessToken
      );
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
