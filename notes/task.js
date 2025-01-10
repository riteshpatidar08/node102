const express = require('express');

const app = express();

let books = [];

//NOTE middlewares to parse the incoming data from
app.use(express.json());

//NOTE logger middlware to log every request , palced before every api
app.use((req, res, next) => {
  const date = new Date(Date.now());
  console.log(date);
  const time = date.toLocaleTimeString();
  console.log(`${req.method} method hit on the ${req.url} route at ${time}`);
  next();
});


app.get('/', (req, res) => {
  res.json({
    message: 'hello world',
  });
});

//create a new book
app.post('/books', (req, res) => {
  const newBook = { id: books.length + 1, ...req.body };
  books.push(newBook);
  console.log(books);


  res.json({
    message: 'new book created successfully',
    data: newBook,
  });
});


//get all books
app.get('/books', (req, res) => {
  res.status(200).json({
    books,
  });
});


//get single book detail by using id
app.get('/books/:id', (req, res) => {
  const book = books.find((book) => book.id === parseInt(req.params.id));
  console.log(book);
  res.status(200).json({
    book,
  });
});


app.delete('/books/:id', (req, res) => {
  const bookIndex = books.findIndex(
    (book) => book.id === parseInt(req.params.id)
  );
  console.log(bookIndex);
  books.splice(bookIndex, 1);
  res.status(200).json({
    books,
  });
});


//handling unmatched route in our application always place after our all api's
app.use((req,res)=>{
    res.status(404).json({
        message : `the requested ${req.url} not found`
    })
})

app.listen(3000, () => {
  console.log('server is running on the port 3000');
});
