/* eslint-disable no-await-in-loop */
import { useState } from 'react';
import { getAuth } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';

import { AiOutlineCloudUpload } from 'react-icons/ai';

import { categories } from '../../services/sanitySocialServices';
import { client } from '../../pages/client';

const StableDiffusionPost = ({ predictions }) => {
  // title of the post
  const [title, setTitle] = useState('');
  // description of the post
  const [about, setAbout] = useState('');
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState(null);
  const [category, setCategory] = useState(null);
  const [imageAsset, setImageAsset] = useState(null);
  // this is an error for the image
  const [wrongImageType, setWrongImageType] = useState(false);

  const router = useRouter();

  const auth = getAuth();
  const [user] = useAuthState(auth);

  const savePin = () => {
    setTimeout(() => {}, 3000);
    console.log('starting savePin');
    // && about
    // && category
    if (title && imageAsset?._id) {
      const doc = {
        _type: 'pin',
        title,
        about,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: imageAsset?._id,
          },
        },
        userId: user.uid,
        postedBy: {
          _type: 'postedBy',
          _ref: user.uid,
        },
        category,
      };
      client.create(doc).then(() => {
        console.log('Document created', doc);
        router.push('/user/Feed');
      });
    } else {
      setFields(true);
      console.log('Please fill out all fields');
      setTimeout(() => {
        setFields(false);
      }, 2000);
    }
  };

  const uploadImage = async (e) => {
    // const { type, name } = e.target.files[0];
    console.log('image url', predictions[0].lastImage);
    const response = await fetch(predictions[0].lastImage);
    const blob = await response.blob();
    const file = new File([blob], 'image.png', { type: 'image/png' });
    console.log('file', file);
    console.log('title', predictions[0].input.prompt);
    console.log('looking for type', predictions[0]);
    const type = 'image/png';
    if (
      predictions
      //   type === 'image/png' ||
      //   type === 'image/svg' ||
      //   type === 'image/jpeg' ||
      //   type === 'image/jpg' ||
      //   type === 'image/gif'
    ) {
      setWrongImageType(false);
      setLoading(true);
      setTitle(predictions[0].input.prompt);
      console.log('post prediction');
      client.assets
        // .upload('image', e.target.files[0], {
        .upload('image', file, {
          contentType: type,
          filename: predictions[0].input.prompt,
        })
        .then((document) => {
          setImageAsset(document);
          setLoading(false);
          savePin();
        })
        // eslint-disable-next-line no-shadow
        .catch((error) => {
          console.log('Image upload error ', error);
        });
    } else {
      setWrongImageType(true);
    }
  };
  return (
    <div>
      {/* this next block is to upload a picture if the user is logged in */}
      {user ? (
        <div className="mt-7">
          <label>
            <div className="flex flex-col items-center justify-center h-full">
              <button
                type="button"
                onClick={() => {
                  uploadImage();
                }}
              >
                <div className="flex flex-col justify-center items-center">
                  <p className="font-bold text-2xl">
                    <AiOutlineCloudUpload />
                  </p>
                  <p className="text-lg">Click to upload</p>
                </div>
              </button>
            </div>
          </label>
        </div>
      ) : null}
    </div>
  );
};

export default StableDiffusionPost;
