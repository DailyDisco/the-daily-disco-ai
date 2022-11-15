// import { useRouter } from 'next/router';
import { initFirebase } from '../firebase/firebaseApp';

const Button = ({ btnName, classStyles, handleClick }) => {
  return (
    <button
      type="button"
      className={`nft-gradient text-sm minlg:text-lg py-2 px-6 minlg:px-8 font-poppins font-semibold text-white ${classStyles}`}
      onClick={handleClick}
      // here is where you we give our button functionality
    >
      {btnName}
      {/* using this we can change the btnName based off certain pages or criteria such as being signed in */}
    </button>
  );
};

export default Button;
