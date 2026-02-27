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
            const response = await axios.post('http://localhost:3000/api/auth/login', form)
            console.log(response.data);
            // alert(response.data.msg)
            localStorage.setItem('token', response.data.token)
        } catch(error){
            console.log(error.message);
            alert('User not found. Redirecting to signup...')
            window.location.href='/signup'
        }   
    }

    return(
        <>
        <form action="" onSumbit={handleForm}>
            <h2>Login </h2>   <br />
            <input type='text'     name='username' placeholder='Enter Username / Email' onChange={handleChange}/>   <br />
            <input type='password' name='password' placeholder='Enter Password'         onChange={handleChange}/>   <br />
            <button>Login</button>
        </form>
        </>
    )
}

export default Login