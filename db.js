import mongoose from "mongoose";
import * as dotenv from "dotenv";

// Env Configure
dotenv.config();

export default function dbConnetion() {
  const MongoURL = process.env.MONGOURL;

  try {
    mongoose.connect(MongoURL);
    console.log("Data Base Connected 8060");
  } catch (error) {
    console.log("Error connecting DB----", error);
  }
}

//   const params = {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   };
