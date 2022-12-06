/* eslint-disable react/no-unescaped-entities */
// No React import needed up here! 😳
import { Banner, Footer } from '../components';

export default function about() {
  return (
    <div>
      <div className="flex justify-center sm:px-4 p-12">
        <div className="w-full minmd:w-4/5">
          <Banner
            name="The Daily Disco: AI Generated Images and Stories"
            childStyles="md:text-4xl sm:text-2xl xs=text-xl text-left"
            parentStyles="justify-start mb-6 h-72 sm:h-60 p-12 xs:p-4 xs:h-44 rounded-3xl"
          />
          <div className="flex-1 dark:text-white text-nft-black-1 text-lg minlg:text-xl sm:mb-4 mx-3">
            <div className="flex justify-center items-center mt-5">
              <p className="text-3xl font-semibold tracking-wide text-center">
                The Daily Disco is a community-driven platform where users can
                share and discover AI generated images and stories. Our goal is
                to provide a fun and engaging space for people to explore the
                creative possibilities of AI, and to learn more about how it
                works.
              </p>
            </div>
            <div className="mt-5">
              <p className="text-xl font-light tracking-wide text-center">
                In addition to hosting user-generated content, we also offer a
                range of tutorials and articles that provide an in-depth look at
                the technology behind AI and how it can be used to create
                beautiful and imaginative works of art. Whether you're an AI
                enthusiast, a creative professional, or just someone who loves
                to learn, we hope you'll find something interesting and
                inspiring on The Daily Disco.
              </p>
            </div>
            <div className="mt-5">
              <p className="text-2xl font-bold tracking-wide text-center">
                To get started, all you need to do is create an account using
                your email. This will allow you to post your own creations,
                comment on other people's work, and save your favorite images
                and stories to your own personal collection. So why not give it
                a try and see what you can discover on The Daily Disco?
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
