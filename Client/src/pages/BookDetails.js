import { useParams } from 'react-router-dom';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "../CSS/BookDetails.css"
import Navbar from '../Componenets/Navbar'

function BookDetails() {
  const [value, setValue] = useState({})

  const { bookId } = useParams();

  let token = localStorage.getItem("token")
  useEffect(() => {
    axios.get(`http://localhost:3001/books/${bookId}`, { headers: { "x-api-key": token } }).then((responce) => { 
    setValue(responce.data.data) })

      .catch((err) => alert(err.response.data.messagee))
  }, [])

  const deleteFun = () => {
    axios.delete(`http://localhost:3001/books/${bookId}`, { headers: { "x-api-key": token } }).then(() => {
      alert("Book deleted successfully")
      window.location.replace("/bookList")

    }).catch((err) => alert(err.response.data.message))
  }




  return (
    <div id='bigBoxBD'>
      <Navbar/>
      <div id="container">
        <img className='imputCB' src={(value.bookCover)?value.bookCover:"https://img.freepik.com/free-photo/book-composition-with-open-book_23-2147690555.jpg"} style={{ width: "10vh", height: "10vh" }} />
        <div>Title: <input className='inputs'  value={value.title}  /></div>
        
        <div>excerpt: <input className='imputCB' value={value.excerpt} /></div>
        <div>ISBN: <input className='imputCB' value={value.ISBN} /></div>
        <div>category: <input className='imputCB' value={value.category} /></div>
        <div>subcategory: <input className='imputCB' value={value.subcategory} /></div>
        <div>
          <a href={`/Update/${bookId}`}><button  className="btn btn-primary btn22">Update Book</button></a>
          <button  className="btn btn-primary btn22" onClick={()=>deleteFun(bookId)} >Delete Book</button>
          {/* <a id='dlete' href={link}>Delete</a> */}
        </div>
      </div>

    </div>
  )
}

export default BookDetails
