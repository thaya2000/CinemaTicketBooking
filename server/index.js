import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import morgan from "morgan";
import authRoutes from "./routes/auth.js";
import genreRoutes from "./routes/genre.js";
import movieRoutes from "./routes/movie.js";
import actorRoutes from "./routes/actor.js";
import cors from "cors";

dotenv.config();

const app = express();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log("DB Connection Error: ", err));

// middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// router middlewares
app.use("/api", authRoutes);
app.use("/api", genreRoutes);
app.use("/api", movieRoutes);
app.use("/api", actorRoutes);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Node server is running on port ${port}`);
});
