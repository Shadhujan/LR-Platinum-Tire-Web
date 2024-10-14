// server.js
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import cartRoutes from "./routes/CarRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.use("/api/cart", cartRoutes);

mongoose
  .connect(
    "mongodb+srv://isurugayantha:ooYMi2RuNCTthofk@bike.j4va9.mongodb.net/?retryWrites=true&w=majority&appName=bike",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.log(err));
