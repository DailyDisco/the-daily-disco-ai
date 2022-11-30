import { getAuth, signOut } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { AiOutlineLogout } from 'react-icons/ai';

const logout = () => {
  const auth = getAuth();
  const [user] = useAuthState(auth);
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() =>
        signOut(auth)
          .then(() => {
            console.log('signed out');
            console.log('clearing local storage');
            localStorage.clear();
            console.log('local storage cleared');
            console.log('redirecting logged out user back to signed out home');
            router.push('/');
          })
          .catch((error) => {
            console.log('sign out error', error);
          })
      }
    >
      {/* <div className="bg-red-600 mx-8 text-white rounded-md p-1 w-24">
        Sign Out
      </div> */}
      <div className="flex justify-center items-center bg-white p-2 rounded-full cursor-pointer outline-none shadow-md mr-7">
        <AiOutlineLogout className="mr-3" color="red" fontSize={21} />
        <div className="text-black dark:text-black mr-3">Logout</div>
      </div>
    </button>
  );
};

export default logout;
