import { useState } from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { client } from '../pages/client';
import Spinner from './Spinner';
import { categories } from '../utils/data';

const CreateImagePost = ({ user }) => {
  // title of the post
  const [title, setTitle] = useState('');
  // description of the post
  const [about, setAbout] = useState('');
  // url of the image
  const [destination, setDestination] = useState('');
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState(null);
  const [category, setCategory] = useState(null);
  const [imageAsset, setImageAsset] = useState(null);
  // this is an error for the image
  const [wrongImageType, setWrongImageType] = useState(false);

  const router = useRouter();

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

      client.assets.upload('image', e.target.files[0], {
        contentType: type,
        filename: name,
      }).then((document) => {
        setImageAsset(document) setLoading(false);
    }).catch((error) => {
        console.log('Image upload error ', error);
    });
 } else {
      setWrongImageType(true);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-5 lg:h-4/5">
      {fields && (
        <p className="text-red-500 mb-5 text-xl transition-all duration-150 ease-in">
          Please fill in all the fields
        </p>
      )}
      <div className="flex lg:flex-row flex-col justify-center items-center bg-white lg:p-5 p-3 lg:w-4/5 w-full">
        <div className="bg-secondaryColor p-3 flex flex-0.7 w-full">
          <div className="flex justify-center items-center flex-col border-2 border-dotted border-gray-300 p-3 w-full h-420">
            {loading && <Spinner />}
            {wrongImageType && <p>Wrong image type</p>}
            {!imageAsset ? (
              <label>
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="flex flex-col justify-center items-center">
                    <p className="font-bold text-2xl">
                      <AiOutlineCloudUpload />
                    </p>
                    <p className="text-lg">Click to upload</p>
                  </div>
                  <p className="mt-32 text-gray-400">
                    Use high-quality JPG, SVG, PNG, GIF
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
              <p>Something else</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateImagePost;
