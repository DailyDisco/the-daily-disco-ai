import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';
import {
  CreateImagePost,
  Feed,
  LandingPage,
  PhotographyCard,
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
            <Profile user={user} />
            {/* <Feed /> */}
            {/* <PinDetail /> */}
            {/* <CreateImagePost /> */}
          </div>
        ) : (
          <div>
            <LandingPage />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
