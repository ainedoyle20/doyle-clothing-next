export type TStoredProduct = {
  _id: string;
  colour: string;
  name: string;
  price: string;
  image: {
    _key: string;
    asset: {
      url: string;
    };
  }[];
}

export type TCartItem = {
  _key: string;
  count: number;
  size: string;
  sortingNum: number;
  storedProduct: TStoredProduct;
}

export type TOrder = {
  _key: string;
  orderDate: string;
  sortingNum: number;
  totalCost: number;
  products: TCartItem[];
}

export type TUserProfile = {
  _id: string;
  cartItems: TCartItem[];
  orders: TOrder[];
}

export type TProduct = {
  _id: string;
  name: string;
  price: string;
  sex: string;
  description: string;
  category: string;
  subCategory: string;
  filter: string;
  colour: string;
  allColours: string[];
  image: { _key: string; asset: { url: string; }}[];
}

export type TAuthInfo = {
  email: string;
  password: string;
}

export type TFirebaseUser = {
  userId: string;
  email: string | null;
}