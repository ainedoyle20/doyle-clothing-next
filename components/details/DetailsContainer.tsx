import { useState } from "react";
import Image from "next/image";

import { useAuthStore } from "@/store/authStore";
import { TProduct } from "@/project-types";
import { fetchOtherProductColour, incrementExistingProduct, addNewProductToCart } from "@/lib/utils";

import SelectSize from "./SelectSize";
import AddToCartBtn from "./AddToCartBtn";

const colourCodes = {
  black: "#000000",
  blue: "#0000ff",
  white: "#ffffff",
  beige: "#f9f9eb",
  grey: "#808080",
  turquoise: "#40e0d0"
}

type ObjectKey = keyof typeof colourCodes;

interface IDetailsContainerProps {
  details: TProduct;
}

const DetailsContainer = ({ details }: IDetailsContainerProps) => {
  const userProfile = useAuthStore(state => state.userProfile);
  const setUserProfile = useAuthStore(state => state.updateUserProfile);

  const [productDetails, setProductDetails] = useState<TProduct | undefined>(details);
  const [selectedSize, setSelectedSize] = useState("Select Size");
  const [addingProduct, setAddingProduct] = useState(false);


  const handleColourClicked = async (selectedColour: string) => {
    if (!productDetails ) return;

    const otherDetails = await fetchOtherProductColour(productDetails.name, selectedColour);
    setProductDetails(otherDetails);
  }

  const handleAddToCart = async () => {
    if (!productDetails?._id) {
      alert("Something went wrong please try again later.");
      return;
    }

    if (!userProfile || !userProfile?._id) {
      alert("Please log in to add products to your cart.");
      return;
    }

    if (selectedSize === "Select Size") {
      alert("Please choose a size");
      return;
    }

    setAddingProduct(true);

    const existingProduct = userProfile.cartItems.filter(cartItem => cartItem.storedProduct._id === productDetails._id)[0];

    if (existingProduct) {
      if (existingProduct.size === selectedSize) {
        // exact same product and size -> increment cartProduct count
        await incrementExistingProduct(userProfile._id, existingProduct._key, setUserProfile);
      } else {
        await addNewProductToCart(userProfile._id, productDetails._id, selectedSize, setUserProfile);
      }
    } else {
      // Product is not in cart yet -> simply add to cart
      await addNewProductToCart(userProfile._id, productDetails._id, selectedSize, setUserProfile);
    }

    setAddingProduct(false);
  }

  return (
    <div className="w-screen min-h-screen flex">
      <div className="w-[900px] flex flex-col">
        <div className="w-full px-2 grid grid-cols-2 gap-2 pt-20">
          {productDetails ? (
            productDetails.image.slice(0, 2).map((image) => (
              <Image 
                key={image._key}
                alt="product image"
                src={image.asset.url}
                width={100}
                height={100}
                className="h-[600px] w-auto"
                priority={true}
              />
            ))
          ) : 
          null}
        </div>

        <div className="w-full p-3 cursor-default">
          <span>{productDetails?.description}</span>
        </div>

        <div className="w-full px-2 grid grid-cols-2 gap-2 pb-20">
          {productDetails ? (
            productDetails.image.slice(2, 4).map((image) => (
              <Image 
                key={image._key}
                alt="product image"
                src={image.asset.url}
                width={100}
                height={100}
                className="h-[600px] w-auto"
                priority={true}
              />
            ))
          ) : 
          null}
        </div>
      </div>

      <div className="shadow-md w-[450px] h-screen fixed top-0 right-0 pt-28 px-2 flex flex-col gap-5">
        {productDetails ? (
        <>
          <span className="font-black">{productDetails?.name}</span>

          <div className="flex flex-col gap-1 w-full">
            <span>{`${productDetails?.colour[0].toUpperCase()}${productDetails?.colour.slice(1, 10)}`}</span>
            <div className="flex items-center gap-1 w-full">
              {productDetails?.allColours.map(colour => (
                  <span 
                    key={colour}
                    className={`${productDetails?.colour === colour ? "border-[1px] border-black w-4 h-4" : "w-3 h-3"} rounded-full shadow-md flex justify-center items-center`}
                  >
                    <span 
                      style={{
                        width: "0.75rem",
                        height: "0.75rem",
                        borderRadius: "100%",
                        backgroundColor: `${colourCodes[colour as ObjectKey]}`,
                        cursor: "pointer"
                      }}
                      onClick={() => handleColourClicked(colour)}
                    ></span>
                  </span>
                )
              )}
            </div>
          </div>

          <SelectSize 
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
          />

          <AddToCartBtn 
            handleAddToCart={handleAddToCart}
            addingProduct={addingProduct}
          />  
        </>
        ) : (
          null
        )}
      </div>
    </div>
  )
}

export default DetailsContainer;