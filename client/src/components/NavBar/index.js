import React from 'react'
import "./index.css"
import {Link} from "react-router-dom"
const NavBar = () => {
  return (
    <div className='nav-container'>
        <Link to="/home">Library</Link>
    </div>
  )
}

export default NavBar