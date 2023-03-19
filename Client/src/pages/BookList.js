import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Navbar from '../Componenets/Navbar'
import "../CSS/bookList.css"



function BookList() {
    const [books, SetBooks] = useState([])

    let token = localStorage.getItem('token');

    useEffect(() => {
        axios.get("http://localhost:3001/books", { headers: { "x-api-key": token } }).then((responce) => {
            SetBooks(responce.data.data)
        })
            .catch((err) => alert(err.response.data.message))
    }, [])


    function Details(a) {
        window.location.replace(`bookList/${a}`)
    }



    return (
        <div id='bookListBigBox'>
            <>
                <Navbar />
                <div id="allList">
                    {books.map((x, i) => {
                        return (<div className="itemBox" key={i}>

                            <img id='books' src={(x.bookCover) ? `${x.bookCover}` : "https://st2.depositphotos.com/1105977/5461/i/600/depositphotos_54615585-stock-photo-old-books-on-wooden-table.jpg"} alt='error' />
                            <span>{x.title}</span>
                            <span>Reviews : {x.reviews}</span>
                            <div className='bt-div'>
                                <a href={`bookUpdate/${x._id}`}><button id='btn1' onClick={() => Details(x._id)}>Update</button></a>
                                <a href={`bookDetails/${x._id}`}><button id='btn2'>Detailes</button></a>
                            </div>
                        </div>)
                    })}
                </div>
            </>
        </div>
    )
}

export default BookList
