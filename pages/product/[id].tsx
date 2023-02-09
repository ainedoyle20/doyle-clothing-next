import React from 'react';

import { TProduct } from '@/project-types';
import { fetchProductDetails } from '@/lib/utils';

import DetailsContainer from '@/components/details/DetailsContainer';

interface IDetailsProps {
  productDetails: TProduct | undefined;
}

const Details = ({ productDetails }: IDetailsProps) => {

  if (!productDetails) {
    return null;
  }

  return (
    <DetailsContainer details={productDetails} />
  )
}

export const getServerSideProps = async ({ params: {id} }:{params: { id: string }}) => {

  const details = await fetchProductDetails(id);

  if (!details) {
    return {
      props: {
        productDetails: undefined,
      }
    }
  }
 

  return {
    props: {
      productDetails: details,
    }
  }
}

export default Details;