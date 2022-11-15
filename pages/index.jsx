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
            <div className="">
              <h3 className='flex justify-center items-center text-2xl font-bold mb-2'>Social Feed</h3>
              <Feed />
            </div>
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
