import { useRouter } from 'next/router';
import Image from 'next/image';

import { TProduct } from '@/project-types';

const colourCodes = {
  black: "#000000",
  blue: "#0000ff",
  white: "#ffffff",
  beige: "#f9f9eb",
  grey: "#808080",
  turquoise: "#40e0d0"
}

type ObjectKey = keyof typeof colourCodes;

interface HomeProductProps {
  product: TProduct;
}

const HomeProduct = ({ product }: HomeProductProps) => {
  const router = useRouter();
  
  return (
    <div 
      className='flex flex-col justify-between w-[250px] h-[460px] mb-2 z-30'
    >
      <Image 
        alt="product image" 
        src={product?.image[0]?.asset?.url ? product.image[0].asset.url : ""} 
        width={100}
        height={100}
        className="w-full h-4/5 cursor-pointer" 
        onClick={() => router.push(`/product/${product._id}`)} 
        priority={true}
      />
      <div className='w-full h-1/5 flex flex-col pl-2 cursor-default'>
        <span className='text-sm'>{product.name}</span>
        <span className='text-xs'>€{product.price}</span>
        <div className='flex items-center gap-1 w-full'>
          {product.allColours.map(colour => (
              <span 
                key={colour}
                className={`${product.colour === colour ? "border-[1px] border-black w-4 h-4" : "w-3 h-3"} rounded-full shadow-md flex justify-center items-center`}
              >
                <span 
                  style={{
                    width: "0.75rem",
                    height: "0.75rem",
                    borderRadius: "100%",
                    backgroundColor: `${colourCodes[colour as ObjectKey]}`
                  }}
                ></span>
              </span>
            )
          )}
        </div>
      </div>
    </div>
  )
}

export default HomeProduct;
