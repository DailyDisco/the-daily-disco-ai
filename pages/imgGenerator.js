/* eslint-disable jsx-quotes */
import React from 'react';

const imgGenerator = () => {
  const car = null;
  console.log(car);

  return (
    <div>
      <iframe
        className='iframe'
        title='stableDiffusion'
        frameBorder='0'
        width='100%'
        height='600px'
        src='https://inpainter.dailydisco.repl.co/paint?embed=true'
      />
    </div>
  );
};

export default imgGenerator;
