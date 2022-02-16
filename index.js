process.env.NODE_TLS_REJECT_UNAUTHORIZED='0'
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const { Pool } = require('pg');
// var pool;
// pool = new Pool({
//   // connectionString: 'postgres://{username}:{password}@localhost/users'
//   // connectionString: 'postgres://haochenyang:root@localhost/users'
//   connectionString: process.env.DATABASE_URL
// })
var pool = new Pool({
  connectionString : process.env.DATABASE_URL
})

pool.connect();

var app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => res.render('pages/index'));
app.get('/database', (req,res) => {
  var getRectanglesQuery = `SELECT * FROM rectangle`;
  pool.query(getRectanglesQuery, (error,result) => {
    if (error){
      res.send(error);
    }
    var results = {'rows':result.rows}
    res.render('pages/db', results);
  })
})
app.post('/adduser', (req,res) => {
  console.log("post request for /adduser");
  var recName = req.body.recName;
  var age = req.body.age;
  res.send(`rectanglename: ${recName}`)
})


app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
