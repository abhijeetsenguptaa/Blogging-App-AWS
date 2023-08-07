import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Card from '../Components/Card';

export default function Home() {
    document.title = "Home"
    const [loading, setLoading] = React.useState(false);
    const [data, setData] = React.useState([]);
    const [page, setPage] = React.useState(1);
    const [error, setError] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState('');

    const loadingUrl = 'https://s3.scoopwhoop.com/anj/loading/594155876.gif';

    function fetchData(page) {
        setLoading(true);
        fetch(`http://localhost:80/blogs?limit=4&page=${page}`)
            .then((res) => res.json())
            .then((data) => {
                setData(data);
                setError(false);
            })
            .catch(() => {
                setError(true);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    function handleSearch() {
        setPage(1); // Reset page to 1 when performing a new search
        fetchData(1); // Fetch data with the updated search query
    }

    // Fetch data when the component mounts or when the page state changes
    useEffect(() => {
        fetchData(page);
    }, [page]);

    useEffect(() => {
        if (error) {
            toast.error('Error fetching data. Please try again later.');
        }
    }, [error]);

    return (
        <div className='relative right-2'>
            <div className='flex justify-between'>
                <h1 className="text-4xl font-bold mb-6">Latest Blog Posts</h1>
                <div className="mb-4">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search by title..."
                        className="border rounded p-2"
                    />
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ml-2"
                        onClick={handleSearch}
                    >
                        Search
                    </button>
                </div>
            </div>
            {loading ? (
                <div className="flex items-center justify-center h-64">
                    <img src={loadingUrl} alt="Loading..." />
                </div>
            ) : error ? (
                <div className="text-red-500">Error fetching data. Please try again later.</div>
            ) : (
                <div className="grid grid-cols-4 gap-2">
                    {data
                        .filter(blog => blog.title.toLowerCase().includes(searchQuery.toLowerCase()))
                        .map((blog) => (
                            <Card key={blog.id} title={blog.title} slug={blog.slug} linker={`/blogs/${blog.id}`} name={blog.user.firstName} id={blog.id} />
                        ))}
                </div>
            )}
            <div className="flex justify-center mt-8 fixed bottom-2 right-1/3">
                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                    onClick={() => setPage((prevPage) => prevPage - 1)}
                    disabled={page === 1}
                >
                    Prev Page
                </button>
                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ml-4"
                    onClick={() => setPage((prevPage) => prevPage + 1)}
                    disabled={page === 3}
                >
                    Next Page
                </button>
            </div>
            <ToastContainer />
        </div>
    );
}
