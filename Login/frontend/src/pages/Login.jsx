function Login(){

    function preventDefault(e){
        e.preventDefault()
    }
    return(
        <>
        <form action="" onSubmit={preventDefault}>
            <h1>Login</h1>
            <input type='text' placeholder='Enter username' onChange={(e) =>{e.target.value}}/> <br />
            <input type='password' placeholder='Enter password' onChange={(e) =>{e.target.value}}/> <br />
            <button>Login</button>
        </form>
        </>
    )
}
export default Login