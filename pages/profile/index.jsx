/* eslint-disable jsx-quotes */
import { getAuth, setPersistence } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import Router, { useRouter } from 'next/router';
// import { AiOutlineLogout } from 'react-icons/ai';
import { setUserId } from 'firebase/analytics';
import { PhotographyCard } from '../../components';
import Image from 'next/image';

const profile = () => {
  const auth = getAuth();
  const randomImage =
    'https://source.unsplash.com/1600x900/?nature,photography,technology';
  const activeBtnStyles =
    'bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none';
  const notActiveBtnStyles =
    'bg-primary mr-4 text-black font-bold p-2 rounded-full w-20 outline-none';
  // const { userId } = useParams();
  const [user, loading] = useAuthState(auth);
  const [text, setText] = useState('Created');
  const [createdImages, setCreatedImages] = useState(null);
  const [activeBtn, setActiveBtn] = useState('created');
  const router = useRouter();

  // useEffect(() => {
  //   const query = userQuery(userId);

  //   client.fetch(query).then((data) => {
  //     setUserId(data[0]);
  //   });
  // }, [userId]);

  // useEffect(() => {
  //   if (text === 'Created') {
  //     const createdImagesQuery = userCreatedImagesQuery(userId);

  //     client.fetch(createdImagesQuery).then((data) => {
  //       setPins(data);
  //     });
  //   } else {
  //     const savedImagesQuery = userSavedImagesQuery(userId);
  //   }
  // }, [text, userId]);

  const logout = () => {
    localStorage.clear();
    auth.signOut();
    Router.push('/');
  };

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (!user) {
  //   router.push('/');
  //   return <div>Please sign in to continue</div>;
  // }

  return (
    <div className="relative pb-2 h-full justify-center items-center">
      <div className="flex flex-col pb-5">
        <div className="relative flex flex-col mb-7">
          <div className="flex flex-col justify-center items-center">
            <img
              src={randomImage}
              className="w-full h-370 2xl:5-510 shadow-lg object-cover"
              alt="banner picture"
            />
            <img
              className="rounded-full w-20 -mt-10 shadow-xl object-cover"
              // src={user.image}
              alt="user profile picture"
            />
            <h1 className="font-bold text-3xl text-center mt-3">
              {/* {user.userName} */}
            </h1>
            <div className="absolute top-0 z-1 right-0 p-2">
              {/* {userId === user._id && <Logout />} */}
            </div>
          </div>
          <div className="text-center mb-7">
            <button
              type="button"
              onClick={() => {
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
              onClick={() => {
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
          {createdImages?.length ? (
            <div className="px-2">
              <PhotographyCard />
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
