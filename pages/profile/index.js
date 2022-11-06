/* eslint-disable jsx-quotes */
import { getAuth } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';

const profile = () => {
  const test = null;
  console.log(test);

  const auth = getAuth();
  const router = useRouter();
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    router.push('/');
    return <div>Please sign in to continue</div>;
  }

  return (
    <div className='flex'>
      <h1>Profile</h1>
    </div>
  );
};

export default profile;
