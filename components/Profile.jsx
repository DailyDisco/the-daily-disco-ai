/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-quotes */
import { getAuth } from 'firebase/auth'; // setPersistence
import { useState, useEffect } from 'react'; // useEffect
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';
import { AiOutlineLogout } from 'react-icons/ai';
// import Image from 'next/image';
// import PhotographyCard from './PhotographyCard';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';
import {
  userQuery,
  userCreatedPinsQuery,
  userSavedPinsQuery,
} from '../utils/data';
import { client } from '../pages/client';
import Logout from './Logout';

const profile = () => {
  const randomImage =
    'https://source.unsplash.com/1600x900/?nature,photography,technology';
  const activeBtnStyles =
    'bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none';
  const notActiveBtnStyles =
    'bg-primary mr-4 text-black font-bold p-2 rounded-full w-20 outline-none';
  const [user, setUser] = useState(null);
  const [pins, setPins] = useState(null);
  const [text, setText] = useState('Created');
  const [activeBtn, setActiveBtn] = useState('created');
  const router = useRouter();
  const { userId } = router.query;
  const auth = getAuth();
  const [userAuth] = useAuthState(auth);

  useEffect(() => {
    const query = userQuery(userId);

    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, [userId]);

  useEffect(() => {
    if (text === 'Created') {
      const createdPinsQuery = userCreatedPinsQuery(userId);

      client.fetch(createdPinsQuery).then((data) => {
        setPins(data);
      });
    } else {
      const savedPinsQuery = userSavedPinsQuery(userId);
      client.fetch(savedPinsQuery).then((data) => {
        setPins(data);
      });
    }
  }, [text, userId]);

  if (!userAuth) {
    router.push('/');
    return <div>Please sign in to continue</div>;
  }

  return (
    <div className="relative pb-2 h-full justify-center items-center">
      <div className="flex flex-col pb-5">
        <div className="relative flex flex-col mb-7">
          <div className="flex flex-col justify-center items-center">
            <img
              src={randomImage}
              className="w-full h-370 2xl:5-510 shadow-lg object-cover"
              alt="banner picture"
              // width={1600}
              // height={900}
            />
            <img
              className="rounded-full w-20 -mt-10 shadow-xl object-cover"
              src={userAuth.photoURL}
              alt="user profile picture"
              // width={80}
              // height={80}
            />
            <h1 className="font-bold text-3xl text-center mt-3">
              <p>{userAuth.displayName}</p>
            </h1>
            <div className="absolute top-0 z-1 right-0 p-2">
              {/* {console.log(userAuth.uid, userAuth._id)} */}
              {/* {userAuth.uid === userAuth._id && <Logout />} */}
              {/* <AiOutlineLogout color="red" fontSize={21} /> */}
              <Logout />
            </div>
          </div>
          <div className="text-center mb-7">
            <button
              type="button"
              onClick={(e) => {
                setText(e.target.textContent);
                setActiveBtn('created');
              }}
              className={`${
                activeBtn === 'created' ? activeBtnStyles : notActiveBtnStyles
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
            <div className="px-2">
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
  );
};

export default profile;
