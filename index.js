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

app.post('/add_new', (req,res) => {
  console.log("req: " + req);
  console.log("req.body" + req.body);
  var name = req.body.rectangle_name;
  var width = req.body.width;
  var height = req.body.height;
  var color = req.body.color;
  var age = req.body.age;
  var gender = req.body.gender;

  console.log(name,width,height,color,age,gender);
  var addRectangleQuery = `INSERT INTO rectangle VALUES ('${name}', ${width}, ${height}, '${color}', ${age}, '${gender}');`;
  
  pool.query(addRectangleQuery,function(error,results,fields){
    if(error){
      res.send(error);
    } else {
      console.log("Your rectangle added successfully!");
      res.redirect('/add');
    }
  });
});

app.post('/display', (req,res) => {
  console.log("post request for /add");
  var name = req.body.name;
  var age = req.body.age;
  res.send(`rectangle name: ${name}`);
  res.send(`rectangle age: ${age}`);
});

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
