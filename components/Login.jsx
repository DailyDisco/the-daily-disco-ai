/* eslint-disable jsx-quotes */
import React from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { initFirebase } from '../firebase/firebaseApp';

const login = () => {
  initFirebase();
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (user) {
    router.push('/profile');
    return <div className='mr-8'>Logged in as {user.displayName}</div>;
  }

  const signIn = async () => {
    const result = signInWithPopup(auth, provider);
    console.log(result.user);
  };

  return (
    <div>
      <button onClick={signIn} type='button'>
        <div className='bg-blue-600 mx-8 text-white rounded-md p-1 w-24'>
          Sign In
        </div>
      </button>
    </div>
  );
};

export default login;
