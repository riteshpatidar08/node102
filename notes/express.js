const express = require('express');

const app = express();

app.use((req, res, next) => {
  console.log(req.body);
  next();
});

app.use(express.json()); //parse the incoming data into object req.body

//middlewares
app.use((req, res, next) => {
  console.log('...middleware 3', req.body);
  next();
});

// console.log(`${req.method} hit on the ${req.url} at ${Data.now()}`)


app.get('/get_products', (req, res) => {
  const productData = false;

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

app.post('/create_product', (req, res) => {
  console.log(req.body);
  console.log(req.name);
});

//put to update the item
app.put('/product/update/:id', (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  res.status(200).json({
    updatedData,
  });
});

app.listen(3000, () => {
  console.log('server is connected');
});

//middleware logger => kab request hit hui req.method and req.url

