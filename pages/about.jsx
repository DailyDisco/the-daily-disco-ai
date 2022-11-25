// No React import needed up here! 😳
import { Banner } from '../components';

export default function about() {
  return (
    <div className="flex justify-center sm:px-4 p-12">
      <div className="w-full minmd:w-4/5">
        <Banner
          // this next line allows us to make our banner customizable on the whole app
          name="The Daily Disco is a place to share your AI generated images and stories with the world. We also host AI and ML related tutorials and articles."
          childStyles="md:text-4xl sm:text-2xl xs=text-xl text-left"
          parentStyles="justify-start mb-6 h-72 sm:h-60 p-12 xs:p-4 xs:h-44 rounded-3xl"
        />
        <div className="flex-1 dark:text-white text-nft-black-1 text-xl minlg:text-xl sm:mb-4 mx-3">
          <div className="mt-5">
            <p>
              The Daily Disco is a place to post AI generator pictures in a
              social format. The site also teaches you how to create better
              pictures, and run AI software on your own computer.
            </p>
          </div>
          {/* <div className="mt-5">

          </div> */}
          <div className="mt-5">
            <p>
              {' '}
              If you would like to create an account with us using your email
              then all prompts you input will be stored and you can begin to
              comment on posts and reviews!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
