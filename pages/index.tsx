import Head from 'next/head';
import { useState } from "react";

import Sidebar from '@/components/home/Sidebar';
import Products from '@/components/home/Products';

export default function Home() {
  const [category, setCategory] = useState("view all");
  const [subCategory, setSubCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedColour, setSelectedColour] = useState("");

  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Clothing Products" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='flex pt-10 w-screen min-h-screen'>
        <Sidebar 
          setCategory={setCategory} 
          setSubCategory={setSubCategory} 
          category={category}
          subCategory={subCategory}
          setSearchTerm={setSearchTerm}
          setSelectedColour={setSelectedColour}
        />

      <Products 
        category={category}
        subCategory={subCategory}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedColour={selectedColour}
        setSelectedColour={setSelectedColour}
      />
      </main>
    </>
  );
}

