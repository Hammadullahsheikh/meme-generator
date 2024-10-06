import Image from "next/image";
import React from "react";

interface Meme {
  id: string;
  name: string;
  url: string;
}

const page = async() => {
  const data = await fetch('https://api.imgflip.com/get_memes')
    const response = await data.json()
    console.log(response.data.memes)
  return (

<>
<h1 className="text-blue-600 text-4xl text-center font-semibold my-5">
    Meme Generator
</h1>
<div className="flex justify-center gap-7 flex-wrap">
  {response.data.memes.map((item: Meme) => {
    return (
      <div
        key={item.id}
        className="flex justify-center gap-3 border-4 border-black"
      >
        <div>
         <div>
        <Image
          src={item.url}
          alt={item.name}
          width={350}
          height={250}
          
          
        />
        </div>
        <div className="text-center ">
        <input type="text" placeholder="Type here"className="input mt-3 input-bordered input-primary w-full max-w-xs" /><br /><br />
        <input type="text" placeholder="Type here"className="input input-bordered input-primary w-full max-w-xs" />
        <br /><br />
        <button className="btn btn-active btn-neutral">make</button>
        </div>
        </div>
      </div>
      
    );
  })}
</div>
</>
);
}

export default page