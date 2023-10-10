import Genre from "../models/genre.js";
import slugify from "slugify";

export const create = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name.trim()) {
      return res.json({ error: "Name is required" });
    }
    const existingGenre = await Genre.findOne({ name });
    if (existingGenre) {
      return res.json({ error: "Already exists" });
    }

    const genre = await new Genre({ name, slug: slugify(name) }).save();
    res.json(genre);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
};

export const update = async (req, res) => {
  try {
    const { name } = req.body;
    const { genreId } = req.params;
    const genre = await Genre.findByIdAndUpdate(
      genreId,
      {
        name,
        slug: slugify(name),
      },
      { new: true }
    );
    res.json(genre);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};

export const remove = async (req, res) => {
  try {
    const removed = await Genre.findByIdAndDelete(req.params.genreId);
    res.json(removed);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};

export const list = async (req, res) => {
  try {
    const all = await Genre.find({});
    res.json(all);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};

export const read = async (req, res) => {
  try {
    const genre = await Genre.findOne({ slug: req.params.slug });
    res.json(genre);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};
