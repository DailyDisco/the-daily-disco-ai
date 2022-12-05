/* eslint-disable no-await-in-loop */
import { useState } from 'react';
import { XCircle as StartOverIcon } from 'lucide-react';
import { Footer, StableDiffusionPrompt } from '../components';
import StableDiffusionCanvas from '../components/StableDiffusionCanvas';
import StableDiffusionDropzone from '../components/StableDiffusionDropzone';
import StableDiffusionApp from '../components/StableDiffusionApp';

// eslint-disable-next-line no-promise-executor-return
// const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// function readAsDataURL(file) {
//   return new Promise((resolve, reject) => {
//     const fr = new FileReader();
//     fr.onerror = reject;
//     fr.onload = () => {
//       resolve(fr.result);
//     };
//     fr.readAsDataURL(file);
//   });
// }

const imgGenerator = () => {
  return (
    <div>
      <div className="flex justify-center sm:px-4 p-12">
        <div className="w-full minmd:w-4/5">
          <StableDiffusionApp />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default imgGenerator;
