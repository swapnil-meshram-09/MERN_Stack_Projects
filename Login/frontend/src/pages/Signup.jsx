import { useState } from 'react'
import axios from 'axios'

function Signup(){

    const [ form, setForm ] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    async function handleForm(e){
        e.preventDefault()

        try{
           const response =  await axios.post('http://localhost:3000/api/auth/signup', form)
           alert(response.data.msg)
           window.location.href='/'

        } catch(error){
            console.log(error.message);   
        }
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