import express from 'express';//เปลี่ยน type ใน package.json ให้เป็น module
import mysql from 'mysql2';

const app = express();

const db = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : '1234',
  database : 'test',
  port : 3306
})

// if there is a auth error
// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';

app.use(express.json());

app.get ('/', (req, res)=>{
  res.json('hello world');
})

app.get('/books', (req, res)=>{
  const q = 'SELECT * FROM books';
  db.query(q,(err,data)=>{
    if (err) return res.json(err);
    return res.json(data);
  })
})

app.post('/books', (req, res)=>{
  const q = 'INSERT INTO books (`title`,`desc`,`cover`) VALUES (?,?,?)';
  const values = [
    req.body.title,
    req.body.desc,
    req.body.cover
  ];

  db.query(q,values,(err,data)=>{
    if (err) return res.json(err);
    return res.json('books added successfully');
  })
})

app.listen(3000,()=>{
  console.log('Server is running on port 3000');
})