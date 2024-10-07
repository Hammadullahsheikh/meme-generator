import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Meme {
  id: string;
  name: string;
  url: string;
}

const Page = async () => {
  const data = await fetch('https://api.imgflip.com/get_memes');
  const response = await data.json();
  const memes: Meme[] = response.data.memes;

  return (
    <>
    <div className="bg-black">
      {/* Navbar */}
      <nav className="bg-blue-700 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="text-white text-2xl font-bold">
            <Link href="/">Meme Generator</Link>
          </div>
          <div className="hidden md:flex space-x-4">
            <Link href="/" className="text-white hover:underline hover:text-blue-300 px-3 py-2 rounded">
              Home
            </Link>
            <Link href="#about" className="text-white hover:underline hover:text-blue-300 px-3 py-2 rounded">
              About
            </Link>
            <Link href="#contact" className="text-white hover:underline hover:text-blue-300 px-3 py-2 rounded">
              Contact
            </Link>
          </div>
        </div>
      </nav>

      <h1 className="text-blue-700 text-5xl text-center font-bold my-8">Meme Generator</h1>

      <div className="flex justify-center gap-6 flex-wrap p-4 bg-black">
        {memes.map((item: Meme) => (
          <div
            key={item.id}
            className="flex flex-col items-center border-2 border-blue-600 rounded-lg shadow-xl transition-transform transform hover:scale-105 bg-gray-900 overflow-hidden max-w-xs"
          >
            <Image
              src={item.url}
              alt={item.name}
              width={300}  // Set fixed width
              height={300} // Set fixed height
              className="rounded-t-lg object-cover h-64 w-full" // Ensures the image covers the area
            />
            <div className="p-4 text-center">
              <Link
                href={{
                  pathname: "/creatememe",
                  query: { url: item.url, id: item.id },
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white w-full mt-3 p-3 rounded-lg font-semibold transition duration-300"
              >
                Generate Meme
              </Link>
            </div>
          </div>
        ))}
      </div>

      <footer className="text-center mt-10 mb-5">
        <p className="text-gray-400">© {new Date().getFullYear()} Meme Generator. All rights reserved.</p>
      </footer>
      </div>
    </>
  );
};

export default Page;
