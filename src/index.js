// require("dotenv").config({ path: "./env"});

import dotenv from "dotenv";
import connectDB from "./db/index.js";

// below files were imported when connecting db in index file
// import mongoose from "mongoose";
// import { DB_NAME } from "./constants";

dotenv.config({
  path: "./env",
});

connectDB() // async function returns promises, so we have to
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server running at port ${process.env.PORT}`);
    })
  }) //handle them also
  .catch((err) => {
    console.log("Mongo DB connection failed ", err);
  });






/*
import express from "express";

const app = express()(
  //iffis ---> immediately executing our functions
  async () => {
    try {
      await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
      app.on("error", (error) => {
        console.log("Error", error);
        throw error;
      });

      app.listen(process.env.PORT, () => {
        console.log(`App listening on port ${process.env.PORT}`);
      });
    } catch (error) {
      console.error("Error: ", error);
      throw error;
    }
  }
)();

*/
