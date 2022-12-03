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
      <div className="flex justify-center sm:px-4 p-12">
        <div>
          {user ? (
            <div>
              <div className="w-full minmd:w-4/5 minmd:justify-center minmd:items-center minmd:mx-auto">
                <Profile user={user} />
              </div>
              {/* <MobileDock /> */}
            </div>
          ) : (
            <div className="w-full minmd:w-4/5 minmd:justify-center minmd:items-center minmd:mx-auto">
              <LandingPage />
              <Footer />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
