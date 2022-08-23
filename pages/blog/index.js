import { Banner } from '../../components';

export default function blog() {
  return (
    <div className="flex justify-center sm:px-4 p-12">
      <div className="w-full minmd:w-4/5">
        <Banner
        // this next line allows us to make our banner customizable on the whole app
          name="Join now to connect with friends and meet new ones all while enjoying the games you love!"
          childStyles="md:text-4xl sm:text-2xl xs=text-xl text-left"
          parentStyles="justify-start mb-6 h-72 sm:h-60 p-12 xs:p-4 xs:h-44 rounded-3xl"
        />
      </div>
    </div>
  );
}

