import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from 'firebase/auth';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { FcGoogle } from 'react-icons/fc';
import { initFirebase } from '../../firebase/firebaseApp';
import { client } from '../../pages/client';

const Login = () => {
  initFirebase();
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const [user] = useAuthState(auth);
  const router = useRouter();

  const signIn = async () => {
    try {
      // Attempt to sign in with Google
      const result = await signInWithPopup(auth, provider);

      // Get the authentication credential from the result
      const credential = GoogleAuthProvider.credentialFromResult(result);

      // Get the access token from the credential
      const token = credential.accessToken;

      // Get the user data from the result
      const userData = result.user;

      // Destructure the user data
      const { uid, displayName, email, photoURL, idToken } = userData;

      // Save the user data to local storage
      localStorage.setItem('user', JSON.stringify(userData));

      // Create a document object to be sent to Sanity
      const doc = {
        _id: uid,
        _type: 'user',
        userName: displayName,
        image: photoURL,
      };

      // Attempt to create the document in Sanity
      await client.createIfNotExists(doc);

      // Redirect the user to the homepage
      router.push('/', { replace: true });
    } catch (error) {
      // Get the error code and message from the error object
      const errorCode = error.code;
      const errorMessage = error.message;

      // Log the error code and message to the console
      console.log('errorCode', errorCode, errorMessage);
    }
  };

  return (
    <div className="opacity-1">
      <button onClick={signIn} type="button" onChange={onAuthStateChanged}>
        <div className="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none">
          <div className="flex items-center justify-center mr-3">
            <FcGoogle className="mr-3 h-7 w-7" />
            <div className="text-lg font-bold ">Login</div>
          </div>
        </div>
      </button>
    </div>
  );
};

export default Login;
