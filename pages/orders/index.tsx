import { useState } from 'react';

import { useAuthStore } from '@/store/authStore';

import Order from '@/components/orders/Order';
import SortingOptions from '@/components/orders/SortingOptions';

const Orders = () => {
  const userProfile = useAuthStore(state => state.userProfile);

  const [orderBy, setOrderBy] = useState("Newest");
  const [orders, setOrders] = useState(userProfile?.orders.sort((a, b) => orderBy === "Newest" ? b.sortingNum - a.sortingNum : a.sortingNum - b.sortingNum))

  return (
    <div className='w-screen min-h-screen flex flex-col items-center gap-10 py-16'>
      <span className='text-xl'>My Orders</span>

      <SortingOptions orderBy={orderBy} setOrderBy={setOrderBy} />

      <div className='w-3/4 flex flex-col gap-10'>
        {orders?.map(order => (
          <Order 
            key={order._key}
            order={order}
          />
        ))}
      </div>

    </div>
  );
}

export default Orders;