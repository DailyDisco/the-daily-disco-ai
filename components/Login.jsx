/* eslint-disable jsx-quotes */
import React from 'react';
import { getAuth, signInWithRedirect, GoogleAuthProvider } from 'firebase/auth';
import { initFirebase } from '../firebase/firebaseApp';

const login = () => {
  initFirebase();
  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  const signIn = async () => {
    const result = signInWithRedirect(auth, provider);
    console.log(result.user);
  };

  return (
    <div>
      <div ml-4>
        <button onClick={signIn} type='button'>
          <div className='bg-blue-600 text-white rounded-md p-2 w-48'>
            Sign In
          </div>
        </button>
      </div>
    </div>
  );
};

export default login;
