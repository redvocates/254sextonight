'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function ImageGallery() {
    const [images, setImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        fetch('/api/images')
            .then(res => res.json())
            .then(data => setImages(data));
    }, []);

    return (
        <div className="bg-black min-h-screen p-4 flex flex-wrap justify-center gap-4">
            {images.map((img, index) => (
                <div key={index} className="cursor-pointer" onClick={() => setSelectedImage(img)}>
                    <Image src={img.url} alt={img.filename} width={150} height={150} className="rounded-md border border-white" />
                </div>
            ))}

            {selectedImage && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-90 z-50">
                    <button className="absolute top-5 right-5 text-white text-3xl" onClick={() => setSelectedImage(null)}>X</button>
                    <button className="absolute left-5 text-white text-3xl" onClick={() => {
                        const prevIndex = (images.findIndex(img => img.url === selectedImage.url) - 1 + images.length) % images.length;
                        setSelectedImage(images[prevIndex]);
                    }}>⮜</button>
                    <Image src={selectedImage.url} alt={selectedImage.filename} width={500} height={500} className="max-w-full max-h-full border-4 border-red-500" />
                    <button className="absolute right-5 text-white text-3xl" onClick={() => {
                        const nextIndex = (images.findIndex(img => img.url === selectedImage.url) + 1) % images.length;
                        setSelectedImage(images[nextIndex]);
                    }}>⮞</button>
                </div>
            )}
        </div>
    );
}
