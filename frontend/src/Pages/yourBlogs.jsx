import jwtDecode from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEdit, FaTrash } from 'react-icons/fa';

export default function YourBlogs() {
    const token = localStorage.getItem('jwt_token');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const handleDelete = (id) => {
        // Get the JWT token from local storage
        const token = localStorage.getItem('jwt_token');

        if (!token) {
            toast.error('You must be logged in to delete a blog post.');
            return;
        }

        // Send a DELETE request to delete the blog post
        fetch(`http://localhost:80/blogs/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token,
            },
        })
            .then((res) => {
                if (!res.ok) {
                    if (res.status === 403) {
                        toast.error('You are forbidden to delete this blog post.');
                    } else {
                        toast.error('Failed to delete the blog post.');
                    }
                    throw new Error('Failed to delete the blog post.');
                }
                // Assuming you want to trigger a refresh after successful deletion
                window.location.reload();
            })
            .catch((error) => {
                console.error('Error deleting the blog post:', error);
                // Handle error (e.g., show an error toast)
                toast.error('An error occurred while deleting the blog post.');
            });
    };

    const handleEdit = (id) => {
        // Get the JWT token from local storage
        const token = localStorage.getItem('jwt_token');

        if (!token) {
            toast.error('You must be logged in to edit a blog post.');
            return;
        }

        // Here, you can implement the logic to handle the edit action.
        // For example, you can redirect to the edit page with the blog post id.
        // For demonstration purposes, we will just show a toast message with the blog post id.
        toast.info(`Editing blog post with id: ${id}`);
    };

    useEffect(() => {
        if (token == null) {
            toast.error('Please Login to see your posts.');
        } else {
            const decodedToken = jwtDecode(token).userId;

            fetch('http://localhost:80/blogs')
                .then((res) => {
                    if (!res.ok) {
                        throw new Error('Failed to fetch blogs.');
                    }
                    return res.json();
                })
                .then((data) => {
                    // Filter the data to keep only the items whose userId matches the decodedToken
                    const filteredData = data.filter((item) => item.userId === decodedToken);
                    setData(filteredData);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error('Error fetching blogs:', err);
                    setError(true);
                    setLoading(false);
                });
        }
    }, [token]);

    return (
        <div>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={true} />
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error fetching blogs.</p>
            ) : data.length === 0 ? (
                <p>No blogs found.</p>
            ) : (
                data.map((item) => (
                    <div key={item.id} className="border rounded p-4 my-4 relative">
                        <img src={item.slug} alt="blogImage" className="w-32 h-32 object-cover rounded-full" />
                        <h3 className="text-2xl font-bold my-2">{item.title}</h3>
                        <p className="text-gray-600">{item.content}</p>
                        <p className="text-gray-500">Posted by: {item.user.firstName}</p>
                        <p className="text-gray-500">Created At: {item.createdAt}</p>
                        {/* Edit Button */}
                        <button
                            className="absolute top-0 right-0 text-blue-500 mr-2 mt-2"
                            onClick={()=> handleEdit(item.id)}
                        >
                            <FaEdit /> Edit
                        </button>
                        {/* Delete Button */}
                        <button
                            className="absolute bottom-0 right-0 text-red-500 mr-2 mb-2"
                            onClick={() => handleDelete(item.id)}
                        >
                            <FaTrash /> Delete
                        </button>
                    </div>
                ))
            )}
        </div>
    );
}
