import React, { Component } from 'react'
import {FaSearch} from 'react-icons/fa'
import './index.css'

export default class Header extends Component {
  render() {
    return (
      <div className="app-container">
        <nav className='nav-header'>
          <div>
            <img  
             src="https://res.cloudinary.com/dq7imhrvo/image/upload/v1643601872/insta%20Shere%20clone/Standard_Collection_8_wutyeq.png" 
             alt="website logo"
             className="header-img" 
              />
              <h1 className="header-head">Insta Share</h1>
          </div>
          <div className="right-side">
            <div className="input-container">
              <input 
              type="search"
              placeholder="Search" 
              className="search-input"
              />
              <button className="button-s">
              <FaSearch className="search-icon" />
              </button>
            </div>
            <ul className="header-link">
              <li className="link-tag">Home</li>
              <li className="link-tag">Profile</li>
            </ul>
            <button className="logout-button"
                type="button"
              >
                  Logout
              </button>
          </div>
        </nav>
      </div>
    )
  }
}
