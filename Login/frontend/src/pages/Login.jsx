function Login(){

    function preventDefault(e){
        e.preventDefault()
    }
    return(
        <>
        <form action="" onSubmit={preventDefault}>
            <h2>Login</h2>
            <input type='text' placeholder='Enter Username / Email' onChange={(e) =>{e.target.value}}/> <br />
            <input type='password' placeholder='Enter Password' onChange={(e) =>{e.target.value}}/> <br />
            <button>Login</button>
        </form>
        </>
    )
}
export default Login