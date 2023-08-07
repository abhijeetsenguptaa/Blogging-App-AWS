import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jwt_decode from 'jwt-decode';

export default function BlogDetails() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [comments, setComments] = useState(0);
    const [name, setName] = useState([]);
    const [text, setText] = useState([]);
    const [commentsVisible, setVisible] = useState(false);
    const [commentText, setCommentText] = useState(""); // State for the new comment text

    useEffect(() => {
        const token = localStorage.getItem('jwt_token');

        if (!token) {
            toast.error('You must be logged in to view this blog post.');
            setTimeout(() => {
                window.location.href = "/"
            }, 1000)
            return;
        }

        // Check token expiration
        const decodedToken = jwt_decode(token);
        const currentTime = Date.now() / 1000; // Convert current time to seconds
        if (decodedToken.exp < currentTime) {
            toast.error('Your login session has expired. Please log in again.');
            return;
        }

        setLoading(true); // Set loading state to true before making the API call

        fetch(`http://65.2.80.154:3002/blogs/${id}`, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "Authorization": token
            }
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error("Failed to fetch data");
                }
                return res.json();
            })
            .then(data => {
                setData(data);
                setComments(data.comments.length);

                // Check if comments exist and retrieve the firstName from each comment
                if (data.comments.length > 0) {
                    const commentNames = data.comments.map(comment => comment.user.firstName);
                    const commentsText = data.comments.map(comment => comment.text);
                    setText(commentsText);
                    setName(commentNames);
                } else {
                    setName([]);
                    setText([]);
                }

                setLoading(false); // Set loading state to false after successful API call
            })
            .catch(error => {
                console.log("Error fetching data:", error);
                setError(true); // Set error state to true in case of an error
                setLoading(false); // Set loading state to false after an error
            });
    }, [id, commentsVisible]); // Add commentsVisible to the dependency array to trigger API call on comment submission

    const handleCommentSubmit = () => {
        const token = localStorage.getItem('jwt_token');

        if (!token) {
            toast.error('You must be logged in to post a comment.');
            return;
        }

        // Check token expiration
        const decodedToken = jwt_decode(token);
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp < currentTime) {
            toast.error('Your login session has expired. Please log in again.');
            return;
        }

        setLoading(true);

        // Make a POST request to add a new comment
        fetch(`http://65.2.80.154:3002/comments/${id}`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Authorization": token
            },
            body: JSON.stringify({
                text: commentText
            })
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error("Failed to add comment");
                }
                return res.json();
            })
            .then(data => {
                // After posting the comment successfully, set commentsVisible to trigger API call and refresh comments
                setVisible(!commentsVisible);
                setLoading(false);
            })
            .catch(error => {
                console.log("Error posting comment:", error);
                setError(true);
                setLoading(false);
            });

        // Clear the comment text field after posting
        setCommentText("");
    };
    const handleDeleteComment = (commentId) => {
        // Make a DELETE request to delete the comment
        const token = localStorage.getItem('jwt_token');
    
        if (!token) {
            toast.error('You must be logged in to delete a comment.');
            return;
        }
    
        setLoading(true);
    
        fetch(`http://65.2.80.154:3002/comments/${commentId}`, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
                "Authorization": token
            }
        })
            .then(res => {
                if (!res.ok) {
                    if (res.status === 403) {
                        // Handle 403 Forbidden error - user doesn't have permission
                        toast.error('You do not have permission to delete this comment.');
                    } else {
                        throw new Error("Failed to delete comment");
                    }
                }
                return res.json();
            })
            .then(data => {
                // After successfully deleting the comment, set commentsVisible to trigger API call and refresh comments
                setVisible(!commentsVisible);
                setLoading(false);
            })
            .catch(error => {
                console.log("Error deleting comment:", error);
                setError(true);
                setLoading(false);
            });
    };


    return (
        <div className="container mx-auto py-8">
            {loading && <p>Loading...</p>}
            {error && <p>Error while fetching data.</p>}
            {data && (
                <div className='border h-96 rounded-lg shadow-lg'>
                    <img src={data.slug} alt="" className='h-1/2 w-full object-cover rounded-t-lg' />
                    <div className="p-4">
                        <h1 className="text-3xl font-bold mb-4">{data.title}</h1>
                        <p className="text-gray-600 mb-4">{data.content}</p>
                        <p className="text-gray-500">Created At: {data.createdAt}</p>
                        <p onClick={() => setVisible(!commentsVisible)}>{comments} comments</p>
                    </div>
                </div>
            )}
            {commentsVisible && (
                <div className='border m-2 p-4'>
                    <h2 className="text-xl font-bold mb-2">Comments:</h2>
                    {name.map((commentName, index) => (
                        <div key={index} className="border-b py-2 flex justify-between">
                            <div>
                            <p className="font-bold mb-1">{commentName}</p>
                            <p>{text[index]}</p>
                            </div>
                            <button onClick={() => handleDeleteComment(data.comments[index].id)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                                Delete
                            </button>
                        </div>
                    ))}


                    {/* Add the comment input field and submit button */}
                    <textarea
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        className="border p-2 my-2 w-full"
                        placeholder="Enter your comment here..."
                    />
                    <button onClick={handleCommentSubmit} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                        Submit Comment
                    </button>
                </div>
            )}

            <ToastContainer />
        </div>
    );
}
