/* eslint-disable no-await-in-loop */
import { useState } from 'react';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import {
  Download as DownloadIcon,
  XCircle as StartOverIcon,
} from 'lucide-react';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import StableDiffusionCanvas from './StableDiffusionCanvas';
import StableDiffusionDropzone from './StableDiffusionDropzone';
import StableDiffusionPrompt from './StableDiffusionPrompt';
import StableDiffusionPost from './StableDiffusionPost';

// eslint-disable-next-line no-promise-executor-return
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function readAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onerror = reject;
    fr.onload = () => {
      resolve(fr.result);
    };
    fr.readAsDataURL(file);
  });
}

const StableDiffusionApp = () => {
  const [predictions, setPredictions] = useState([]);
  const [error, setError] = useState(null);
  const [maskImage, setMaskImage] = useState(null);
  const [userUploadedImage, setUserUploadedImage] = useState(null);

  const auth = getAuth();
  const [user] = useAuthState(auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('starting handleSubmit');

    const prevPrediction = predictions[predictions.length - 1];
    const prevPredictionOutput = prevPrediction?.output
      ? prevPrediction.output[prevPrediction.output.length - 1]
      : null;

    const body = {
      prompt: e.target.prompt.value,
      init_image: userUploadedImage
        ? await readAsDataURL(userUploadedImage)
        : // only use previous prediction as init image if there's a mask
        maskImage
        ? prevPredictionOutput
        : null,
      mask: maskImage,
    };
    // console.log('body', body);
    const response = await fetch('/api/predictions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    let prediction = await response.json();

    if (response.status !== 201) {
      setError(prediction.detail);
      return;
    }
    setPredictions(predictions.concat([prediction]));
    console.log(predictions);
    while (
      prediction.status !== 'succeeded' &&
      prediction.status !== 'failed'
    ) {
      await sleep(1000);
      // eslint-disable-next-line no-shadow, prefer-template
      const response = await fetch('/api/predictions/' + prediction.id);
      prediction = await response.json();
      if (response.status !== 200) {
        setError(prediction.detail);
        return;
      }
      setPredictions(predictions.concat([prediction]));
      if (prediction.status === 'succeeded') {
        setUserUploadedImage(null);
      }
    }
  };

  const startOver = async (e) => {
    e.preventDefault();
    setPredictions([]);
    setError(null);
    setMaskImage(null);
    setUserUploadedImage(null);
  };

  return (
    <div>
      <div>
        <div className="flex justify-center sm:px-4 p-12">
          <div className="w-full minmd:w-4/5">
            <div>
              {error && <div>{error}</div>}
              <div className="border-hairline max-w-[512px] mx-auto relative">
                <StableDiffusionDropzone
                  onImageDropped={setUserUploadedImage}
                  predictions={predictions}
                  userUploadedImage={userUploadedImage}
                />
                <div className="bg-gray-50 relative max-h-[512px] w-full flex items-stretch">
                  <StableDiffusionCanvas
                    predictions={predictions}
                    userUploadedImage={userUploadedImage}
                    onDraw={setMaskImage}
                  />
                </div>
              </div>
              <div className="max-w-[512px] mx-auto">
                <StableDiffusionPrompt onSubmit={handleSubmit} />

                <div className="text-center">
                  {((predictions.length > 0 &&
                    predictions[predictions.length - 1].output) ||
                    maskImage ||
                    userUploadedImage) && (
                    // eslint-disable-next-line react/button-has-type
                    <button
                      className="text-sm text-gray-500 rounded-md py-2 mx-3"
                      onClick={startOver}
                    >
                      <StartOverIcon className="inline relative mr-1" />
                      Start over
                    </button>
                  )}
                  {/* <Download predictions={predictions} /> */}
                </div>
              </div>
              {/* this next block is to upload a picture if the user is logged in */}
              {user ? <StableDiffusionPost predictions={predictions} /> : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StableDiffusionApp;
