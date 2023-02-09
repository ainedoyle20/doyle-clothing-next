import { useRouter } from "next/router";

import { useAuthStore } from "@/store/authStore";
import { removeProductFromCart } from "@/lib/utils";

import CartProduct from "./CartProduct";

interface DropdownProps {
  setShowDropdown(arg: boolean): void;
}

const Dropdown = ({ setShowDropdown }: DropdownProps) => {
  const router = useRouter();

  const userProfile = useAuthStore(state => state.userProfile);
  const setUserProfile = useAuthStore(state => state.updateUserProfile);

  const handleRemoveProductFromCart = (key: string) => {
    if (!userProfile) return;
    
    removeProductFromCart(userProfile?._id, key, setUserProfile);
  }

  return (
    <div 
      className="
      absolute top-[40px] right-0 w-[350px] h-[400px] 
      border-2 border-black bg-[#FAF9F8] z-50 pt-1"
    >
      <div className="w-full h-[85%] overflow-scroll pb-2">
        {userProfile?.cartItems?.length 
        ? <>{userProfile?.cartItems.map((cartProduct, idx) => (
          <CartProduct key={cartProduct._key} cartProduct={cartProduct} handleRemoveCartProduct={handleRemoveProductFromCart} />
        ))}</>
        : <div className="flex justify-center items-center w-full h-full">EMPTY</div>
        }
      </div>

      <button 
        className="w-full h-[15%] flex items-center justify-center text-xl border-t-2 border-black
        bg-[#000000] text-[#ffffff] hover:bg-[#ffffff] hover:text-[#000000]"
        onClick={() => {
          router.push("/checkout");
          setShowDropdown(false);
        }}
      >
        Checkout
      </button>
    </div>
  );
}

export default Dropdown;
