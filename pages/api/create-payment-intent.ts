import { NextApiRequest, NextApiResponse } from "next";
import { TCartItem } from "@/project-types";

const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

const calculateOrderAmount = (cartItems: TCartItem[]): number => {
  const amount = cartItems.reduce((acc, cartItem) => (cartItem.count * Number(cartItem.storedProduct.price)) + acc, 0);

  return Math.round(Number(amount.toFixed(2)) * 100);
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { cartItems } = req.body;

  try {

    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(cartItems),
      currency: "eur",
      automatic_payment_methods: {
        enabled: true,
      },
    });
  
    res.send({
      clientSecret: paymentIntent.client_secret,
    });

  } catch (error) {
    console.log("Error creating payment intent: ", error);
  }
};
