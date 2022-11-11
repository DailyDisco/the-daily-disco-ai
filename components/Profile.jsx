/* eslint-disable jsx-quotes */
import { getAuth, setPersistence, onAuthStateChanged } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';
// import { AiOutlineLogout } from 'react-icons/ai';
import { PhotographyCard } from '.';

const profile = () => {
  const auth = getAuth();
  const randomImage =
    'https://source.unsplash.com/1600x900/?nature,photography,technology';
  const activeBtnStyles =
    'bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none';
  const notActiveBtnStyles =
    'bg-primary mr-4 text-black font-bold p-2 rounded-full w-20 outline-none';
  const [createdImages, setCreatedImages] = useState(null);
  const [activeBtn, setActiveBtn] = useState('created');
  const [displayName, setDisplayName] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [text, setText] = useState('Created');
  const [user, loading] = useAuthState(auth);
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

  if (!user) {
    router.push('/');
    return <div>Please sign in to continue</div>;
  }

  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log(user);
      const uid = user.uid;
      console.log(uid); // "G8ckH0c..."
      const displayName = user.displayName;
      setDisplayName(displayName);
      console.log(displayName); // "Ada Lovelace"
      const email = user.email;
      console.log(email); // example@gmail.com
      const photoURL = user.photoURL;
      setProfilePicture(photoURL);
      console.log(photoURL); // "https://lh3.googleusercontent.com/a-/AOh14Gg..."
      const emailVerified = user.emailVerified;
      console.log(emailVerified); // true or false
      const phoneNumber = user.phoneNumber;
      console.log(phoneNumber); // null || "+1 555-555-5555"
      const isAnonymous = user.isAnonymous;
      console.log(isAnonymous); // false || true
      const tenantId = user.tenantId;
      console.log(tenantId); // null || "TENANT_PROJECT_ID"
      const providerData = user.providerData;
      console.log(providerData); // Array of user info from other providers linked to the user as an array object
      const metadata = user.metadata;
      console.log(metadata); // Object with creationTime and lastSignInTime
      const refreshToken = user.refreshToken;
      console.log(refreshToken); // this is for the user to re-authenticate without signing in again
      const accessToken = user.accessToken;
      console.log(accessToken); // this is for the user to re-authenticate with a third party
      return photoURL;
    } else {
      console.log('user is signed out');
    }
  });

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
              src={profilePicture}
              alt="user profile picture"
            />
            <h1 className="font-bold text-3xl text-center mt-3">
              <p>{displayName}</p>
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
