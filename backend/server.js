require('dotenv').config()


const express = require('express')
const mongoose = require('mongoose')
const profileRoutes = require('./routes/profiles')
const userRoutes = require('./routes/user') 


//express app
const app = express()

//middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//call all the profileRoutes
app.use('/api/profiles', profileRoutes)
app.use('/api/user', userRoutes)


//connect to database
mongoose.connect(process.env.MONGO_URI_PROFILES)
    .then(() => {
        //listen for requests
        app.listen(process.env.PORT, () => {
            console.log('connected to database and listening on port 4000')
        })
    })
    .catch((error) => {
        console.log(error)
    })

