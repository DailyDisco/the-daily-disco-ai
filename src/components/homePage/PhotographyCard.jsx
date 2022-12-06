import Image from 'next/legacy/image';
import Link from 'next/link';

import images from '../../../public/assets';

const PhotographyCard = ({ stableDiffusion }) => (
  <div>
    {/* <Link
      href={{ pathname: '/stableDiffusion-details', query: stableDiffusion }}
      passHref
    > */}
    <div className="flex-1 min-w-215 max-w-max xs:max-w-none sm:w-full sm:min-w-155 minmd:min-w-256 minlg:min-w-327 dark:bg-nft-black-3 bg-white rounded-2xl p-4 m-4 minlg:m-8 sm:my-2 sm:mx-2 cursor-pointer shadow-md">
      <div className="relative w-full h-52 sm:h-36 xs:h-56 mind:h-60 minlg:h-300 rounded-2xl overflow-hidden">
        <Image
          src={
            stableDiffusion.image ||
            images[`stableDiffusion${stableDiffusion.i}`]
          }
          layout="fill"
          objectFit="cover"
          alt="landing page image examples."
        />
      </div>
      {/* <div className="mt-3 flex flex-col">
        <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm minlg:text-xl">
          {stableDiffusion.prompt}
        </p>
        <div className="flexBetween mt-3 minlg:mt-3 flex-row xs:flex-col xs:items-start xs:mt-3">
          <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xs minlg:text-lg">
            {stableDiffusion.postedBy}
          </p>
        </div>
      </div> */}
    </div>
    {/* </Link> */}
  </div>
);

export default PhotographyCard;
