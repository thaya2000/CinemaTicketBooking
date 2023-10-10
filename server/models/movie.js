const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const movieSchema = new Schema(
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
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    actors: {
      type: [String],
    },
    releaseDate: {
      type: Date,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    trailerUrl: {
      type: String,
    },
    poster: {
      data: Buffer,
      contentType: String,
    },
    screenings: [
      {
        cinemaHall: {
          type: ObjectId,
          ref: "CinemaHall",
          required: true,
        },
        showtime: {
          type: Date,
          required: true,
        },
        availableSeats: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Movie", movieSchema);
