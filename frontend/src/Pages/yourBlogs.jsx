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
    const [visibleEdit, setVisibleEdit] = useState(false);
    const [userData, setUserData] = useState(null);
    const [visibleBlogEdit, setVisibleBlogEdit] = useState(false);
    const [blogData, setBlogData] = useState({
        title: "",
        content: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleBlogInputChange = (e) => {
        const { name, value } = e.target;
        setBlogData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleVisibleBlogEdit = () => {
        setVisibleBlogEdit(!visibleBlogEdit);
    };

    const handleUpdateProfile = async () => {
        try {
            // Send a PUT request to update the user profile
            const response = await fetch(`https://weary-bee-gaiters.cyclic.app/users/${userData.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token,
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                // Profile updated successfully
                setVisibleEdit(false);
                toast.success('Profile updated successfully.');
            } else {
                toast.error('Failed to update the profile.');
            }
        } catch (error) {
            console.error('Error updating the profile:', error);
            toast.error('Failed to update the profile.');
        }
    };

    const handleUpdateBlog = async (id) => {
        try {
            // Send a PUT request to update the blog post
            const response = await fetch(`https://weary-bee-gaiters.cyclic.app/blogs/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token,
                },
                body: JSON.stringify(blogData),
            });

            if (response.ok) {
                // Blog post updated successfully
                setVisibleBlogEdit(false);
                toast.success('Blog post updated successfully.');
                // Reload the page after updating the blog post
                window.location.reload();
            } else {
                toast.error('Failed to update the blog post.');
            }
        } catch (error) {
            console.error('Error updating the blog post:', error);
            toast.error('Failed to update the blog post.');
        }
    };

    const handleDelete = (id) => {
        // Get the JWT token from local storage
        const token = localStorage.getItem('jwt_token');

        if (!token) {
            toast.error('You must be logged in to delete a user profile.');
            return;
        }

        // Send a DELETE request to delete the user profile
        fetch(`https://weary-bee-gaiters.cyclic.app/users/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token,
            },
        })
            .then((res) => {
                if (!res.ok) {
                    if (res.status === 403) {
                        toast.error('You are forbidden to delete this user profile.');
                    } else {
                        toast.error('Failed to delete the user profile.');
                    }
                    throw new Error('Failed to delete the user profile.');
                }
                // Assuming you want to trigger a refresh after successful deletion
                window.location.reload();
            })
            .catch((error) => {
                console.error('Error deleting the user profile:', error);
                // Handle error (e.g., show an error toast)
                toast.error('An error occurred while deleting the user profile.');
            });
    };

    const handleDeleteBlog = (id) => {
        // Get the JWT token from local storage
        const token = localStorage.getItem('jwt_token');

        if (!token) {
            toast.error('You must be logged in to delete a blog post.');
            return;
        }

        // Send a DELETE request to delete the blog post
        fetch(`https://weary-bee-gaiters.cyclic.app/blogs/${id}`, {
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

    const handleEdit = () => {
        setVisibleEdit(!visibleEdit);
    };

    useEffect(() => {
        if (token == null) {
            toast.error('Please Login to see your posts.');
        } else {
            const decodedToken = jwtDecode(token).userId;

            fetch(`https://weary-bee-gaiters.cyclic.app/users/${decodedToken}`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: token,
                },
            })
                .then((res) => res.json())
                .then((data) => setUserData(data));

            fetch('https://weary-bee-gaiters.cyclic.app/blogs')
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
            {userData !== null ? (
                <div className="border rounded p-4 my-4">
                    <img
                        src="https://th.bing.com/th/id/OIP.8ZGySIw9uMRjvPzt_WQuawAAAA?pid=ImgDet&w=400&h=400&rs=1"
                        alt="profileImage"
                        className="w-32 h-32 object-cover rounded-full"
                    />
                    <h1 className="text-2xl font-bold my-2">
                        {userData.firstName} {userData.lastName}
                    </h1>
                    <p className="text-gray-600">Age: {userData.age}</p>
                    <p className="text-gray-500">Gender: {userData.gender}</p>
                    <p className="text-gray-500">Email: {userData.email}</p>
                    <p className="text-gray-500">Role: {userData.role}</p>
                    <p className="text-gray-500">Created At: {userData.createdAt}</p>
                    <p className="text-gray-500">Updated At: {userData.updatedAt}</p>

                    {/* Edit Profile Button */}
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4 mr-2"
                        onClick={() => handleEdit(userData.id)}
                    >
                        Edit Profile
                    </button>

                    {/* Delete Button */}
                    <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
                        onClick={() => handleDelete(userData.id)}
                    >
                        Delete
                    </button>
                </div>
            ) : (
                <h1>You are not Logged In</h1>
            )}
            {visibleEdit && (
                <div className="border rounded p-4 w-1/2 absolute top-10 right-6 bg-white shadow-md">
                    <h2 className="text-xl font-bold mb-1">Edit Profile</h2>
                    <div className="mb-4">
                        <label htmlFor="firstName" className=" text-sm font-medium text-gray-700">
                            First Name:
                        </label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={userData.firstName}
                            onChange={handleInputChange}
                            className="input-field border ml-2 p-2"
                            placeholder="Enter your first name"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="lastName" className=" text-sm font-medium text-gray-700">
                            Last Name:
                        </label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={userData.lastName}
                            onChange={handleInputChange}
                            className="input-field border ml-2 p-2"
                            placeholder="Enter your last name"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className=" text-sm font-medium text-gray-700">
                            Email:
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={userData.email}
                            onChange={handleInputChange}
                            className="input-field border ml-2 p-2"
                            placeholder="Enter your email address"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="age" className="text-sm font-medium text-gray-700">
                            Age:
                        </label>
                        <input
                            type="number"
                            id="age"
                            name="age"
                            value={userData.age}
                            onChange={handleInputChange}
                            className="input-field border ml-2 p-2"
                            placeholder="Enter your age"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="gender" className="text-sm font-medium text-gray-700">
                            Gender:
                        </label>
                        <select
                            id="gender"
                            name="gender"
                            value={userData.gender}
                            onChange={handleInputChange}
                            className="input-field border ml-2 p-2"
                        >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <button
                        onClick={handleUpdateProfile}
                        className="update-btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Update
                    </button>
                </div>
            )}

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
                            onClick={() => handleVisibleBlogEdit()}
                        >
                            <FaEdit /> Edit
                        </button>
                        {visibleBlogEdit && (
                            <div className='border w-1/3 absolute top-2 right-16 p-4'>
                                <div className="mb-4">
                                    <label htmlFor="title" className=" text-sm font-medium text-gray-700">
                                        Title:
                                    </label><br/>
                                    <input
                                        type="text"
                                        id="title"
                                        name="title"
                                        value={blogData.title}
                                        onChange={handleBlogInputChange}
                                        className="input-field border ml-2 p-2"
                                        placeholder="Enter blog title"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="content" className="text-sm font-medium text-gray-700">
                                        Content:
                                    </label><br/>
                                    <input
                                        id="content"
                                        name="content"
                                        value={blogData.content}
                                        onChange={handleBlogInputChange}
                                        className="input-field border ml-2 p-2"
                                        placeholder="Enter blog content"
                                    />
                                </div>
                                <button
                                    onClick={() => handleUpdateBlog(item.id)}
                                    className="update-btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Update Blog
                                </button>
                            </div>
                        )}
                        {/* Delete Button */}
                        <button
                            className="absolute bottom-0 right-0 text-red-500 mr-2 mb-2"
                            onClick={() => handleDeleteBlog(item.id)}
                        >
                            <FaTrash /> Delete
                        </button>
                    </div>
                ))
            )}
        </div>
    );
}
