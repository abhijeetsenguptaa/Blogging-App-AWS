import React, { useEffect, useState } from 'react';
import ButtonsOnNavBar from './ButtonsOnNavBar';
import { toast } from 'react-toastify';

export default function NavBar() {
    const [token, setToken] = useState(false);

    useEffect(() => {
        const jwt_token = localStorage.getItem('jwt_token');
        setToken(!!jwt_token);
    }, []);

    const handleLogOut = () => {
        toast.success('You have logged Out Successfully')
        localStorage.removeItem('jwt_token');
        setToken(false);
    };

    return (
        <div className='border rounded bg-black h-full p-4 mr-4 w-72 font-bold fixed'>
            <ButtonsOnNavBar name={'Home'} link={'/'} />
            <ButtonsOnNavBar name={'Create a Blog'} link={'/create'} />
            {token ? (
                <ButtonsOnNavBar name={'Logout'} link={'/'} handleClick={handleLogOut} />
            ) : (
                <ButtonsOnNavBar name={'Login'} link={'/login'} />
            )}
            <ButtonsOnNavBar name={'Register'} link={'/register'} />
            <ButtonsOnNavBar name={'Your Blogs'} link={'/your-blogs'} />
        </div>
    );
}
