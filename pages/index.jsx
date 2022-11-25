import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Link from 'next/link';
import {
  CreateImagePost,
  Feed,
  Footer,
  LandingPage,
  // MobileDock,
  PhotographyCard,
  // Profile,
  PinDetail,
  Profile,
} from '../components'; // { Banner }

const Home = () => {
  const auth = getAuth();
  const [user] = useAuthState(auth);
  const router = useRouter();

  return (
    <div className="flex justify-center sm:px-4 p-12">
      <div className="w-full minmd:w-4/5">
        {user ? (
          <div>
            <div>
              <Profile user={user} />
            </div>
            {/* <div>
              <PinDetail />
            </div> */}
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
