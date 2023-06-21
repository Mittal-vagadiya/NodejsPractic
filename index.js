const express = require('express');
const { errorHandler } = require('./middlewear/errorHandler');
const dotenv = require('dotenv').config()
const connectDb = require('./config/dataBase');

const app = express();
const PORT = process.env.PORT || 7000;
app.use(express.json())

connectDb()
app.use('/api/contacts', require('./Routes/contactRoutes'))
app.use('/api/newUser', require('./Routes/userRoutes'))

app.use(errorHandler)

app.listen(PORT, () => {
    console.log("Server is running on", PORT)
})