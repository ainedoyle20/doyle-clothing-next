import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { useAuthStore } from '@/store/authStore';

import AuthToggles from '@/components/auth/AuthToggles';
import Login from '@/components/auth/Login';
import Register from '@/components/auth/Register';

const Auth = () => {
  const user = useAuthStore(state => state.userProfile);

  const router = useRouter();

  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    if (user) {
      router.push("/");
    }
    
  }, [user, router]);

  return (
    <div className='w-screen h-screen flex flex-col gap-8 items-center justify-center'>
      {/*  Login / Register toggles */}
      <AuthToggles 
        showLogin={showLogin}
        setShowLogin={setShowLogin}
      />

      {/*  Login / Register form */}
      {showLogin ? (
        <Login />
      ) : (
        <Register />
      )}
    </div>
  );
}

export default Auth;