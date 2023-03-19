import axios from 'axios'
import React, {useState} from 'react'
import "../CSS/Resister.css"
import Navbar from '../Componenets/Navbar'


function Resister() {
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const [street, setStreet] = useState("")
    const [city, setCity] = useState("")
    const [pincode, setPincode] = useState("")
    
    const resisterUser = (e)=>{
        e.preventDefault();
        let resisterDetials = {}
        resisterDetials.name = name;
        resisterDetials.phone = phone;
        resisterDetials.email = email;
        resisterDetials.password = pass;
        resisterDetials.address = {}
        resisterDetials.address.street = street;
        resisterDetials.address.city = city;
        resisterDetials.address.pincode = pincode;
        
        let title = document.getElementById("select").value
        resisterDetials.title = title;
         
        axios.post("http://localhost:3001/register", resisterDetials)
            .then(() => {
                alert("Your account has created")
                window.location.replace("/login")
            }).catch((err) => alert(err.response.data.message))

    }
    return (
        <div id='bigBox'>
            <Navbar/>


            <div className="userResister">
            <div id="userResister">
                <h1 id='resis'>Register</h1>
            </div>
                <form onSubmit={resisterUser}>
                    <div className="resister-form" id='title'>
                        <span> Title </span>
                        <select id='select'>
                            <option value="">select</option>
                            <option value="Mr">Mr</option>
                            <option value="Mrs">Mrs</option>
                            <option value="Miss">Miss</option>
                        </select>
                    </div>
                    <div className="resister-form">
                        <span>Full Name</span>
                        <input type="text" className='inputs' placeholder='Write your name' required value={name} onChange={(e)=>setName(e.target.value)} />
                    </div>
                    <div className="resister-form">
                        <span>Phone</span>
                        <input type="number" className='inputs' placeholder='Write your mobile number'required value={phone} onChange={(e)=>setPhone(e.target.value)}/>
                    </div>
                    <div className="resister-form">
                        <span>Email</span>
                        <input type="email" className='inputs' placeholder='Write your email' required value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    </div>
                    <div className="resister-form">
                        <span>Password</span>
                        <input type="password" className='inputs' placeholder='Write your Password' required value={pass} onChange={(e)=>setPass(e.target.value)}/>
                    </div>
                    <div className="resister-form">
                        <span>Street</span>
                        <input type="text" className='inputs' placeholder='Write your street' required value={street} onChange={(e)=>setStreet(e.target.value)}/>
                    </div>
                    <div className="resister-form">
                        <span>City</span>
                        <input type="text" className='inputs' placeholder='Write your city' required value={city} onChange={(e)=>setCity(e.target.value)}/>
                    </div>
                    <div className="resister-form">
                        <span>Pincode</span>
                        <input type="number" className='inputs' placeholder='Write your pincode number' required value={pincode} onChange={(e)=>setPincode(e.target.value)}/>
                    </div>
                    <button type="submit" id='btn' className="btn btn-primary">Create Account</button>
                    <a id='logins' href='/login'>Login</a>
                </form>
            </div>
        </div>
    )
}

export default Resister
