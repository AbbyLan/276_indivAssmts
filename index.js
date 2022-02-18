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

let app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => res.render('pages/index'));
app.get('/database', (req,res) => {
  let getRectanglesQuery = `SELECT * FROM rectangle`;
  pool.query(getRectanglesQuery, (error,result) => {
    if (error){
      res.send(error);
    }
    let results = {'rows':result.rows}
    res.render('pages/db', results);
  });
});

app.get('/add', (req,res) => {
  res.render('pages/addRec.ejs');
})
  
app.post('/add_new', (req,res) => {
  // console.log("req: " + req);
  // console.log("req.body" + req.body);
  let name = req.body.rectangle_name;
  let width = req.body.width;
  let height = req.body.height;
  let color = req.body.color;
  let age = req.body.age;
  let gender = req.body.gender;

  console.log(name,width,height,color,age,gender);
  let addRectangleQuery = `INSERT INTO rectangle VALUES ('${name}', ${width}, ${height}, '${color}', ${age}, '${gender}');`;
  
  pool.query(addRectangleQuery,function(error,results,fields){
    if(error){
      res.send(error);
    } else {
      console.log("Your rectangle added successfully!");
      res.redirect('/database');
    }
  });
});

app.get('/delete', (req,res) => {
  res.render('pages/deleteRec');
});

app.post('/dele', (req,res) => {
  let name = req.body.recName;
  let deleteQuery = `DELETE FROM rectangle WHERE "NAME" = '${name}';`;
  pool.query(deleteQuery, function(err, result, fields) {
    //console.log("delet reslut", result)
    if (err) {
        console.log("Failed to delete from Tokimon family");
        res.redirect('/db');
    } else {
        if (result.rowCount == 0) {
            console.log("delete 0 rows");
            res.redirect('/db');
        } else {
            console.log("success to delete from Tokimon family");
            res.redirect('/db');
        }
    }
});


// app.post('/display', (req,res) => {
//   console.log("post request for /add");
//   var name = req.body.name;
//   var age = req.body.age;
//   res.send(`rectangle name: ${name}`);
//   res.send(`rectangle age: ${age}`);
// });

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
