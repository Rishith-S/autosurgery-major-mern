const express = require('express')
const corsConfig = require('../backend/configuration/corsConfig')
const db = require('../backend/configuration/dbConfig.js')
const allowCredentials = require('../backend/middlewares/allowCredentials.js')
const cors = require('cors')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const path = require('path')
const app = express()

dotenv.config();

app.use(allowCredentials)
app.use(cors())
app.use(cookieParser())
app.use(express.json())

db()

app.use('/auth',require('../backend/authentication.js'))

// Serve static files from the 'build' folder
app.use(express.static(path.join(__dirname, 'build')));

// Define wildcard route to serve 'index.html' for all routes
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT,()=>{
    console.log(`app listening to port ${process.env.PORT}`)
})