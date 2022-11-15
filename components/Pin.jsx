// Pin = Image
// you can save, download, go to url of image
import Image from 'next/image';
// url for is a utility function that comes with sanity that lets us look for th url of the image
import { urlFor } from '../pages/client';

const Pin = ({ pin: { postedBy, image, _id, destination } }) => {
  return (
    <div>
      <img
        // width={250}
        // height={250}
        className="rounded-lg w-full"
        alt="user-post"
        src={urlFor(image).width(250).url()}
      />
    </div>
  );
};

export default Pin;
