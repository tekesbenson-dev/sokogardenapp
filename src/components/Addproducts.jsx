import React, { useState } from 'react'
import axios from "axios"
import Loader from "./Loader"   // ✅ FIXED

const Addproducts = () => {

  // introduce products
  const [product_name, setProductName] = useState("");
  const [product_description, setProductDescription] = useState("");
  const [product_cost, setProductCost] = useState("");

  // ⚠️ IMPORTANT: must be null for file handling (not "")
  const [product_photo, setProductPhoto] = useState(null);

  // ✅ NEW: preview image before upload
  const [preview, setPreview] = useState(null);

  // states for system messages
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")

  // function that handles form submission
  const handleSubmit = async (e) => {

    // prevent page reload
    e.preventDefault()

    // ⚠️ IMPORTANT: prevent submitting if no file selected
    if (!product_photo) {
      setError("Please select an image")
      return
    }

    // activate loader
    setLoading(true)

    try{

      // create formdata object
      const formdata = new FormData()

      // append product details
      formdata.append("product_name", product_name)
      formdata.append("product_description", product_description)
      formdata.append("product_cost", product_cost)

      // ⚠️ IMPORTANT: this must be the actual file object
      formdata.append("product_photo", product_photo)

      // send request to API
      const response = await axios.post(
        "https://bensontekes.alwaysdata.net/api/addproduct",
        formdata,
        {
          // ⚠️ IMPORTANT: ensures file upload works properly
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      )

      // stop loader
      setLoading(false)

      // show success message
      setSuccess(response.data.message)

      // ✅ NEW: clear form after success
      setProductName("")
      setProductDescription("")
      setProductCost("")
      setProductPhoto(null)
      setPreview(null)

      // clear success message after 5 seconds
      setTimeout(() => {
        setSuccess("");
      }, 5000);

    }

    catch(error){

      // stop loader
      setLoading(false)

      // show error message
      setError("Product upload failed")

      console.log(error)

    }

  }

  return (
    <div className='row justify-content-center mt-4'>
      <div className="col-md-6 p-4 card shadow">

        <h3>Welcome to Add products</h3>

        {/* bind the loading hook */}
        {loading && <Loader />}

        {/* messages */}
        <h5 className='text-success'>{success}</h5>
        <h5 className='text-danger'>{error}</h5>

        <form onSubmit={handleSubmit}>

          <input 
          type="text" 
          placeholder='Enter product name'
          className='form-control'
          required
          value={product_name}
          onChange={(e) => setProductName(e.target.value)}
          /> 
          <br />

          <input 
          type="text" 
          placeholder='Enter product Description'
          className='form-control'
          required
          value={product_description}
          onChange={(e) => setProductDescription(e.target.value)}
          /> 
          <br />

          <input 
          type="number" 
          placeholder='Enter product price'
          className='form-control'
          required
          value={product_cost}
          onChange={(e) => setProductCost(e.target.value)}
          /> 
          <br />

          <label className='text-primary'>Product photo</label>

          <input 
          type="file" 
          className='form-control'
          required
          onChange={(e) => {
            // ⚠️ IMPORTANT: store actual file
            setProductPhoto(e.target.files[0])

            // ✅ NEW: show preview
            setPreview(URL.createObjectURL(e.target.files[0]))
          }}
          /> 
          <br />

          {/* ✅ NEW: Image Preview */}
          {preview && (
            <img src={preview} alt="preview" height="120" />
          )}

          <br />

          <input 
          type="submit"
          value="Add Product"
          className='btn btn-primary'
          /> 
          <br />

        </form>

      </div>
    </div>
  )
}

export default Addproducts