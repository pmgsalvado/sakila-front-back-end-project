"use strict"
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from 'react-redux'
//import { fetchUserByMail } from '../../features/user/userSlice'

// types
interface UserInfo {
    first_name: string;
}


interface RootState {
    user: {
        userInfo: UserInfo | null;
        loggedIn: boolean;
    }
}

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default function NavBar(){

    const userInfo = useAppSelector((state) => state.user.userInfo)
    const loggedIn = useAppSelector((state) => state.user.loggedIn)

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-body-terciary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Sakila Project</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/rental">Rental</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/new_customer">New Customer</Link>
                        </li>
                        
                    </ul>
                    {!loggedIn ? (
                        <a href="/login" className="btn btn-default"> Login</a>
                    ) : (
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                {userInfo?.first_name ?? "User"}
                            </a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#">Personal Information</a></li>
                                <li><hr className="dropdown-divider"></hr></li>
                                <li><a className="dropdown-item" href="#">Logout</a></li>
                            </ul>
                            
                        </li>
                    )}
                    
                </div>
            </div>
        </nav>
    )
}

/**
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Dropdown
                            </a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#">Action</a></li>
                                <li><a className="dropdown-item" href="#">Another action</a></li>
                                <li><hr className="dropdown-divider"></hr></li>
                                <li><a className="dropdown-item" href="#">Something else here</a></li>
                            </ul>
                        </li>
                        
                        <li className="nav-item">
                            <a className="nav-link disabled" aria-disabled="true">Disabled</a>
                        </li>
                         */