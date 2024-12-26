import React from 'react'
import { clearStorage } from '../../helper/storage';
import { Link, useNavigate } from 'react-router-dom';

export default function LogoutHeader() {

    const navigate = useNavigate();

    return (
        <>
            <nav class="navbar navbar-light bg-light">
                <div class="container">
                    <Link to='/home' class="navbar-brand"> Letmegrab </Link>
                    <div className='custm_flex-cs'>
                        <Link to='/login'>
                            <span className='cusrt_pointer'>
                                Login
                            </span>
                        </Link>
                        <Link to='/register'>
                            <span className='cusrt_pointer'>
                                SignUp
                            </span>
                        </Link>
                    </div>
                </div>
            </nav>
        </>
    )
}