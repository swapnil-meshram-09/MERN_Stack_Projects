import { useState } from 'react'
import axios from 'axios'

function Signup(){

    const [ form, setForm ] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    function handleForm(e){
        e.preventDefault()
    }
    return(
        <>
        <form action="" onSubmit={handleForm}>

        <h2>Sign Up</h2>

        <input type='text'      name='username'          placeholder='Enter Username'         onChange={(e) =>{e.target.value}} /> <br />
        <input type='email'     name='emai'              placeholder='Enter Email'            onChange={(e) =>{e.target.value}} /> <br />
        <input type='password'  name='password'          placeholder='Enter Password'         onChange={(e) =>{e.target.value}} /> <br />
        <input type='password'  name='confirmPassword'   placeholder='Enter Confirm Password' onChange={(e) =>{e.target.value}} /> <br />
       
        <button>Sign Up</button>

        </form>
        </>
    )
}

export default Signup