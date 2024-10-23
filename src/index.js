// server.js
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import cartRoutes from "./routes/CarRoutes.js";
import productRoutes from "./routes/ProductRoute.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.use("/api/cart", cartRoutes);

// Routes
app.use("/api/products", productRoutes); // Register the product routes

mongoose
  .connect(
    "mongodb+srv://jeya38shadhujan:sha123@samplefirst.jg9ty.mongodb.net/SampleReview",
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
