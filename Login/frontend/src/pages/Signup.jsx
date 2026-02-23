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

    function handleChange(e){
        setForm({...form, [e.target.name]: e.target.value})
    }

    return(
        <>
        <form action="" onSubmit={handleForm}>

        <h2>Sign Up</h2>

        <input type='text'      name='username'          placeholder='Enter Username'         onChange={handleChange} /> <br />
        <input type='email'     name='email'             placeholder='Enter Email'            onChange={handleChange} /> <br />
        <input type='password'  name='password'          placeholder='Enter Password'         onChange={handleChange} /> <br />
        <input type='password'  name='confirmPassword'   placeholder='Enter Confirm Password' onChange={handleChange} /> <br />
       
        <button>Sign Up</button>

        </form>
        </>
    )
}

export default Signup