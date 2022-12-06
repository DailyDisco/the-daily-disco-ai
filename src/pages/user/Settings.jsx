import React, { useState } from 'react';
import firebase from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { storage } from '../../firebase/firebaseApp';

const Settings = () => {
  const [photoUrl, setPhotoUrl] = useState(null);
  const [username, setUsername] = useState(null);

  const auth = getAuth();
  const [user] = useAuthState(auth);

  // Update the photo URL state variable when the profile picture is changed
  // const handleProfilePictureChange = (event) => {};

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleUpdateClick = () => {
    if (!user) {
      // The user is not signed in, so we can't update their profile
      return;
    }

    // First, we will update the user's display name
    updateProfile(auth.currentUser, {
      displayName: username,
      // photoURL: photoUrl,
    }).then(() => {
      console.log('Successfully updated user display name');
    });
  };

  return (
    <div className="flex justify-center sm:px-4 p-12 minmd:mx-auto mx-auto">
      <div className="w-full minmd:w-3/5">
        <div className="flex justify-center items-center flex-col">
          {/* <div className="mb-7">
            <label htmlFor="profile-picture-input">
              Profile Picture:{' '}
              <input
                type="file"
                id="profile-picture-input"
                onChange={handleProfilePictureChange}
              />
            </label>
          </div> */}
          <div className="mb-7">
            <label htmlFor="username-input" className="mx-auto">
              <div className="items-center text-center mb-7">
                Change your username here.
              </div>
              <input
                type="text"
                placeholder="Type your new name here"
                id="username-input"
                onChange={handleUsernameChange}
              />
            </label>
          </div>
          <button
            className="bg-pink-400 opacity-80 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outlined-none"
            type="button"
            onClick={handleUpdateClick}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
