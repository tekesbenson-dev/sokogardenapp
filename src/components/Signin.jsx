import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Signin = () => {

  // Define the two hooks for capturing/storing the users input

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  // declare the three additional hooks
  const[loading, setLoading] = useState("")
  const[success, setSuccess] = useState("")
  const[error, setError] = useState("")

  // below is the function to handle the signin action
  const handlesubmit = async (e) => {

    // prevent the page from reloading
    e.preventDefault()

    // update the loading hook with a message
    setLoading("PLease wait...account in search")

    try{

      // create a form data object that will capture email and password
      const formdata = new FormData()

      // append the two details
      formdata.append("email", email)
      formdata.append("password", password)

      // send the request to the API
      const response = await axios.post(
        "https://bensontekes.alwaysdata.net/api/signin",
        formdata
      )

      // update success message
      setLoading("")
      setSuccess(response.data.message)

    }

    catch(error){

      // update error message
      setLoading("")
      setError("Login failed. Please check your email or password.")

    }

  }

  return (
    <div className='row justify-content-center mt-4'>
     <div className="col-md-6 card shadow p-4">
      <h1 className='text-warning'>Sign in</h1>

      <h5 className="text-info">{loading}</h5>
      <h5 className="text-success">{success}</h5>
      <h5 className="text-danger">{error}</h5>

      <form onSubmit={handlesubmit}>

        <input 
        type="email" 
        placeholder='Enter your email address here...'
        className='form-control'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        /> 
        <br />

        <input 
        type="password"
        placeholder='Enter password here'
        className='form-control'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required 
        /> 
        <br />

        <input 
        type="submit" 
        value="sign in"
        className='btn btn-primary'
        /> <br /> <br />
         Already have an account?<Link to ={'/signup'}>Register</Link>
        

      </form>
     </div>
    </div>
  )
}

export default Signin
