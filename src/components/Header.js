/* eslint-disable no-unused-vars */
import {useContext, useState} from 'react'
import { Link } from 'react-router-dom'
import Logo from '../assets/logo512.png'

import {jwtDecode} from 'jwt-decode'
import AuthContext from '../context/AuthContext'

import styled from "styled-components";
import { FaBars } from "react-icons/fa";

const StyledHeader = styled.header`
  background-color: var(--color-headfoot);
  width: 100%;
  padding: 10px 12px 8px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .nav_logo {
    padding: 0 12px;
    .nav-logo-link {
      text-decoration: none;
      font-size: 24px;
      color: #fab005;
      font-weight: bold;
    }
  }
  .menuToggleBtn {
    display: none;
    color: white;
    font-size: 24px;
    position: absolute;
    right: 20px;
    top: 15px;
    cursor: pointer;
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    .menuToggleBtn {
      display: block;
    }
  }
`;
const NavManu = styled.ul`
  list-style: none;
  display: flex;

  li {
    &:hover {
      cursor: pointer;
      background: orange;
      border-radius: 4px;
    }
  }
  .nav-menu-list {
    text-decoration: none;
    color: white;
    display: block;
    padding: 10px 10px;
  }
  @media screen and (max-width: 768px) {
    display: ${(props) => (props.isToggleOpen ? "flex" : "none")};
    // display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
`;

const Header = () => {
  const {user, logoutUser} = useContext(AuthContext)
  const token = localStorage.getItem("authTokens")

  if (token) {
    const decoded = jwtDecode(token)
    var user_id = decoded.user_id
  }

  const [isToggleOpen, setIsToggleOpen] = useState(false);

  const handleToggleOpen = () => {
    setIsToggleOpen(!isToggleOpen);
  };
  return (
    <>
      <StyledHeader>
        <div className="nav_logo">
          <Link to={"/"} className="nav-logo-link">
            <img src={Logo} className='logo' alt='logo' />
          </Link>
        </div>
        

        <NavManu isToggleOpen={isToggleOpen}>
        {token !== null && 
        <>
          <div className='horizontal-container'>
            <Link to='/' className='nav-menu-list username'>{user.username}</Link>

            <button 
              className='new-blog-btn nav-menu-list'
              onClick={handleToggleOpen}>
              <Link to="/blog/new/">
                <span className="material-symbols-outlined">edit_square</span>
              </Link>
            </button>
          </div>
          
          <li>
          <button 
            className='sign-out-btn nav-menu-list'
            onClick={logoutUser}>
            <span class="material-symbols-outlined">
              logout
            </span> 
          </button>
          </li>
          <hr />
        </>
        }
        <li>
          <Link to={"/"} className="nav-menu-list">
            Blog
          </Link>
        </li>
        <li>
          <Link to={"/contact"} className="nav-menu-list">
            Contact
          </Link>
        </li>
        </NavManu>
        <FaBars className="menuToggleBtn" onClick={handleToggleOpen} />
      </StyledHeader>
    </>
  );
};

export default Header;