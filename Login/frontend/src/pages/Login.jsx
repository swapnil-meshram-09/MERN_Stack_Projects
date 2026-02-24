import { useState } from 'react'
import axios  from 'axios'

function Login(){
    const [ form, setForm ] = useState({
        username:'',
        password:''
    })

    function handleChange(e){
        setForm({...form, [e.target.name]: e.target.value})
    }

    async function handleForm(e){
        e.preventDefault();

        try{
            const response = await axios.get('http://localhost:3000/api/auth/login', form)
            alert(response.data.msg)
            localStorage.setItem('token', response.data.token)
        } catch(error){
            
        }   
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