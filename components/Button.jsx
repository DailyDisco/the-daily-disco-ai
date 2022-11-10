import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  // signOut,
} from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';
import { initFirebase } from '../firebase/firebaseApp';

const Button = ({ btnName, classStyles, handleClick }) => {
  initFirebase();
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  if (loading) {
    return <div>Loading...</div>;
  }

  const signIn = async () => {
    const result = signInWithPopup(auth, provider);
    console.log(result.user);
  };

  return (
    <button
      type="button"
      className={`nft-gradient text-sm minlg:text-lg py-2 px-6 minlg:px-8 font-poppins font-semibold text-white ${classStyles}`}
      onClick={handleClick || signIn}
      // here is where you we give our button functionality
    >
      {btnName}
      {/* using this we can change the btnName based off certain pages or criteria such as being signed in */}
    </button>
  );
};

export default Button;
