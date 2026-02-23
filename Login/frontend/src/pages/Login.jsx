import { useState } from 'react'
import axios  from 'axios'

function Login(){

    const [ form, setForm ] = useState({
        username:'',
        password:''
    })

    function handleChange(e){

    }
    function handleForm(e){
        e.preventDefault()
    }
    return(
        <>
        <form action="" onSumbit={handleForm}>
            <h2>Login </h2>
            <input type='text'     name='username' placeholder='Enter Username / Email' onChange={handleChange}/>
            <input type='password' name='password' placeholder='Enter Password'         onChange={handleChange}/>
            <button>Login</button>
        </form>
        </>
    )
}

export default Login