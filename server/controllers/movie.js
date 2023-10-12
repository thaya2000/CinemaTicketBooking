import Movie from "../models/movie.js";
import fs from "fs";
import slugify from "slugify";

export const create = async (req, res) => {
  try {
    // console.log(req.fields);
    // console.log(req.files);
    const {
      title,
      description,
      genre,
      duration,
      director,
      actors,
      releaseDate,
      language,
      trailerUrl,
    } = req.fields;
    const { poster } = req.files;

    console.log(req.fields);

    // validation
    switch (true) {
      case !title.trim():
        return res.json({ error: "Title is required" });
      case !description.trim():
        return res.json({ error: "Description is required" });
      case !genre.trim():
        return res.json({ error: "Genre is required" });
      case !duration.trim():
        return res.json({ error: "Duration is required" });
      case !director.trim():
        return res.json({ error: "Director is required" });
      case !actors.trim():
        return res.json({ error: "Actor is required" });
      case !releaseDate.trim():
        return res.json({ error: "ReleaseDate is required" });
      case !language.trim():
        return res.json({ error: "Language is required" });
      case !trailerUrl.trim():
        return res.json({ error: "TrailerUrl is required" });
      case poster && poster.size > 1000000:
        return res.json({ error: "Image should be less than 1mb in size" });
    }

    // create movie
    const movie = new Movie({
      ...req.fields,
      slug: slugify(title),
    });

    if (poster) {
      movie.poster.data = fs.readFileSync(poster.path);
      movie.poster.contentType = poster.type;
    }

    await movie.save();
    res.json(movie);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.message);
  }
};

export const list = async (req, res) => {
  try {
    const movies = await Movie.find({})
      .populate("genre")
      .select("-poster")
      .limit(12)
      .sort({ createdAt: -1 });

    res.json(movies);
  } catch (err) {
    console.log(err);
  }
};

export const read = async (req, res) => {
  try {
    const movie = await Movie.findOne({ slug: req.params.slug })
      .select("-poster")
      .populate("genre");

    res.json(movie);
  } catch (err) {
    console.log(err);
  }
};

export const poster = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.movieId).select("poster");
    if (movie.poster.data) {
      res.set("Content-Type", movie.poster.contentType);
      return res.send(movie.poster.data);
    }
  } catch (err) {
    console.log(err);
  }
};

export const remove = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.movieId).select(
      "-poster"
    );
    res.json(movie);
  } catch (err) {
    console.log(err);
  }
};

export const update = async (req, res) => {
  try {
    const {
      title,
      description,
      genre,
      duration,
      director,
      actors,
      releaseDate,
      language,
      trailerUrl,
    } = req.fields;
    const { poster } = req.files;

    // validation
    switch (true) {
      case !title.trim():
        return res.json({ error: "Title is required" });
      case !description.trim():
        return res.json({ error: "Description is required" });
      case !genre.trim():
        return res.json({ error: "Genre is required" });
      case !duration.trim():
        return res.json({ error: "Duration is required" });
      case !director.trim():
        return res.json({ error: "Director is required" });
      case !actors.trim():
        return res.json({ error: "Actor is required" });
      case !releaseDate.trim():
        return res.json({ error: "ReleaseDate is required" });
      case !language.trim():
        return res.json({ error: "Language is required" });
      case !trailerUrl.trim():
        return res.json({ error: "TrailerUrl is required" });
      case poster && poster.size > 1000000:
        return res.json({ error: "Image should be less than 1mb in size" });
    }

    // update product
    const movie = await Movie.findByIdAndUpdate(
      req.params.movieId,
      {
        ...req.fields,
        slug: slugify(title),
      },
      { new: true }
    );

    if (poster) {
      movie.poster.data = fs.readFileSync(poster.path);
      movie.poster.contentType = poster.type;
    }

    await movie.save();
    res.json(movie);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};
