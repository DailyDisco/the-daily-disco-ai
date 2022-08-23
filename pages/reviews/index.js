import { Banner } from '../../components';

export default function reviews() {
  return (
    <div className="flex justify-center sm:px-4 p-12">
      <div className="w-full minmd:w-4/5">
        <Banner
        // this next line allows us to make our banner customizable on the whole app
          name="Welcome to my reviews page! Here I will review all sorts of things mostly pop culture and tech."
          childStyles="md:text-4xl sm:text-2xl xs=text-xl text-left"
          parentStyles="justify-start mb-6 h-72 sm:h-60 p-12 xs:p-4 xs:h-44 rounded-3xl"
        />
      </div>
    </div>
  );
}

