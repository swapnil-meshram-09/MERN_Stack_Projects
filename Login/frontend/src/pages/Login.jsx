function Login(){
    return(
        <>
        <form action="" onSumbit={handleForm}>
            <h2>Login </h2>
            <input type='text'      placeholder='Enter Username / Email'/>
            <input type='password'  placeHolder='Enter Password'/>
            <button>Login</button>
        </form>
        </>
    )
}

export default Login