const mongoose = require('mongoose');
const dotenv = require("dotenv").config();
const url = `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@cluster0.gei9gq5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/${process.env.DATABASE_NAME}`;

const connect = async () => {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(url);
    console.log("Connected to MongoDB is successful!");

  } catch (err) {
    console.log(`Connected failed at url ${url}!\n`, err);
  }
}

module.exports = { connect };
