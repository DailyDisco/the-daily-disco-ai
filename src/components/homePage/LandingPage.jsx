import PhotographyCard from './PhotographyCard';

const LandingPage = () => {
  return (
    <div className="flex justify-center items-center sm:px-4 p-12 -mt-11 minmd:ml-7">
      <div className="w-full minmd:w-4/5">
        {/* this is the div for generated Images */}
        <div className="mt-0">
          <div className="text-center">
            <div className="flexBetween mx-4 xs:mx-0 minlg:mx-8 sm:flex-col sm:items-start">
              <h1 className="flex-1 font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold sm:mb-4">
                Recently shared AI assisted art using Stable Diffusion
              </h1>
            </div>
            <p className="flex-1 mx-4 xs:mx-0 minlg:mx-8 sm:flex-col sm:items-start">
              Sign up and start sharing your own AI generated pictures and
              stories.
            </p>
          </div>
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
    </div>
  );
};

export default LandingPage;
