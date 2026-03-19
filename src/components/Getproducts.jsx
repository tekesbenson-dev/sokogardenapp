import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';

const Getproducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // ✅ FIXED

  const navigate = useNavigate();

  const img_url = "https://bensontekes.alwaysdata.net/static/images/";

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        "https://bensontekes.alwaysdata.net/api/get_products"
      );

      console.log("API DATA 👉", response.data);

      setProducts(response.data || []);
      setLoading(false);

    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="row">
      <h2 className="text-success">Available products</h2>

      {loading && <Loader />}
      <h4 className="text-danger">{error}</h4>

      {products.map((product, index) => (
        <div className="col-md-3 mb-3" key={product[0] || index}>
          <div className="card product-card shadow">

            {/* ✅ FIXED IMAGE */}
            <img
              src={product[4] ? img_url + product[4] : ""}
              alt={product[1] || "product"}
              className="product_img mt-3"
              style={{ height: "200px", objectFit: "cover" }}
            />

            <div className="card-body">
              <h5 className="text-primary">
                {product[1] || "No name"}
              </h5>

              {/* ✅ FIXED DESCRIPTION */}
              <p className="text-dark">
                {product[2]
                  ? product[2].slice(0, 100)
                  : "No description available"}...
              </p>

              <h4 className="text-warning">
                <b>Ksh {product[3] || 0}</b>
              </h4>

              <button
                className="btn btn-outline-info"
                onClick={() =>
                  navigate("/makepayment", { state: product })
                }
              >
                Purchase Now
              </button>
            </div>

          </div>
        </div>
      ))}
    </div>
  );
};

export default Getproducts;