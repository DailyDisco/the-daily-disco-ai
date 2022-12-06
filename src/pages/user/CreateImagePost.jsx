/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { categories } from '../../services/sanitySocialServices';
import Spinner from '../../components/Spinner';
import StableDiffusionApp from '../../components/stableDiffusion/StableDiffusionApp';

const CreateImagePost = () => {
  // description of the post
  const [about, setAbout] = useState('');
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState(null);
  const [category, setCategory] = useState(null);

  const router = useRouter();

  const auth = getAuth();
  const [user] = useAuthState(auth);

  return (
    <div className="flex justify-center sm:px-4 p-12">
      <div className="w-full minmd:w-3/5">
        <div>
          <p className="flex text-2xl justify-center items-center font-bold font-poppins mb-3">
            Post your creation!
          </p>
        </div>
        <div>
          <StableDiffusionApp />
        </div>
        {/* <div className=" flex ml-12 lg:flex-row flex-col justify-center items-center dark:bg-nft-dark bg-white lg:p-5 p-3 lg:w-3/5  w-full">
          <div className="flex flex-1 flex-col gap-6 lg:pl-5 mt-5 w-4/5">
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
        </div> */}
      </div>
    </div>
  );
};

export default CreateImagePost;
