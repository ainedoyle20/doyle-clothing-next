import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { TProduct } from '@/project-types';
import { fetchProductDetails } from '@/lib/utils';

import DetailsContainer from '@/components/details/DetailsContainer';
import Loader from '@/components/loader/Loader';

const Details = () => {
  const router = useRouter();

  const { id } = router.query

  const [productDetails, setProductDetails] = useState<TProduct | undefined>();

  useEffect(() => {
    if (!id) return;

    const getDetails = async () => {
      const details = await fetchProductDetails(typeof id === "string" ? id : id[0]);
      setProductDetails(details);
    }

    getDetails();
  }, [])
  

  if (!productDetails) {
    return (
      <Loader inContainer={false} />
    )
  }

  return (
    <DetailsContainer details={productDetails} />
  )
}

export default Details;