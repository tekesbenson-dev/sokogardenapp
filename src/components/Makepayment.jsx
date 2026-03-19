import axios from 'axios';
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from './Loader';

const Makepayments = () => {

  const location = useLocation();
  const product = location.state || []; // ✅ prevent crash

  const navigate = useNavigate();

  const [number, setNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async(e)=>{
    e.preventDefault();

    setLoading(true);

    try {
      const formdata = new FormData();

      formdata.append("phone", number);
      formdata.append("amount", product[3]); // ✅ FIXED

      const response = await axios.post(
        "https://kbenkamotho.alwaysdata.net/api/mpesa_payment",
        formdata
      );

      setLoading(false);
      setSuccess(response.data.message);

    } 
    catch (error) {
      setLoading(false);
      setError(error.message);
    }
  }

  return (
    <div className='row justify-content-center'>

      <div className='col-md-6'>
        <div className='card shadow p-4'>

          <h1 className='text-success text-center mb-3'>
            Make Payment - Lipa Na Mpesa
          </h1>

          <div className="col-md-1">
            <input
              type="button"
              className="btn btn-primary"
              value="<- Back"
              onClick={() => navigate("/") }
            />
          </div>

          {product.length > 0 ? ( // ✅ FIXED
            <>
              <img 
                src={`https://bensontekes.alwaysdata.net/static/images/${product[4]}`} // ✅ FIXED
                alt={product[1]} // ✅ FIXED
                className='product_img mb-3'
              />

              <div className='card-body text-center'>
                <h4 className='text-info'>{product[1]}</h4> {/* ✅ FIXED */}

                <p className='text-dark'>
                  {product[2]} {/* ✅ FIXED */}
                </p>

                <h5 className='text-warning mb-3'>
                  <b>Ksh {product[3]}</b> {/* ✅ FIXED */}
                </h5>

                <form onSubmit={handleSubmit}>
                  {loading && <Loader />}

                  <h5 className='text-success'>{success}</h5>
                  <h5 className='text-danger'>{error}</h5>

                  <input 
                    type="number"
                    className='form-control mb-3'
                    placeholder='Enter phone number 2547XXXXXXXX'
                    required
                    value={number}
                    onChange={(e)=>setNumber(e.target.value)}
                  />

                  <input 
                    type="submit"
                    value="Make Payment"
                    className='btn btn-success w-100'
                  />
                </form>
              </div>
            </>
          ) : (
            <p className='text-danger text-center'>
              No product selected 😬
            </p>
          )}

        </div>
      </div>

    </div>
  )
}

export default Makepayments;