import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
// import { useRouter } from 'next/router';
import { PhotographyCard, Profile } from '../components'; // { Banner }

const Home = () => {
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);
  // const router = useRouter();
  return (
    <div className="flex justify-center sm:px-4 p-12">
      <div className="w-full minmd:w-4/5">
        {user ? (
          <div>
            <Profile />
          </div>
        ) : (
          <div>
            {/* <Banner
        // this next line allows us to make our banner customizable on the whole app
        name="Welcome to The Daily Disco"
        childStyles="md:text-4xl sm:text-2xl xs=text-xl text-left"
        parentStyles="justify-start mb-6 h-72 sm:h-60 p-12 xs:p-4 xs:h-44 rounded-3xl"
      /> */}
            {/* this is the div for generated Images */}
            <div className="mt-0">
              <div className="flexBetween mx-4 xs:mx-0 minlg:mx-8 sm:flex-col sm:items-start">
                <h1 className="flex-1 font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold sm:mb-4">
                  Recent AI-prompt assisted art using Stable Diffusion
                </h1>
              </div>
              <p className="flex-1 mx-4 xs:mx-0 minlg:mx-8 sm:flex-col sm:items-start">
                Feel free to email us your prompts and we will do our best to
                post the results for you.
              </p>
              <div className="mt-3 w-full flex flex-wrap justify-start md:justify-center">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (
                  <PhotographyCard
                    key={`stableDiffusion-${i}`}
                    stableDiffusion={{
                      // name: `Prompt ${i}`,
                      // link: `https://storage.googleapis.com/stable-diffusion.appspot.com/stable-diffusion-${i}.png`,
                      i,
                      description:
                        'Art produced with Stable Diffusion prompt engineering',
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
