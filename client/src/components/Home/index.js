import React, { useState, useEffect } from 'react'
import "./index.css"
import axios from "axios"
import NavBar from '../NavBar'
const Home = () => {
  const [bookList, setBookList] = useState([])
  const fetchData = async () => {
    const response = await axios.get("http://localhost:5000/api/books")
    setBookList(response.data.result)
  }
  useEffect(() => {
    fetchData()
  }, [])
  return (
    <div>
      <NavBar />
      <div>
        <ul>
          {bookList && bookList.map((eachBook) =>
            <li className='each-book-list-item' key={eachBook.id}>
              <p>Book Name: {eachBook.title}</p>
              <p>Author: {eachBook.author}</p>
              <p>Quantity: {eachBook.quantity}</p>
            </li>)}
        </ul>
      </div>
    </div>
  )
}

export default Home