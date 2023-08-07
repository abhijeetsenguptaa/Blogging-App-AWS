import React, { useEffect } from 'react';
import { FaThumbsUp } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Card(props) {
    const [comments, setComments] = React.useState(0);

    useEffect(() => {
        const requestOptions = {
            method: 'GET', // The HTTP method should be specified here as 'GET'
            headers: {
                // Add your custom headers here
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem('jwt_token'), // Replace with your JWT token
            },
        };

        fetch(`http://65.2.80.154:3002/blogs/${props.id}`, requestOptions)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                // Check if the response data contains comments
                if (data && data.comments && data.comments.length > 0) {
                    setComments(data.comments.length);
                } else {
                    setComments(0);
                }
            })
            .catch(error => {
                console.error('Error fetching comments:', error);
            });
    }, [props.id]);


    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
            <Link to={props.linker}>
                <img src={props.slug} alt="avatar" className="w-full h-48 object-cover" />
                <div className="px-6 py-4">
                    <h3 className="font-bold text-xl mb-2">{props.title}</h3>
                    <div>
                        <button className="flex items-center bg-blue-500 text-white py-2 px-4 rounded">
                            <FaThumbsUp className="mr-2" /> Like
                        </button>
                        <h3>{comments} comments</h3>
                    </div>
                </div>
                <div className="px-6 pt-4 pb-2">
                    <h4 className="text-gray-500 text-sm">Posted by: {props.name}</h4>
                </div>
            </Link>
        </div>
    );
}
