import { v4 as uuidv4 } from "uuid";
import { client } from "./client";
import { productsQuery, productDetailsQuery, otherColourQuery, userProfileQuery } from "./queries";
import { TCartItem, TUserProfile, TProduct } from "../project-types";

export const fetchProducts = async (gender: string): Promise<TProduct[] | undefined> => {
  const query = productsQuery(gender);

  try {
    const products = await client.fetch(query);
    return products;
  } catch (error) {
    console.log("Error fetching products: ");
  }
}

export const fetchProductDetails = async (id: string): Promise<TProduct | undefined> => {
  const query = productDetailsQuery(id);

  try {
    const details = await client.fetch(query);
    return details[0];
  } catch (error) {
    console.log("Error fetching product details: ");
  }
}

export const fetchOtherProductColour = async (name: string, colour: string): Promise<TProduct | undefined> => {
  const query = otherColourQuery(name, colour);

  try {
    const otherProducts = await client.fetch(query);
    return otherProducts[0];
  } catch (error) {
    console.log("Error fetching other product colour: ");
  }
}

const fetchUserProfile = async (id: string): Promise<TUserProfile | undefined> => {
  const query = userProfileQuery(id);

  try {
    const res = await client.fetch(query);
    return res[0];
  } catch (error) {
    console.log("Error fetching user profile from sanity: ", error);
  }
}

export const createOrFetchUser = async (userId: string, email: string | null, updateUserProfile: any): Promise<void> => {
  const doc = {
    _id: userId,
    _type: "user",
    email: email ? email : "",
    cart: [],
    orders: [],
  }

  try {
    const res = await client.createIfNotExists(doc);
    if (Object.keys(res).length) {
      const profile = await fetchUserProfile(res?._id);
      if (profile) {
        updateUserProfile({ _id: profile._id, cartItems: profile.cartItems, orders: profile.orders });
      }
    }

  } catch (error) {
    console.log("Error fetching or creating user doc in sanity: ");
  }
}

export const removeAllProductsFromCart = async (id: string, cartItems: TCartItem[], updateUserProfile: any): Promise<void> => {
  const keys = cartItems.map(item => item._key);
  try {
    await Promise.all(keys.map(async (key) => await client.patch(id).unset([`cartItems[_key=="${key}"]`]).commit()))

    await createOrFetchUser(id, "", updateUserProfile);
  } catch (error) {
    console.log("Error removing all products from cart: ");
  }
}

export const removeProductFromCart = async (id: string, productKey: string, updateUserProfile:any): Promise<void> => {
  try {
    await client.patch(id).unset([`cartItems[_key=="${productKey}"]`]).commit();

    await createOrFetchUser(id, "", updateUserProfile);
  } catch (error) {
    console.log("Error removing product from cart: ");
  }
}

export const addNewProductToCart = async (id: string, productId: string, productSize: string, updateUserProfile:any): Promise<void> => {
  try {
    await client.patch(id).setIfMissing({ cartItems: [] }).insert("after", "cartItems[-1]", [{
      _key: uuidv4(),
      _type: "productInfoObject",
      count: 1,
      size: productSize,
      sortingNum: Date.now(),
      storedProduct: {
        _type: "reference",
        _ref: productId
      },
    }]).commit();

    await createOrFetchUser(id, "", updateUserProfile);
  } catch (error) {
    console.log("Error removing product from cart: ");
  }
}

export const incrementExistingProduct = async (id: string, cartProductKey: string, updateUserProfile:any): Promise<void> => {
  try {
    await client.patch(id).inc({[`cartItems[_key=="${cartProductKey}"].count`]: 1}).commit();

    await createOrFetchUser(id, "", updateUserProfile);
  } catch (error) {
    console.log("Error incrementing existing product count: ");
  }
}

export const decrementExistingProduct = async (id: string, cartProductKey: string, updateUserProfile:any): Promise<void> => {
  try {
    await client.patch(id).dec({[`cartItems[_key=="${cartProductKey}"].count`]: 1}).commit();

    await createOrFetchUser(id, "", updateUserProfile);
  } catch (error) {
    console.log("Error decrementing existing product count: ");
  }
}

export const addOrder = async (id: string, products: TCartItem[]): Promise<void> => {
  const productsToStore = products.map(product => ({ 
    _key: uuidv4(), 
    _type: "productInfoObject", 
    count: product.count, 
    size: product.size, 
    storedProduct: { 
      _ref: product.storedProduct._id, 
      _type: "reference"
    }
  }));

  try {
    await client.patch(id).setIfMissing({ orders: [] }).insert("after", "orders[-1]", [{
      _key: uuidv4(),
      _type: "order",
      orderDate: new Date().toLocaleDateString('en-gb', { weekday:"long", year:"numeric", month:"long", day:"numeric"}),
      sortingNum: Date.now(),
      products: productsToStore
    }]).commit();
    
  } catch (error) {
    console.log("Error removing product from cart: ");
  }
}