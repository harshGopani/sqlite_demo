const express = require('express')
var sqlite3 = require('sqlite3').verbose();
var bodyParser = require('body-parser')
var db = new sqlite3.Database('./database/film_database',(err)=>{
    if(err){
        console.log(err);
    }
    console.log("connection successfully");
});
const app = express();
const port = 8000;
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/insert', (req, res) => {
    const {IMDb_id,name,year,IMDb_score} = req.body;
    console.log("data:",IMDb_id,name,year,IMDb_score);
    db.run(`INSERT INTO film_data (IMDb_id,NAME,year,IMDb_score) VALUES ('${IMDb_id}','${name}','${year}','${IMDb_score}')`,function(err,row){
        if(err){
            console.log("error = ",err);
        }else{
            console.log("data inserted successfully");
            res.status(200).send({
                success: true,
                message: "film data inserted successfully"
              });
        }
    })
  });

app.get('/featchData', async(req, res) => {
    const {IMDb_id} = req.body;
    console.log("id:",IMDb_id);
    db.all(`SELECT * FROM film_data WHERE IMDb_id = '${IMDb_id}' `,function(err,row){
        if(err){
            console.log("errrrrrrr");
            console.log("error = ",err);
        }else{
            res.status(200).send({
                success: true,
                message: row
              });
        }
    })
});

app.get('/allData', async(req, res) => {
    db.all(`SELECT * FROM film_data`,function(err,row){
        if(err){
            console.log("error = ",err);
        }else{
            res.status(200).send({
                success: true,
                message: row
              });
        }
    })
});


app.post('/addNewTable', (req, res) => {
    const {query} = req.body;
        db.run(`${query}`,function(err,row){
        if(err){
            console.log("errrrrrrr");
            console.log("error = ",err);
        }else{
            console.log("else");
        }   
    })
  });

app.listen(port, () => {
  console.log(`App listening on port ${port}!`)
});