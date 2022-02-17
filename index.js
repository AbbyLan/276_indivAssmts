const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const { Pool } = require('pg');
// const pool = new Pool({
//   // connectionString: 'postgres://{username}:{password}@localhost/users'
//   // connectionString: 'postgres://haochenyang:root@localhost/users'
//   connectionString: process.env.DATABASE_URL
// })
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

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
  });
});

app.get('/add', (req,res) => {
  res.render('addRec.ejs');
})

app.post('add_new', (req,res) => {
  params = JSON.parse(JSON.stringify(req.body));
  var total = 0;
  for (var key in params) {
    console.log("key in params: " + key);
    if (key != 'trainer' && key != 'tokimon_name') {
        if (isNaN(parseInt(params[key]))) {
            console.log(`wrong type for ${key}, putting value as 0`);
            params[key] = 0;
        } else {
            params[key] = parseInt(params[key]);
            total += params[key];
        }
    }
  }
  insertQuery = `INSERT INTO public."RECTANGLE"(
      "NAME", "WIDTH", "HEIGHT", "COLOR", "AGE", "GENDER")
  VALUES( ${params.name} , ${params.width}, ${params.height} , ${params.color} , ${params.age}, ${params.gender} )`
      console.log(insertQuery)
  pool.query(insertQuery, function(err, result, fields) {
      if (err) {
          console.log("fail to insert to Tokimon family")
          res.redirect('/');
      } else {
          console.log("success to insert from Tokimon family")
          res.render('addRec.ejs')
      }
  });
})

app.post('/display', (req,res) => {
  console.log("post request for /add");
  var name = req.body.name;
  var age = req.body.age;
  res.send(`rectangle name: ${name}`);
  res.send(`rectangle age: ${age}`);
});

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
