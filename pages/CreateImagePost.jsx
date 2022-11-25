/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { categories } from '../utils/data';
import { client } from './client';
import Spinner from '../components/Spinner';

const CreateImagePost = () => {
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

  const uploadImage = (e) => {
    const { type, name } = e.target.files[0];

    if (
      type === 'image/png' ||
      type === 'image/svg' ||
      type === 'image/jpeg' ||
      type === 'image/jpg' ||
      type === 'image/gif'
    ) {
      setWrongImageType(false);
      setLoading(true);

      client.assets
        .upload('image', e.target.files[0], {
          contentType: type,
          filename: name,
        })
        .then((document) => {
          setImageAsset(document);
          setLoading(false);
        })
        .catch((error) => {
          console.log('Image upload error ', error);
        });
    } else {
      setWrongImageType(true);
    }
  };

  const savePin = () => {
    if (title && about && imageAsset?._id && category) {
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
        router.push('/Feed');
      });
    } else {
      setFields(true);
      console.log('Please fill out all fields');
      setTimeout(() => {
        setFields(false);
      }, 2000);
    }
  };

  return (
    <div className="flex justify-center sm:px-4 p-12">
      <div className="w-full minmd:w-3/5">
        <div>
          <p className="flex text-2xl justify-center items-center font-bold font-poppins mb-3">
            Post your creation!
          </p>
        </div>
        <div>
          <iframe
            className="iframe"
            title="stableDiffusion"
            frameBorder="0"
            width="100%"
            height="640px"
            src="https://inpainter.dailydisco.repl.co/paint?embed=true"
          />
        </div>
        <div className=" flex ml-12 lg:flex-row flex-col justify-center items-center dark:bg-nft-dark bg-white lg:p-5 p-3 lg:w-3/5  w-full">
          <div className="bg-secondaryColor p-3 flex flex-0.7 w-full">
            <div className=" flex justify-center items-center flex-col border-2 border-dotted border-gray-300 p-3 w-full h-420">
              {loading && <Spinner />}
              {wrongImageType && <p>Wrong file type.</p>}
              {!imageAsset ? (
                // eslint-disable-next-line jsx-a11y/label-has-associated-control
                <label>
                  <div className="flex flex-col items-center justify-center h-full">
                    <div className="flex flex-col justify-center items-center">
                      <p className="font-bold text-2xl">
                        <AiOutlineCloudUpload />
                      </p>
                      <p className="text-lg">Click to upload</p>
                    </div>

                    <p className="flex-wrap mt-32 text-gray-400">
                      Recommendation: Use high-quality JPG, JPEG, SVG, or PNG
                      less than 20MB
                    </p>
                  </div>
                  <input
                    type="file"
                    name="upload-image"
                    onChange={uploadImage}
                    className="w-0 h-0"
                  />
                </label>
              ) : (
                <div className="relative h-full">
                  <img
                    src={imageAsset?.url}
                    alt="uploaded-pic"
                    className="h-full w-full"
                  />
                  <button
                    type="button"
                    className="absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
                    onClick={() => setImageAsset(null)}
                  >
                    <MdDelete />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-6 lg:pl-5 mt-5 w-4/5">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="outline-none text-2xl sm:text-2xl font-bold border-b-2 border-gray-200 p-2"
            />
            <input
              type="text"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              placeholder="A description"
              className="outline-none text-base sm:text-md border-b-2 border-gray-200 p-2"
            />
            <div className="flex flex-col">
              <div>
                <p className="mb-2 font-semibold text:lg sm:text-xl">
                  Choose Pin Category
                </p>
                <select
                  onChange={(e) => {
                    setCategory(e.target.value);
                  }}
                  className="outline-none w-5/5 text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
                >
                  <option value="others" className="sm:text-bg bg-white">
                    Select Category
                  </option>
                  {categories.map((item) => (
                    <option
                      className="text-base border-0 outline-none capitalize bg-white text-black "
                      value={item.name}
                    >
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end items-end mt-5 mx-auto">
                <button
                  type="button"
                  onClick={savePin}
                  className="bg-red-500 text-white font-bold p-2 rounded-full w-28 outline-none"
                >
                  Save Pin
                </button>
              </div>
              {fields && (
                <p className="text-red-500 mb-3 text-xl transition-all duration-150 ease-in ">
                  Please add all fields.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateImagePost;
