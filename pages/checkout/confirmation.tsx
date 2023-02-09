import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Oval } from 'react-loader-spinner';

import { useAuthStore } from '@/store/authStore';
import { addOrder, removeAllProductsFromCart } from '../../lib/utils';
import { TOrder } from '@/project-types';

const Confirmation = () => {
  const userProfile = useAuthStore(state => state.userProfile);
  const setUserProfile = useAuthStore(state => state.updateUserProfile);

  const router = useRouter();

  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState<TOrder>();

  useEffect(() => {
    if (!userProfile) {
      router.push("/");
    }
  }, [userProfile, router]);

  useEffect(() => {
    if (!userProfile) {
      setTotal(0);
      return;
    }

    if (!order) return;

    const cost = order.products.reduce((acc, product) => (product.count * Number(product.storedProduct.price)) + acc , 0)

    setTotal(Number(cost.toFixed(2)));
  }, [userProfile, order]);

  useEffect(() => {
    if (!userProfile || !userProfile.cartItems.length) {
      setLoading(false);
      return;
    };

    // create new order object in sanity from userProfile.cartItems
    const addingOrder = async () => {
      await addOrder(userProfile._id, userProfile.cartItems);
      await removeAllProductsFromCart(userProfile._id, userProfile.cartItems, setUserProfile);
      setLoading(false);
    }

    addingOrder();

  }, []);

  useEffect(() => {
    if (!userProfile || loading) return;

    const todaysOrder = userProfile.orders[userProfile.orders.length -1];

    if (todaysOrder) setOrder(todaysOrder);
  }, [loading, userProfile, setOrder]);

  return (
    <div className='w-screen min-h-screen flex flex-col items-center pt-20'>
      <span className='text-xl mb-5'>Order Summary</span>

      {loading || !order ? (
        <Oval
          height={80}
          width={80}
          color="#000000"
          visible={true}
          ariaLabel='oval-loading'
          secondaryColor="#000000"
          strokeWidth={8}
          strokeWidthSecondary={6}
        />
      ) : (
        order.products.map(product => (
          <div key={product._key} className="w-1/2 flex justify-between cursor-default mb-5">
            <div className='flex gap-8'>
              <Image
                alt="product image"
                src={product.storedProduct.image[0].asset.url}
                className="h-[200px] w-auto"
                width={100}
                height={100}
                priority={true}
              />

              <div className='flex flex-col justify-center gap-2'>
                <span>{product.storedProduct.name}</span>
                <span>Size {product.size}</span>
                <span>€ {product.storedProduct.price}</span>
              </div>
            </div>

            <div className='flex flex-col justify-center items-center mr-20'>

              <span className='text-xl font-bold cursor-default'>
                x {product.count}
              </span>
            </div>

          </div>
        ))
      )}

      <span className='text-2xl cursor-default'>Total: €{total}</span>

      <span 
        className='text-lg cursor-pointer mt-12 border-2 border-black px-2 bg-[#000000] text-[#ffffff] hover:bg-[#ffffff] hover:text-[#000000]' 
      
        onClick={() => router.push("/")}
      >
        Continue Shopping
      </span>
    </div>
  );
}

export default Confirmation;