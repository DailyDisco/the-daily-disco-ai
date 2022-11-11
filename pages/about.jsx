// No React import needed up here! 😳
import { Banner } from '../components';

export default function about() {
  return (
    <div className="flex justify-center sm:px-4 p-12">
      <div className="w-full minmd:w-4/5">
        <Banner
          // this next line allows us to make our banner customizable on the whole app
          name="The Daily Disco is a place to discover new or different ideas regarding health, tech, and pop culture."
          childStyles="md:text-4xl sm:text-2xl xs=text-xl text-left"
          parentStyles="justify-start mb-6 h-72 sm:h-60 p-12 xs:p-4 xs:h-44 rounded-3xl"
        />
        <div className="flex-1 font-poppins dark:text-white text-nft-black-1 text-xl minlg:text-2xl sm:mb-4 mx-5">
          <div className="mt-5">
            <p>
              The Daily Disco is a place to post AI generator pictures in a
              social format. The site also teaches you how to create better
              pictures, and run AI software on your own computer.
            </p>
          </div>
          <div className="mt-5">
            <p>
              We also host a Stable Diffusion gallery. If you would like your
              prompt created feel free to email me. We are currently working on
              integrated user self-input for our site. Sign up for our
              newsletter to know when that is available!
            </p>
          </div>
          <div className="mt-5">
            <p>
              {' '}
              Also, if you would like to create an account with us using your
              email or your crypto wallet. All prompts you input will be stored
              and you can begin to comment on posts and reviews!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
