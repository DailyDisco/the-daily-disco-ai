import * as Loader from 'react-loader-spinner';
import { useState, useEffect } from 'react';

const Spinner = ({ message }) => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full mt-11">
      <Loader.TailSpin message="This is loading..." />
      <p className="text-lg text-center px-2 mt-3">{message}</p>
    </div>
  );
};

export default Spinner;
