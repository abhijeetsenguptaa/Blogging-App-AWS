import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CreateBlog() {
    document.title = 'Create Blog';
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [slug, setSlug] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate input fields
        if (!title.trim() || !content.trim() || !slug.trim()) {
            toast.error('Please fill in all fields.');
            return;
        }

        try {
            // Get the JWT token from local storage
            const token = localStorage.getItem('jwt_token');

            if (!token) {
                toast.error('You must be logged in to create a blog post.');
                return;
            }

            // Send a POST request to create the blog post
            const response = await fetch('http://65.2.80.154:3002/blogs/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${token}`, // Include the JWT token in the Authorization header
                },
                body: JSON.stringify({ title, content, slug }),
            });

            await response.json();

            // Clear the form fields
            setTitle('');
            setContent('');
            setSlug('');

            // Show success toast message
            toast.success('Blog post created successfully.');
        } catch (error) {
            console.error('Error creating blog post:', error);
            toast.error('Failed to create blog post. Please try again later.');
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
            <div className="max-w-md mx-auto bg-white p-8 shadow-md rounded-md">
                <h1 className="text-4xl font-bold mb-8">Create a New Blog Post</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
                            Content
                        </label>
                        <textarea
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 h-40"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="slug">
                            Image URL (Slug)
                        </label>
                        <input
                            type="text"
                            id="slug"
                            value={slug}
                            onChange={(e) => setSlug(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                        >
                            Create Blog Post
                        </button>
                    </div>
                </form>
                <ToastContainer position="top-right" autoClose={3000} hideProgressBar={true} />
            </div>
        </div>
    );
}
