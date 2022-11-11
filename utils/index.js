import axios from 'axios';
import jwt_decode from 'jwt-decode';

export const createOrGetUser = async (response) => {
  const decoded = jwt_decode(response.credential);
  console.log(decoded);

  const { name, picture, sub } = decoded;

  const user = {
    _id: sub,
    _type: 'user',
    userName: name,
    image: picture,
  };

  console.log(decoded);

  await axios.post(`http://localhost:3002/api/auth`, user);
};
