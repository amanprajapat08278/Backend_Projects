import { useParams } from 'react-router-dom';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "../CSS/BookDetails.css"
import "../CSS/updateBook.css"
import Navbar from '../Componenets/Navbar';


function UpdateBook() {

    const { bookId } = useParams()


    const [profile, setProfile] = useState("https://drupal.nypl.org/sites-drupal/default/files/blogs/sJ3CT4V.gif")

    const [title, setTitle] = useState("")
    const [excerpt, setExcerpt] = useState("")
    const [ISBN, setISBN] = useState("")

    // const [prvData, setPrvData] = useState({})
    let prvData;

    let config = {
        headers: {
            "x-api-key": localStorage.getItem("token")
        }
    }

    useEffect(() => {
        axios.get(`http://localhost:3001/books/${bookId}`, config)
            .then((res) => {
                let result = res.data.data
                setTitle(result.title)
                setExcerpt(result.excerpt)
                setISBN(result.ISBN)
            })
            .catch((err) => alert(err.response.data.message))

    }, [])


    const updateFunc = async () => {

        let res = await axios.get(`http://localhost:3001/books/${bookId}`, config)

        prvData = res.data.data
            
        let options = {}

        if(prvData.title !== title) { options.title = title }
        if(prvData.excerpt !== excerpt) { options.excerpt = excerpt }
        if(prvData.ISBN !== ISBN) { options.ISBN = ISBN }

        // console.log(options)

        axios.put(`http://localhost:3001/books/${bookId}`, options, config)
            .then(() => { alert("Book has updated"); window.location.replace("/bookList") })
            .catch((err) => {alert(err.response.data.msg)})
    }




    return (
        <div id='UBContainer'>
            <Navbar />
            <div id='bigBoxBD'>


                <div id="container">

                    <img src={(profile) ? profile : "https://drupal.nypl.org/sites-drupal/default/files/blogs/sJ3CT4V.gif"} className='imputCB' style={{ width: "10vh", height: "10vh" }} />

                    <div>Title: <input className='imputCB' value={title} onChange={(e) => setTitle(e.target.value)} /></div>
                    <div>excerpt: <input className='imputCB' value={excerpt} onChange={(e) => setExcerpt(e.target.value)} /></div>
                    <div>ISBN: <input className='imputCB' value={ISBN} onChange={(e) => setISBN(e.target.value)} /></div>

                    <div>
                        <button id='btnUpdate' className="btn btn-primary" onClick={updateFunc} >Update Book</button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default UpdateBook