import React from 'react'
import { clearStorage } from '../../helper/storage';
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {

    const navigate = useNavigate();
    const storedUser = JSON.parse(localStorage.getItem("user"));

    const handleLogout = () => {
        const callBack = () => {
            navigate("/login");
        };
        clearStorage(callBack);
    };

    return (
        <>
            <nav class="navbar navbar-light bg-light">
                <div class="container">
                    <Link to='/' class="navbar-brand"> {storedUser?.userName} </Link>
                    <div onClick={handleLogout} className='cusrt_pointer'>
                        Logout
                    </div>
                </div>
            </nav>
        </>
    )
}
