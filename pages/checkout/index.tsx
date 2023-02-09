import { useEffect } from "react";
import { useRouter } from 'next/router';

import { useAuthStore } from '@/store/authStore';

import CheckoutContainer from "@/components/checkout/CheckoutContainer";

const Checkout = () => {
  const userProfile = useAuthStore(state => state.userProfile);

  const router = useRouter();

  useEffect(() => {
    if (!userProfile) {
      router.push("/");
      return;
    }

  }, [userProfile])

  if (!userProfile) {
    return null;
  }

  return (
    <div className='w-screen min-h-screen flex flex-col items-center mt-14 pb-10'>
      <span className='text-xl'>Checkout</span>

      <CheckoutContainer userProfile={userProfile} />
    </div>
  )
}

export default Checkout;