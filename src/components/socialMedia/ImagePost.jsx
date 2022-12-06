/* eslint-disable prettier/prettier */
/* eslint-disable @next/next/no-img-element */
// Pin = Image
// you can save, download, go to url of image
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
// import Image from 'next/image';
import { MdDownloadForOffline } from 'react-icons/md';
import { AiTwotoneDelete } from 'react-icons/ai';
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs';
// uuidv4 is a utility function that comes with sanity that lets us look for the url of the image
import { v4 as uuidv4 } from 'uuid';
// url for is a utility function that comes with sanity that lets us look for th url of the image
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';
import { client, urlFor } from '../../pages/client';

const Pin = ({ pin: { postedBy, image, _id, destination, save } }) => {
  // states that activate when you hover over the image
  const [postHovered, setPostHovered] = useState(false);
  // states that activate when you save a post
  const [savingPost, setSavingPost] = useState(false);

  const router = useRouter();

  // this gives us the current user using a util function so that we don't have to repeat code
  const auth = getAuth();
  const [user] = useAuthState(auth);

  // console.log(_id);

  // if the user has already saved the post it will be filtered out of the array (feed)
  // the !! will help return boolean values so that it doesn't return undefined
  // eslint-disable-next-line no-unsafe-optional-chaining
  // const alreadySaved = !!save?.filter((item) => item.postedBy._id === user.uid)
  //   ?.length;

  // this is for users to save their favorite posts
  // const savePin = (id) => {
  //   if (!alreadySaved) {
  //     setSavingPost(true);
  //     client
  //       .patch(id)
  //       // patch the post with an id and add the user to the save array
  //       .setIfMissing({ save: [] })
  //       // insert a document into the array
  //       .insert('after', 'save[-1]', [
  //         {
  //           // this will generate a unique id for the user
  //           _key: uuidv4(),
  //           userId: user.uid,
  //           postedBy: {
  //             _type: 'reference',
  //             _ref: user.uid,
  //           },
  //         },
  //       ])
  //       .commit()
  //       // do whatever else you want to do after the post has been saved
  //       .then(() => {
  //         window.location.reload();
  //         setSavingPost(false);
  //       });
  //   }
  // };

  const deletePin = (id) => {
    client.delete(id).then(() => {
      window.location.reload();
    });
  };

  return (
    <div className="m-2">
      <div
        // this is what happens when you hover over a posted image
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        // this click handler will take you to the post page
        onClick={() => router.push(`/user/pin-detail/${_id}`)}
        className="relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
      >
        <img
          className="rounded-lg w-full"
          // width={250}
          // height={250}
          alt="user-post"
          src={urlFor(image).width(250).url()}
        />
        {postHovered && (
          <div
            className="absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50"
            style={{ height: '100%' }}
          >
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <a
                  href={`${image?.asset?.url}?dl=`}
                  download
                  // this stops everything else from happening so that we can simply download the image
                  onClick={(e) => e.stopPropagation()}
                  className="dark:bg-black bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none"
                >
                  <MdDownloadForOffline />
                </a>
              </div>
              {/* if the picture is already save */}
              {/* {alreadySaved ? (
                <button
                  type="button"
                  className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outlined-none"
                >
                  Saved
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    savePin(_id);
                  }}
                  type="button"
                  className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outlined-none"
                >
                  {savingPost ? 'Saving...' : 'Save'}
                </button>
              )} */}
            </div>
            <div className="flex justify-between items-center gap-2 w-full">
              {/* the next block is for deleting the pictures */}
              {postedBy?._id === user.uid && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    deletePin(_id);
                  }}
                  className="dark:bg-black bg-white p-2 opacity-70 hover:opacity-100 font-bold text-dark text-base rounded-3xl hover:shadow-md outlined-none"
                >
                  <AiTwotoneDelete />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="flex mt-3 mb-3">
        <Link
          href={`/user/user-profile/${postedBy?._id}`}
          className="flex gap-2 mt-2 items-center"
          passHref
        >
          <p className="font-semibold capitalize mr-3">Posted By:</p>
          <img
            className="w-8 h-8 rounded-full object-cover"
            src={postedBy?.image}
            alt="user-profile"
          />
          {/* <p className="font-semibold capitalize">
        {postedBy?.userName.slice(0, 5)}
      </p> */}
        </Link>
      </div>
    </div>
  );
};

export default Pin;
