const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const port = 7610

const app = express()
app.use(express.static(__dirname))
app.use(express.urlencoded({extended:true}))


mongoose.connect('mongodb://127.0.0.1:27017/students')
const db = mongoose.connection


db.once('open',()=>{
 console.log("mongo db connection succesful")
})

const userSchema = new mongoose.Schema({
  regd_no:String,
  name:String ,
  email:String ,
  branch:String
})

const users = mongoose.model("data",userSchema)


app.get('/',(req,res)=>{
res.sendFile(path.join(__dirname ,'index.html'))
})


app.post('/post',async(req,res)=>{
  const {regd_no ,name ,email ,branch} = req.body
  const user = new users({
      regd_no,
      name,
      email,
      branch
  })
  await user.save()
  console.log(user)
  res.send("SUBMITED SUCCESFULLY")
})

app.listen(7610, () => {
    console.log('Server is running on port 7610');
  });
  