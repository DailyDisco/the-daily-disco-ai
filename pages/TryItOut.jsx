/* eslint-disable no-await-in-loop */
import { useState } from 'react';
import { XCircle as StartOverIcon } from 'lucide-react';
import { Footer, StableDiffusionPrompt } from '../components';
import StableDiffusionCanvas from '../components/StableDiffusionCanvas';
import StableDiffusionDropzone from '../components/StableDiffusionDropzone';
import StableDiffusionApp from '../components/StableDiffusionApp';

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
