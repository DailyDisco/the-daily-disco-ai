/* eslint-disable react/destructuring-assignment */
/* eslint-disable prefer-destructuring */
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const StableDIffusionDropzone = (props) => {
  const onImageDropped = props.onImageDropped;
  const onDrop = useCallback(
    (acceptedFiles) => {
      onImageDropped(acceptedFiles[0]);
    },
    [onImageDropped]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  if (props.predictions.length) return null;

  if (props.userUploadedImage) return null;
  return (
    <div
      className="absolute z-40 flex w-full h-full text-gray-500 text-sm text-center cursor-pointer select-none"
      {...getRootProps()}
    >
      <div className="m-auto">
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the image here ...</p>
        ) : (
          <div>
            <p>Optional: Drag and drop a starting image here</p>
            <p>
              Click and drag to erase unwanted parts of the image, then change
              the prompt to update the image.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StableDIffusionDropzone;
