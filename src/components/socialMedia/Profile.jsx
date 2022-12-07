// change set user id so that you can link to pin details

/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-quotes */
import { getAuth, updateProfile } from 'firebase/auth'; // setPersistence
import { VscSettingsGear } from 'react-icons/vsc';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react'; // useEffect
import { useAuthState } from 'react-firebase-hooks/auth';
import MasonryLayout from './ImageLayout';
import {
  userQuery,
  userCreatedPinsQuery,
  userSavedPinsQuery,
} from '../../services/sanitySocialServices';
import { client } from '../../pages/client';
import Logout from '../auth/Logout';

const Profile = () => {
  const randomImage =
    'https://source.unsplash.com/1600x900/?nature,photography,technology';
  const activeBtnStyles =
    'bg-pink-500 text-white font-bold p-2 rounded-full w-20 outline-none';
  const notActiveBtnStyles =
    'bg-primary mr-4 text-gray-500 font-bold p-2 rounded-full w-20 outline-none';
  const [user, setUser] = useState(null);
  const [pins, setPins] = useState(null);
  const [text, setText] = useState('Created');
  const [activeBtn, setActiveBtn] = useState('created');
  const router = useRouter();
  const { userId } = router.query;
  const auth = getAuth();
  const [userAuth] = useAuthState(auth);

  const userInfo =
    localStorage.getItem('user') !== 'undefined'
      ? JSON.parse(localStorage.getItem('user'))
      : localStorage.clear();

  useEffect(() => {
    console.log('this is the useEffect to query the user');
    const query = userQuery(userInfo?.uid);
    // console.log('query', query);
    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, [userId]);

  useEffect(() => {
    console.log('start of useEffect for saved pins');
    if (text === 'Created') {
      const createdPinsQuery = userCreatedPinsQuery(userAuth.uid);

      client.fetch(createdPinsQuery).then((data) => {
        // console.log('created pins', data);
        setPins(data);
        // console.log('post fetch data for saved pin', pins);
      });
    } else {
      const savedPinsQuery = userSavedPinsQuery(userAuth.uid);
      client.fetch(savedPinsQuery).then((data) => {
        setPins(data);
      });
    }
  }, [text, userId]);

  useEffect(() => {
    if (!userAuth) {
      router.push('/');
    }
  }, [userAuth]);

  return (
    <div className="flex justify-center items-center sm:px-4 p-12 -mt-16">
      <div className="w-full minmd:w-4/5">
        <div className="relative pb-2 h-full justify-center items-center">
          <div className="flex flex-col pb-5">
            <div className="relative flex flex-col mb-7">
              <div className="flex flex-col justify-center items-center">
                <img
                  src={randomImage}
                  className="w-full h-370 2xl:5-510 shadow-xl shadow-black object-cover"
                  alt="banner picture"
                  // width={1600}
                  // height={900}
                />
                <img
                  className="rounded-full w-20 -mt-10 shadow-xl shadow-black object-cover mx-auto"
                  src={userAuth.photoURL}
                  alt="user profile picture"
                  // onClick={() => {}}
                  // width={80}
                  // height={80}
                />
                <Link href="../../user/Settings">
                  <div>
                    <VscSettingsGear className="text-4xl mt-3" />
                  </div>
                </Link>
                <h1 className="font-bold text-3xl text-center mt-3 mb-3">
                  <p>{userAuth.displayName}</p>
                </h1>
                <div className="absolute top-0 z-1 -right-5 p-2">
                  <Logout />
                </div>
              </div>
              <div className="text-center mb-11">
                <button
                  type="button"
                  onClick={(e) => {
                    setText(e.target.textContent);
                    setActiveBtn('created');
                  }}
                  className={`${
                    activeBtn === 'created'
                      ? activeBtnStyles
                      : notActiveBtnStyles
                  }`}
                >
                  Created
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    setText(e.target.textContent);
                    setActiveBtn('saved');
                  }}
                  className={`${
                    activeBtn === 'saved' ? activeBtnStyles : notActiveBtnStyles
                  }`}
                >
                  Saved
                </button>
              </div>
              {pins?.length ? (
                <div className="mt-7">
                  <MasonryLayout pins={pins} />
                </div>
              ) : (
                <div className="flex justify-center font-bold items-center w-full text-xl mt-2">
                  No images found!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

// add server side props for firebase auth here
