import '@/styles/globals.css'
import type { AppProps } from 'next/app';
import { useState, useEffect } from "react";

import Header from '@/components/header/Header';

export default function App({ Component, pageProps }: AppProps) {
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  if (isSSR) return null;

  return (

    <>
      <Header />
      <Component {...pageProps} />
    </>
    

  );
}
