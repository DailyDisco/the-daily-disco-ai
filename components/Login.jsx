import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signInWithRedirect,
} from 'firebase/auth';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Route, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { initFirebase } from '../firebase/firebaseApp';
import { client } from '../pages/client';

const login = () => {
  initFirebase();
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const [user] = useAuthState(auth);
  const router = useRouter();

  const signIn = async () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const userData = result.user;
        console.log('credential', credential);
        console.log('token', token);
        console.log('user', userData);
        const { uid, displayName, email, photoURL, idToken } = userData;
        console.log('uid', uid);
        console.log('displayName', displayName);
        console.log('email', email);
        console.log('photoURL', photoURL);
        console.log('setting local storage');
        localStorage.setItem('user', JSON.stringify(userData));
        console.log(localStorage);

        console.log('local storage set');
        console.log('calling sanity');
        // this tells sanity what variables to receive
        const doc = {
          _id: uid,
          _type: 'user',
          userName: displayName,
          image: photoURL,
        };
        console.log('doc', doc);
        console.log('calling sanity createIfNotExists');

        client.createIfNotExists(doc).then(() => {
          console.log('redirecting logged in user');
          router.push('/', { replace: true });
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // eslint-disable-next-line prefer-destructuring
        // const email = error.customerData.email;
        // const credential = GoogleAuthProvider.credentialFromError(error);
        console.log('errorCode', errorCode, errorMessage);
      });
  };

  return (
    <div className="opacity-1">
      <button onClick={signIn} type="button" onChange={onAuthStateChanged}>
        {/* <div className="bg-blue-600 mx-8 text-white rounded-md p-1 w-24">
          Sign In
        </div> */}
        <div className="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none">
          <div className="flex items-center justify-center mr-5">
            <FcGoogle className="mr-3 h-7 w-7" />
            <div className="text-xl font-bold ">Login or Sign Up</div>
          </div>
        </div>
      </button>
    </div>
  );
};

export default login;
