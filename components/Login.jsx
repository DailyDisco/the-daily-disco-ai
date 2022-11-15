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
import { initFirebase } from '../firebase/firebaseApp';

import { client } from '../pages/client';

const login = () => {
  initFirebase();
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const [user] = useAuthState(auth);
  const router = useRouter();
  // const router = useRouter();

  // const responseGoogle = (response) => {
  // const navigate = useNavigate();
  // signInWithPopup(auth, provider)
  //   .then((result) => {
  //     const credential = GoogleAuthProvider.credentialFromResult(result);
  //     const token = credential.accessToken;
  //     const user = result.user;
  //     console.log('user', user);
  //     console.log('token', token);
  //   })
  //   .catch((error) => {
  //     const errorCode = error.code;
  //     const errorMessage = error.message;
  //     const email = error.email;
  //     const credential = GoogleAuthProvider.credentialFromError(error);
  //     console.log('errorCode', errorCode);
  //     console.log('errorMessage', errorMessage);
  //     console.log('email', email);
  //     console.log('credential', credential);
  //   });
  // localStorage.setItem('user', JSON.stringify(user));
  // const { displayName, email, photoURL } = user;
  // // this tells sanity what variables to receive
  // const doc = {
  //   _id: user.uid,
  //   _type: 'user',
  //   userName: displayName,
  //   image: photoURL,
  // };
  // client.createIfNotExists(doc).then(() => {
  //   navigate('/', { replace: true });
  // });
  // };

  if (user) {
    // router.push('/profile');
    // return <div className="mr-8">Logged in as {user.displayName}</div>;
  }

  const signIn = async () => {
    const result = signInWithPopup(auth, provider);
    const { displayName, email, photoURL } = result.user;
    console.log('result', result);
    console.log('displayName', displayName);
    console.log('email', email);
    console.log('photoURL', photoURL);
    // const navigate = useNavigate();
    // localStorage.setItem('user', JSON.stringify(user));

    // // this tells sanity what variables to receive
    // const doc = {
    //   _id: user.uid,
    //   _type: 'user',
    //   userName: user.displayName,
    //   image: user.photoURL,
    // };

    // client.createIfNotExists(doc).then(() => {
    //   navigate('/', { replace: true });
    // });
    // // router.push('/');
    // // Router.push('/feed');
  };

  return (
    <div>
      <button onClick={signIn} type="button">
        {/* onChange={onAuthStateChanged} */}
        <div className="bg-blue-600 mx-8 text-white rounded-md p-1 w-24">
          Sign In
        </div>
      </button>
    </div>
  );
};

export default login;
