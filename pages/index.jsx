import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
// import { useRouter } from 'next/router';
import {
  CreateImagePost,
  Feed,
  Footer,
  LandingPage,
  PhotographyCard,
  Profile,
  PinDetail,
} from '../components'; // { Banner }

const Home = () => {
  const auth = getAuth();
  const [user] = useAuthState(auth);
  // const User =
  //   localStorage.getItem('user') !== 'undefined'
  //     ? JSON.parse(localStorage.getItem('user'))
  //     : localStorage.clear();

  return (
    <div className="flex justify-center sm:px-4 p-12">
      <div className="w-full minmd:w-4/5">
        {user ? (
          <div>
            <Profile user={user} />
            <div className="">
              <h3 className="flex justify-center items-center text-2xl font-bold mb-2">
                Home Feed
              </h3>
              <Feed />
            </div>
            <div>
              <PinDetail />
            </div>
            <div>
              <CreateImagePost />
            </div>
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
