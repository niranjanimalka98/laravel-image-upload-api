import React, { useState } from 'react';
import ImageList from "./ImageList.jsx";

const Home = () => {
    const [name, setName] = useState('');
    const [profileImage, setProfileImage] = useState(null);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const [refreshKey, setRefreshKey] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('profile_image', profileImage);

        try {
            const res = await fetch('http://localhost:8000/api/images', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                },
                body: formData,
            });

            const data = await res.json();

            if (res.ok) {
                setMessage('Upload successful!');
                setMessageType('success');
                setName('');
                setProfileImage(null);
                setRefreshKey((prev) => prev + 1);
            } else {
                const first = Object.values(data.errors || {})[0];
                setMessage(first);
                setMessageType('error');
            }
        } catch (err) {
            setMessage('Something went wrong.');
            setMessageType('error');
        }
    };

    return (
        <>
            <div className="p-6">
                <h2 className="text-xl font-bold mb-4 text-center">Upload Profile Image</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Profile Image</label>
                        <input
                            type="file"
                            accept=".jpg,.jpeg,.png"
                            onChange={(e) => setProfileImage(e.target.files[0])}
                            className="mt-1 block w-full text-sm text-gray-500 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition"
                    >
                        Upload
                    </button>
                </form>

                {message && (
                    <div
                        className={`mt-4 text-sm text-center ${
                            messageType === 'success' ? 'text-green-600' : 'text-red-600'
                        }`}
                    >
                        {message}
                    </div>
                )}
            </div>
            <ImageList refresh={refreshKey} />
        </>
    );
};

export default Home;
