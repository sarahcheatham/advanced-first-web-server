const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(express.static('public'));

const users = require('./state').users;

let usersCount = users.length;


//Gets all the users
app.get("/users", function(req, res, next){
  res.json(users)
});


//Changes the id of each user to the index + 1
//Returns the user object from the users array that has the _id == userId 
app.get("/users/:userId", function(req, res, next){
  users.map((item, index)=>{
    item._id = index + 1;
  })
  return req.params.userId <= usersCount ? res.json(users[req.params.userId - 1]) : res.json('user not found')
})


//Adding a user 
//Updating the ._id of the new user
app.post("/users/:userId", function(req, res){
  users.push(req.body)
  usersCount++
  users.map((item, index)=>{
    return item._id === index + 1 ? item._id = index + 1 : item._id = usersCount;
  })
  return res.json(users)
});

//Changes a key value on the user object with the userId path
app.put("/users/:userId", function(req, res){
  if (req.params.userId <= usersCount){
    users.map((item, index)=>{
      return item._id == req.params.userId ? item.name = "Mr. Rogers" : item.name = item.name
    })
    return res.json(users[req.params.userId - 1])
  } else {
    res.json('user not found')
  } 
})

//Default function if the user types in a wrong path
app.use(function(req, res){
  return res.json('not found')
})


//3002 is the port
app.listen(3002, (err) => {
if (err) {
  return console.log("Error", err);
}
console.log("Web server is on");
});
