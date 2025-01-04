const express = require('express');

const app = express();

app.get('/get_products', (req, res) => {
  const productData = false

  if (productData) {
    res.json({
      data: productData,
      message: 'Product successfully fetched',
    });
  } else {
    res.status(404).json({
      message: 'Product not found',
    });
  }
});



app.listen(3000, () => {
  console.log('server is connected');
});
