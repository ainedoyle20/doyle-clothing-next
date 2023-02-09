import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { BiShoppingBag, BiUserCircle } from "react-icons/bi";

import { useAuthStore } from "@/store/authStore";
import { logoutUser } from "@/lib/firebase";

import Bow from "../../assets/bow.svg";

import Dropdown from "./Dropdown";

const Header = () => {
  const user = useAuthStore(state => state.userProfile);
  const setUserProfile = useAuthStore(state => state.updateUserProfile);

  const router = useRouter();

  const [showDropdown, setShowDropdown] = useState(false);
  const [showUserOptions, setShowUserOptions] = useState(false);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    if (!user || !user?._id) {
      setCartTotal(0);
      return;
    }

    
    const counts = user.cartItems.map(cartItem => cartItem.count);
    // console.log("counts: ", counts);
    const total = counts.reduce((acc, count) => count + acc ,0);
    setCartTotal(total);
  }, [user])

  const handleLogout = async () => {
    await logoutUser();
    setUserProfile(null);
    setShowUserOptions(false);
  }

  return (
    <>
      <div 
        className="
        absolute top-0 left-0 border-b-2 border-black w-full
         pl-2
        flex justify-between
        z-50
        bg-[#FAF9F8]
        "
      >
        <Link href="/" className="flex items-center">
          <Image alt="" src={Bow} width={40} height={40} />
        </Link>

        <div className="flex gap-3 items-center pr-3">
          {/*  User Icon  */}
          <span 
            onClick={() => {
              setShowDropdown(false);
              setShowUserOptions(prev => !prev);
            }}
            className="h-full w-full text-[30px] flex items-center justify-center cursor-pointer pt-1"
          >
            <BiUserCircle />
          </span> 

          {/*  Shopping Cart Icon  */}
          <div 
            className="relative cursor-pointer flex justify-center items-center"
            onClick={() => {
              setShowUserOptions(false);
              setShowDropdown(prev => !prev);
            }}
          >
            <span className="h-full w-full text-[30px]">
              <BiShoppingBag />
            </span>
            
            <span 
              className="text-xs absolute top-1/2 left-1/2
                -translate-y-[25%] -translate-x-1/2
              "
            >
              {cartTotal}
            </span>
          </div>
        </div>
      </div>

      {showDropdown ? (
        <Dropdown setShowDropdown={setShowDropdown} />
      ) : 
        null
      }

      {showUserOptions ? (
        <div className="absolute top-[40px] right-0 w-[100px] h-auto border-2 border-black bg-[#FAF9F8] z-50 py-2 flex flex-col gap-3">
          {user ? (
            <>
              <span 
                className="cursor-pointer w-full px-5 hover:font-bold" 
                onClick={() => {
                  setShowUserOptions(false);
                  router.push("/orders");
                }}
              >
                Orders
              </span>
              <span 
                className="cursor-pointer w-full px-5 hover:font-bold"
                onClick={handleLogout}
              >
                logout
              </span>
            </>
          ) : (
            <span className="cursor-pointer w-full px-5 hover:font-bold"
              onClick={() => {
                router.push("/auth");
                setShowUserOptions(false);
              }}
            >
              login
            </span>
          )}
        </div>
      ) : 
        null
      }
    </>
  );
}

export default Header;