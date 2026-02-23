function Login(){

    function handleChange(e){
        
    }
    function handleForm(e){
        e.preventDefault()
    }
    return(
        <>
        <form action="" onSumbit={handleForm}>
            <h2>Login </h2>
            <input type='text'      placeholder='Enter Username / Email' onChange={handleChange}/>
            <input type='password'  placeHolder='Enter Password'         onChange={handleChange}/>
            <button>Login</button>
        </form>
        </>
    )
}

export default Login