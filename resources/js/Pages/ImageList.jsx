import React, { useEffect, useState } from 'react';

const ImageList = ({ refresh }) => {
    const [images, setImages] = useState([]);

    const loadImages = () => {
        fetch('http://localhost:8000/api/images')
            .then((res) => res.json())
            .then((data) => setImages(data));
    };

    useEffect(() => {
        loadImages();
    }, [refresh]);

    return (
        <div className="max-w-4xl mx-auto mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
            {images.map((img) => (
                <div key={img.id} className="border rounded overflow-hidden shadow p-2">
                    <img
                        src={img.url}
                        alt={img.file_name}
                        className="w-full h-40 object-cover rounded"
                    />
                    <p className="mt-2 text-center text-sm font-medium">{img.file_name}</p>
                </div>
            ))}
        </div>
    );
};

export default ImageList;
