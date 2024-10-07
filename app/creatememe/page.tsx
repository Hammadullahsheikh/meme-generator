"use client";

import Image from 'next/image';
import React, { useRef, useState } from 'react';

const CreateMeme = ({ searchParams }: { searchParams: { id: string; url: string } }) => {
    const [meme, setMeme] = useState<string | null>(null);
    const text1 = useRef<HTMLInputElement>(null);
    const text2 = useRef<HTMLInputElement>(null);

    const createMeme = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const data = await fetch(`https://api.imgflip.com/caption_image?template_id=${searchParams.id}&username=mabdullah6600&password=asdfgfdsa123&text0=${text1.current?.value}&text1=${text2.current?.value}`, {
            method: 'POST'
        });
        const response = await data.json();
        if (response.success) {
            setMeme(response.data.url);
        } else {
            alert('Failed to create meme, please try again.');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center bg-gray-900 text-white p-8 min-h-screen">
            <h1 className="text-4xl font-bold mb-6 text-blue-600">Create Your Meme</h1>
            <Image 
                src={searchParams.url} 
                width={400} 
                height={300} 
                alt='meme template' 
                className="mb-4 rounded-lg border-4 border-blue-600" 
            />

            <form onSubmit={createMeme} className="flex flex-col w-full max-w-md">
                <input
                    type="text"
                    placeholder='Enter top text'
                    ref={text1}
                    className="border border-blue-600 bg-gray-800 text-white mb-3 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <input
                    type="text"
                    placeholder='Enter bottom text'
                    ref={text2}
                    className="border border-blue-600 bg-gray-800 text-white mb-3 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <button
                    type='submit'
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition duration-300"
                >
                    Create Meme
                </button>
            </form>

            {meme && (
                <div className="mt-5 text-center">
                    <h2 className="text-xl mb-2 text-blue-400">Your Generated Meme:</h2>
                    <a href={meme} download="meme.png">
                        <Image 
                            src={meme} 
                            width={400} 
                            height={300} 
                            alt='generated meme' 
                            className="rounded-lg border-4 border-blue-600 cursor-pointer" 
                        />
                    </a>
                </div>
            )}
        </div>
    );
};

export default CreateMeme;
