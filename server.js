import mongoose from "mongoose";
import app from './app.js';

const { connect } = mongoose;

const database = "mongodb://localhost:27017/devship";

const port = 5000;

connect(database).then((res)=>{
    console.log("DB Connected");
})

app.listen(port, ()=>{
    console.log(
        'Connected'
    )
})