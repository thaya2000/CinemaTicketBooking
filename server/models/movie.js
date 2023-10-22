import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      maxlength: 160,
    },
    slug: {
      type: String,
      lowercase: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 2000,
    },
    genre: {
      type: ObjectId,
      ref: "Genre",
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    actors: [
      {
        type: ObjectId,
        ref: "Actor",
      },
    ],
    releaseDate: {
      type: Date,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    poster: {
      data: Buffer,
      contentType: String,
    },
    status: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Movie", movieSchema);
