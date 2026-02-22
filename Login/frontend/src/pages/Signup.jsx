import { useState } from 'react'
import axios from 'axios'

function Signup(){

    const [ form, setForm ] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    function preventDefault(e){
        e.preventDefault()
    }
    return(
        <>
        <form action="" onSubmit={preventDefault}>

        <h2>Sign Up</h2>

        <input type='text' placeholder='Enter username' onChange={(e) =>{e.target.value}} /> <br />
        <input type='email' placeholder='Enter Email' onChange={(e) =>{e.target.value}} /> <br />
        <input type='password' placeholder='Enter Password' onChange={(e) =>{e.target.value}} /> <br />
        <input type='password' placeholder='Enter Confirm Password' onChange={(e) =>{e.target.value}} /> <br />
       
        <button>Sign Up</button>

        </form>
        </>
    )
}

export default Signup