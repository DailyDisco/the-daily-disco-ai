import { useState } from 'react'; // useEffect, useContext
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link'; // Link is a component that is used to link to other pages
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { initFirebase } from '../firebase/firebaseApp';
import { useRouter } from 'next/router';

import images from '../assets';
import { Login, Logout } from '.';

const MenuItems = ({ isMobile, active, setActive }) => {
  const generateLink = (i) => {
    switch (i) {
      case 0:
        return '/';
      case 1:
        return '/imgGenerator';
      case 2:
        return '/about';
      case 3:
        return '/';
      default:
        return '/';
    }
  };
  return (
    <div>
      <ul
        className={`list-none flexCenter flex-row ${
          isMobile && 'flex-col h-full'
        }`}
      >
        {['Home', 'Img Generator', 'About', 'Test'].map((item, i) => (
          <li
            key={i}
            onClick={() => {
              setActive(item);
            }}
            className={`flex flex-row items-center font-poppins font-semibold text-base dark:hover:text-white hover:text-nft-dark mx-3
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
  const router = useRouter();

  const { theme, setTheme } = useTheme();
  const [active, setActive] = useState('Home');
  const [isOpen, setIsOpen] = useState(false);
  const [user, loading] = useAuthState(auth);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (user) {
  //   router.push('/profile');
  // }

  return (
    <div>
      <nav className="flexBetween w-full fixed z-10 p-4 flex-row border-b dark:bg-nft-dark bg-white dark:border-nft-black-1 border-nft-gray-1">
        <div className="flex flex-1 flex-row justify-start">
          <Link href="/">
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
          <Link href="/">
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
        <div className="flex flex-1 flex-row justify-end"> </div>

        <div className="flex flex-row items-center">
          {user ? <Logout /> : <Login />}
          {/* {user ? (
              <Button
                btnName="Logout"
                classStyles="bg-red-600 mx-8 text-white rounded-md p-1 w-24"
                onClick={signOutUser}
              />
            ) : (
              <Button
                btnName="Login"
                classStyles="bg-blue-600 mx-8 text-white rounded-md p-1 w-24"
                onClick={signIn}
              />
            )} */}
        </div>
        <div className="flex flex-initial flex-row justify-end">
          <div className="flex items-center mr-2">
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
        <div className="hidden md:flex ml-2">
          {isOpen ? (
            <Image
              src={images.cross}
              objectFit="contain"
              width={20}
              height={20}
              alt="close"
              onClick={() => setIsOpen(false)}
              // this next line is the toggle that we click to change it from light mode to dark mode
              className={theme === 'light' && 'filter invert'}
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
              className={theme === 'light' && 'filter invert'}
            />
          )}
          {isOpen && (
            <div className="fixed inset-0 top-65 dark:bg-nft-dark bg-white z-10 nav-h flex justify-between flex-col">
              <div className="flex-1 p-4">
                <MenuItems active={active} setActive={setActive} isMobile />
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default navbar;
