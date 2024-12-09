import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"

import Cookies from "js-cookie"
import axios from "axios"
import "./index.css"
const Login = () => {
  const [userDetails, setUserDetails] = useState({ email: "", password: "" })
  const [errorMessage, setErrorMessage] = useState("")
  const Navigate = useNavigate()
  const handleInput = (e) => {
    const { name, value } = e.target
    setUserDetails((prevState) => ({ ...prevState, [name]: value }))
  }
  const handleForm = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post("http://localhost:5000/api/login", userDetails, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      if (response.status === 200) {
        Cookies.set("jwtToken", response.data.jwtToken)
        Navigate("/home")
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message || "Login failed. Please try again.");
      } else if (error.request) {
        // Request was made but no response received
        setErrorMessage("No response from server. Please try again later.");
      } else {
        // Something went wrong in setting up the request
        setErrorMessage("An unexpected error occurred.");
      }
      console.error("Error during login:", error);
    }
  }
  return (
    <div className='login-container'>
      <form className='login-form-container' onSubmit={handleForm}>
        <h1>Login</h1>
        <br />
        <label htmlFor="email">Email</label>
        <br />
        <input type="text" placeholder="Enter Your Email" id="email" name="email" onChange={handleInput} required />
        <br />
        <label htmlFor="password">Password</label>
        <br />
        <input type="password" placeholder="Enter Your Password" id="password" name="password" onChange={handleInput} required />
        <br />
        <p className='log-text'>Already have an account <Link to="/">SignUp</Link></p>
        <button type="submit" className='login-button'>Login</button>
      </form>
    </div>
  )
}

export default Login