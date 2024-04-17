import mongoose from "mongoose";

//  Connect to MongoDB
const dbConnection = () => {
  mongoose
    .connect(process.env.DB_URI as string)
    .then((res) => {
      console.log(`Database Connected: ${res.connection.host}`);
    })
    .catch((err) => {
      console.log(`Database Error: ${err}`);
      process.exit(1);
    });
};

export default dbConnection;
