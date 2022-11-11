import { urlFor } from '../client';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const Pin = () => {
  return (
    <div>
      <img className="rounded-lg w-full" alt="user"></img>
    </div>
  );
};

export default Pin;
