import { useEffect, useState } from 'react'; // useEffect, useContext
import { useTheme } from 'next-themes';
import Image from 'next/legacy/image';
import Link from 'next/link'; // Link is a component that is used to link to other pages
import { CgProfile } from 'react-icons/cg';
import { MdOutlineAddAPhoto } from 'react-icons/md';
import { getAuth } from 'firebase/auth';
import { RiHomeHeartLine } from 'react-icons/ri';
import { useAuthState } from 'react-firebase-hooks/auth';
import { initFirebase } from '../firebase/firebaseApp';

import images from '../../public/assets';
import Login from './auth/Login';

const MenuItems = ({ isMobile, active, setActive, setIsOpen }) => {
  const generateLink = (i) => {
    switch (i) {
      case 0:
        return '/';
      case 1:
        return '/about';
      case 2:
        return '/TryItOut';
      case 3:
        return '/blog';
      default:
        return '/';
    }
  };
  return (
    <div>
      <ul
        className={`list-none flexCenter flex-row ${
          isMobile && 'flex-col h-full mt-20'
        }`}
      >
        {['Home', 'About', 'Try It Out', 'Blog & Tutorials'].map((item, i) => (
          <li
            key={i}
            onClick={() => {
              setActive(item);
              setIsOpen(false);
            }}
            className={`flex flex-row items-center text-base leading-loose font-poppins font-semibold dark:hover:text-white hover:text-nft-dark mx-3
        ${
          active === item
            ? 'dark:text-white text-nft-black-1'
            : 'dark:text-nft-gray-3 text-nft-gray-2'
        }
        `}
          >
            <Link href={generateLink(i)}>{item}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const navbar = () => {
  initFirebase();
  const auth = getAuth();

  const { theme, setTheme } = useTheme();
  const [active, setActive] = useState('Home');
  const [isOpen, setIsOpen] = useState(false);
  const [user] = useAuthState(auth);

  return (
    <div>
      <nav className="flexBetween w-full fixed z-50 p-4 flex-row border-b dark:bg-nft-dark bg-white dark:border-nft-black-1 border-nft-gray-1">
        <div className="flex flex-1 flex-row justify-start">
          <Link href="/" passHref>
            <div
              className="flexCenter md:hidden cursor-pointer"
              onClick={() => {}}
            >
              {/* change logo here */}
              <Image
                src={images.D}
                objectFit="contain"
                width={32}
                height={32}
                alt="logo"
              />
              <p className="dark:text-white text-nft-black-1 font-semibold text-lg ml-1">
                The Daily Disco
              </p>
            </div>
          </Link>
          <Link href="/" passHref>
            <div className="hidden md:flex cursor-pointer" onClick={() => {}}>
              {/* change logo here */}
              <Image
                src={images.D}
                objectFit="contain"
                width={32}
                height={32}
                alt="logo"
              />
              <p className="dark:text-white text-nft-black-1 font-semibold text-lg ml-1">
                Daily Disco
              </p>
            </div>
          </Link>
        </div>
        {/* <div className="flex flex-1 flex-row justify-end"> </div> */}

        <div className="flex flex-row items-center">
          {user ? <p className="hidden">Welcome</p> : <Login />}
          {user ? (
            <div className="flex">
              <div className="justify-center items-center mr-5 text-2xl">
                <Link href="/" passHref>
                  <CgProfile />
                </Link>
              </div>
              <div className="justify-center items-center mr-5 text-2xl">
                <Link href="/user/Feed" passHref>
                  <RiHomeHeartLine />
                </Link>
              </div>
              <div className="justify-center items-center mr-7 text-2xl">
                <Link href="/user/CreateImagePost" passHref>
                  <MdOutlineAddAPhoto />
                </Link>
              </div>
            </div>
          ) : (
            <p className="hidden">Welcome</p>
          )}
        </div>
        <div className="flex flex-initial flex-row justify-end">
          <div className="flex items-center mr-3">
            <input
              type="checkbox"
              className="checkbox"
              id="checkbox"
              onChange={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            />
            {/* this is the toggle that we click to change it from light mode to dark mode */}
            <label
              htmlFor="checkbox"
              className="flexBetween w-8 h-4 bg-black rounded-2xl p-1 relative label"
            >
              <i className="fas fa-sun" />
              <i className="fas fa-moon" />
              <div className="w-3 h-3 absolute bg-white rounded-full ball" />
            </label>
          </div>

          <div className="md:hidden flex">
            <MenuItems
              active={active}
              setActive={setActive}
              onClick={() => {}}
            />
          </div>
        </div>
        {/* this is our mobile navigation bar */}
        <div className="hidden md:flex ml-3 mr-1">
          {isOpen ? (
            <Image
              src={images.cross}
              objectFit="contain"
              width={20}
              height={20}
              alt="close"
              onClick={() => setIsOpen(false)}
              // this next line is the toggle that we click to change it from light mode to dark mode
              className={theme === 'light' ? 'filter invert' : null}
            />
          ) : (
            <Image
              src={images.menu}
              objectFit="contain"
              width={25}
              height={25}
              alt="menu"
              onClick={() => setIsOpen(true)}
              // this next line is the toggle that we click to change it from light mode to dark mode
              className={theme === 'light' ? 'filter invert' : null}
            />
          )}
          {isOpen && (
            <div className="fixed inset-0 top-65 dark:bg-nft-dark bg-white z-10 nav-h flex justify-between flex-col">
              <div className="flex-1 p-4">
                <MenuItems
                  setIsOpen={setIsOpen}
                  active={active}
                  setActive={setActive}
                  isMobile
                />
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default navbar;
