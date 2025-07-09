const mongoose = require('mongoose')
  mongoose.connect('mongodb+srv://megha11:akash12357@cluster0.a4jewim.mongodb.net/internship?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => {
        console.log("db connected")

    })
    .catch((err) => {
        console.log(err)
    })