import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';


function App() {
  const [loading, setIsLoading] = useState(false);
  const [product, setProduct] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get('http://localhost:3000/get_products')
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
        setError(err.response.data.message)
      })
      .finally(() => {
        setIsLoading(false);
      });
  },[]);

  return <div>
  {error}
  </div>;
}

export default App;
