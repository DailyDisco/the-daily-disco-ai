import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';
import Head from 'next/head';
// import { useState } from 'react';
import Link from 'next/link';
import {
  Footer,
  LandingPage,
  // MobileDock,
  Profile,
} from '../components';

const Home = () => {
  const auth = getAuth();
  const [user] = useAuthState(auth);

  // this will be the url name
  // const link = user ? `/user/user-profile/${user.uid}` : '/';

  return (
    <div>
      <Head>
        <title>The Daily Disco</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="flex justify-center items-center sm:px-4 p-12">
        {/* if there is a user load the profile component with the user info */}
        {/* if there is no user load the LandingPage component and the Footer */}
        <div>
          {user ? <Profile user={user} /> : <LandingPage />}
          {!user && <Footer />}
        </div>
      </div>
    </div>
  );
};

export default Home;
