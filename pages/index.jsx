import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';
import Head from 'next/head';
// import { useState } from 'react';
// import Link from 'next/link';
import {
  Footer,
  LandingPage,
  // MobileDock,
  Profile,
} from '../components'; // { Banner }

const Home = () => {
  const auth = getAuth();
  const [user] = useAuthState(auth);
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>The Daily Disco</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="flex justify-center items-center sm:px-4 p-12">
        {user ? (
          <div>
            <Profile user={user} />
            {/* <MobileDock /> */}
          </div>
        ) : (
          <div>
            <LandingPage />
            <Footer />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
