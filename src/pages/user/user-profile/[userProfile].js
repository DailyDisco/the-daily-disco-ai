/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import MasonryLayout from '../../../components/socialMedia/ImageLayout';
import {
  userCreatedPinsQuery,
  userQuery,
  userSavedPinsQuery,
} from '../../../services/sanitySocialServices';
import { client } from '../../client';

const usersProfile = () => {
  const randomImage =
    'https://source.unsplash.com/1600x900/?nature,photography,technology';

  const activeBtnStyles =
    'bg-pink-500 text-white font-bold p-2 rounded-full w-20 outline-none';

  const notActiveBtnStyles =
    'bg-primary mr-4 text-gray-500 font-bold p-2 rounded-full w-20 outline-none';

  const [activeBtn, setActiveBtn] = useState('created');
  const [user, setUser] = useState(null);
  const [pins, setPins] = useState(null);
  const [text, setText] = useState('Created');
  const [name, setName] = useState('');
  const [userImage, setUserImage] = useState(null);

  const router = useRouter();
  const { userProfile } = router.query;

  useEffect(() => {
    const query = userQuery(userProfile);
    client.fetch(query).then((data) => {
      setUser(data[0]);
      // console.log('data 0', data[0].userName);
      setName(data[0].userName);
      setUserImage(data[0].image);
    });
  }, [userProfile]);

  // console.log('user', user);

  useEffect(() => {
    if (text === 'Created') {
      const createdPinsQuery = userCreatedPinsQuery(userProfile);
      client.fetch(createdPinsQuery).then((data) => {
        setPins(data);
      });
    } else {
      const savedPinsQuery = userSavedPinsQuery(userProfile);
      client.fetch(savedPinsQuery).then((data) => {
        setPins(data);
      });
    }
  }, [text, userProfile]);

  // console.log('set pins', pins);

  return (
    <div className="flex justify-center sm:px-4 p-12">
      <div className="w-full minmd:w-4/5">
        <div className="relative pb-2 h-full justify-center items-center">
          <div className="flex flex-col pb-5">
            <div className="relative flex flex-col mb-7">
              <div className="flex flex-col justify-center items-center">
                <img
                  src={randomImage}
                  className="w-full h-370 2xl:5-510 shadow-lg object-cover"
                  alt="random banner picture"
                  // width={1600}
                  // height={900}
                />
                <img
                  className="rounded-full w-20 -mt-10 shadow-xl object-cover"
                  src={userImage}
                  alt="user profile picture"
                  // width={80}
                  // height={80}
                />
                <h1 className="font-bold text-3xl text-center mt-3">
                  {/* <p>{name.slice(0, 5)}</p> */}
                </h1>
              </div>
              <div className="text-center mb-7">
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
      </div>
    </div>
  );
};

export default usersProfile;

export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  };
}
