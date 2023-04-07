import React from "react";
import logoImg from './logo.png'
import { Link, useLocation } from "react-router-dom";
import './Header.css'
import Search from "./Search";

const Header = () => {
    const {search} = useLocation()
    return (
        <div className="Header">
            <Link to={`/${search}`}>
                <img className="Header-logo" src={logoImg} />
            </Link>
            <Search />
        </div>
    )
}

export default Header
