const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

// Conexion a DB
const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@cluster0.4temp.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;
mongoose.connect(uri,
    { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
)
    .then(() => console.log('Connected database')) 
    .catch(e => console.error('Error DB', e));