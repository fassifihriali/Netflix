import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import logo from '../assets/logo.png'
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaPowerOff } from 'react-icons/fa';
import { firebaseAuth } from '../utils/firebase-config';
import { onAuthStateChanged, signOut } from 'firebase/auth';

export default function Navbar({isScrolled}) {
    const links=[
        {name:'Home',link:'/'},
        {name:'TV Shows',link:'/tv'},
        {name:'Movies',link:'/movies'},
        {name:'My List',link:'/mylist'},
    ];
    const navigate = useNavigate();

    useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
        if (!currentUser) navigate('/login');
        });
        return () => unsubscribe();
    }, [navigate]);

    const [showSearch, setShowSearch] = useState(false);
    const [inputHover, setInputHover] = useState(false);
    
    const [searchValue, setSearchValue] = useState("");
    const handleSearch = (e) => {
        e.preventDefault();
        if (searchValue.trim() !== "") {
            navigate(`/search?query=${encodeURIComponent(searchValue)}`);
        }
    };

    const [showDropdown, setShowDropdown] = useState(false);
    const handleProfileClick = () => {
        setShowDropdown(!showDropdown);
    };

  return (<Container>
    <nav className={`navbar ${isScrolled ? "nav-dark" : ""}`}>
        <div className="navbar-left">
            <img src={logo} alt="logo" />
            <ul>
                {
                    links.map(({name, link})=>{
                        return(
                            <li key={name}>
                                <Link to={link}>{name}</Link>
                            </li>
                        )
                    })
                }
            </ul>
        </div>

        <div className="navbar-right">
            <div className={`search ${showSearch ? "show-search" : ""}`}>
                <form onSubmit={handleSearch}>
                    <button
                        type="button"
                        onClick={() => setShowSearch(!showSearch)}
                        className="icons"
                    >
                        <FaSearch />
                    </button>
                    {showSearch && (
                        <input
                            type="text"
                            placeholder="Search for a movie or show"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                    )}
                </form>
            </div>
            <div className='navbar-profile'>
                <button onClick={handleProfileClick} className={`profile ${showDropdown ? 'activate': ''}`}>
                    <FaPowerOff/>
                </button>
                <div className={`dropdown ${showDropdown ? 'show': ''}`}>
                    <p onClick={()=>{signOut(firebaseAuth);}}>Sign Out</p>
                </div>
            </div>
        </div>
    </nav>
  </Container>);
}

const Container = styled.div`
    .navbar {
        width: 100%;
        padding: 20px 6%;
        display: flex;
        justify-content: space-between;
        position: fixed;
        top: 0;
        left: 0;
        font-size: 14px;
        color: #e5e5e5;
        background-image: linear-gradient(180deg, rgba(0,0,0,0.7) 10%, transparent);
        z-index: 1000;
        transition: 0.3s ease-in-out;
    }

    .navbar-left {
        display: flex;
        align-items: center;
        gap: 50px;
        
        img {
            width: 90px;
        }
        
        ul {
            display: flex;
            list-style: none;
            gap: 20px;
            
            li {
                cursor: pointer;
                
                a {
                    color: #e5e5e5;
                    text-decoration: none;
                    
                    &:hover {
                        color: white;
                    }
                }
            }
        }
    }

    .navbar-right {
        display: flex;
        gap: 20px;
        align-items: center;
        
        .icons {
            width: 20px;
            cursor: pointer;
        }
        
        .search {
            display: flex;
            align-items: center;
            
            button {
                background-color: transparent;
                border: none;
                cursor: pointer;
                color: #e5e5e5;
                
                &:focus {
                    outline: none;
                }
                
                svg {
                    width: 20px;
                    height: 20px;
                }
            }
            
            input {
                background-color: rgba(0, 0, 0, 0.8);
                border: 1px solid #333;
                color: #e5e5e5;
                padding: 8px 12px;
                margin-left: 10px;
                border-radius: 4px;
                font-size: 14px;
                
                &:focus {
                    outline: none;
                    border-color: white;
                }
                
                &::placeholder {
                    color: #999;
                }
            }
        }
    }

    .navbar-profile {
        display: flex;
        align-items: center;
        gap: 10px;
        cursor: pointer;
        position: relative;
        
        .profile {
            border-radius: 5px;
            background-color: transparent;
            border: none;
            color: #e5e5e5;
            cursor: pointer;
            padding: 5px;
            transition: color 0.3s ease;
            
            &:focus {
                outline: none;
            }
            
            &.activate {
                color: #f34242;
            }
            
            svg {
                width: 20px;
                height: 20px;
            }
        }
        
        .dropdown {
            position: absolute;
            top: 100%;
            right: 0;
            width: max-content;
            background: #191919;
            padding: 18px 22px;
            text-decoration: underline;
            z-index: 1;
            display: none;
            opacity: 0;
            transform: translateY(-10px);
            transition: all 0.3s ease;
            
            &.show {
                display: block;
                opacity: 1;
                transform: translateY(0);
            }
            
            p {
                font-size: 14px;
                cursor: pointer;
                margin: 0;
                color: #e5e5e5;
                
                &:hover {
                    color: white;
                }
            }
        }
    }

    .navbar {
        background: transparent;
    }
    
    .nav-dark {
        background: #141414;
    }

    @media (max-width: 800px) {
        .navbar {
            padding: 20px 4%;
            
            .navbar-left ul {
                display: none;
            }
            
            img {
                height: 25px;
            }
        }
    }

    @media (max-width: 500px) {
        .navbar {
            padding: 20px;
            
            img {
                height: 10px;
            }
        }
    }
`;