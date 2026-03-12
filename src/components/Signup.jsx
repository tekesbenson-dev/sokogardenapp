import axios from "axios";
import React, {useState} from "react"
import { Link } from 'react-router-dom';

const Signup = () => {

  // initialize the hooks
  const [username,setusername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone,setPhone] = useState("");

  //Define the three states an application will move to
  const [loading, setLoading] =useState("");
  const [success, setSuccess] =useState("");
  const [error, setError] = useState("");

  //elow is a function that will handle the submit action
  const handleSubmit =(e) => {

    //Below we prevent our site from reloading
    e.preventDefault()

    // Update our loading hook with a message that will bee displayed to other users that are trying to register
    setLoading("Please wait...Registration in progress..")

    try{

      //create a form data object that will eneable you to capture the four details entered in the form
      const formdata = new FormData();

      // insert the four details(username, email, password, phone)
      formdata.append("username",username);
      formdata.append("email",email);
      formdata.append("password",password);
      formdata.append("phone",phone);

    const response = axios.post("https://bensontekes.alwaysdata.net/api/signup",formdata)

      // show success message (temporary before connecting API)
      setLoading("")
      setSuccess("Registration submitted successfully")

    }

    catch(error){

      setLoading("")
      setError("Something went wrong")

    }

  }

  return (

 <div className='row justify-content-center mt-4'>
  <div className="card col-md-6 shadow p-4">

    <h1 className='text-primary'>Sign Up</h1>

    {/* messages that appear when state changes */}
    {loading}
    {success}
    {error}

     <form onSubmit={handleSubmit}>

      <input
        type='text'
        placeholder='Enter the username'
        className='form-control'
        value={username}
        onChange={(e)=>setusername(e.target.value)}
        required/>
      <br/>

      {/* {username} */}

      <input
        type="text"
        placeholder='Enter the email Address'
        className='form-control'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required/>
      <br/>

      <input
        type='password'
        placeholder='Enter your password'
        className='form-control'
        value= {password}
        onChange={(e) => setPassword(e.target.value)}
        required/>
      <br/>

      <input
        type='number'
        placeholder='Enter your phone number'
        className='form-control'
        value={phone}
        onChange={(e)=> setPhone(e.target.value)}
        required/>
      <br/>

      <input
        type="submit"
        value="Sign Up"
        className="btn btn-primary"
      />

      <br/> <br/>

      Already have an account?<Link to ={'/signin'}>signin</Link>

     </form>

  </div>
 </div>

  )
}

export default Signup;

