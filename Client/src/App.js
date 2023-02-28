import React, { useState } from 'react';
import axios from "axios"
import './App.css';

function App() {
  const [url, setUrl] = useState("")
  const [urlShort, setUrlShort] = useState("")
  const [check, setCheck] = useState(false)

  const shotUrl = (e) => {
    e.preventDefault();
    let data = {}
    if (!url) { alert("Enter long URL") }
    else {
      data.longUrl = url

      axios.post("http://localhost:3001/url/shorten", data)
        .then((responce) => {
          console.log(responce.data.data.shortUrl)
          setUrlShort(responce.data.data.shortUrl)
          setCheck(true)
        }).catch((err) => alert(err.message))
    }
  }

  const copyText = () => {
    let copyData = document.getElementById("shortUrl");
    copyData.select();
    navigator.clipboard.writeText(copyData.value);
  }

  const clearAll = () => {
    setUrl("")
    setUrlShort("")
    setCheck(false)
  }

  return (
    <>
      <div className="box">
        <span id='urlHeading'>URL Shortner</span>
        <div id='smallBox'>
          <input id='longUrl' className="form-control" type="text" placeholder="Enter your long URL" required value={url} onChange={(e) => setUrl(e.target.value)} />
          <button type="button" id='btn' className="btn btn-success" onClick={shotUrl} >ShortURL</button>
        </div>

        <div id='smallBox'>
          <input id='shortUrl' className="form-control" type="text" required value={urlShort} onChange={(e) => setUrlShort(e.target.value)} />
          {(check) ? <button type="button" id='btnCopy' className="btn btn-success" onClick={copyText} >Copy</button> : ""}
          {(check) ? <button type="button" id='btn' className="btn btn-success" onClick={clearAll} >Clear</button> : ""}
        </div>

      </div>
    </>
  );
}

export default App;
