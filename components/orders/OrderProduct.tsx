import { TCartItem } from '@/project-types';
import Image from 'next/image';

interface IOrderProductProps {
  productCard: TCartItem;
}

const OrderProduct = ({ productCard }: IOrderProductProps) => {
  const { count, size, storedProduct} = productCard;

  return (
    <div className='w-full flex justify-between'>
      <div className='flex gap-8'>
        <Image 
          alt="product image"
          src={storedProduct.image[0].asset.url}
          className="w-[200px] h-auto"
          width={100}
          height={100}
          priority={true}
        />

        <div className='flex flex-col justify-center gap-2'>
          <span>{storedProduct.name}</span>
          <span>Size {size}</span>
          <span>€ {storedProduct.price}</span>
        </div>
      </div>

      <div className='flex flex-col justify-center gap-2 mr-20'>
        <span className='text-2xl font-bold'>x {count}</span>
      </div>
    </div>
  )
}

export default OrderProduct;