import { getAuth } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { initFirebase } from '../firebase/firebaseApp';

const logout = () => {
  initFirebase();
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    router.push('/');
  }

  return (
    <button type="button" onClick={() => auth.signOut()}>
      <div className="bg-red-600 mx-8 text-white rounded-md p-1 w-24">
        Sign Out
      </div>
    </button>
  );
};

export default logout;
