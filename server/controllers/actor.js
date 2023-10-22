import Actor from "../models/actor.js";
import slugify from "slugify";

export const create = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name.trim()) {
      return res.json({ error: "Name is required" });
    }
    const existingActor = await Actor.findOne({ slug: slugify(name) });
    if (existingActor) {
      return res.json({ error: "Already exist" });
    }

    const actor = await new Actor({ name, slug: slugify(name) }).save();
    res.json(actor);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
};

export const update = async (req, res) => {
  try {
    const { name } = req.body;
    const { actorId } = req.params;

    if (!name.trim()) {
      return res.json({ error: "Name is required" });
    }

    const existingActor = await Actor.findOne({ slug: slugify(name) });
    if (existingActor) {
      return res.json({ error: "Already exist" });
    }

    const actor = await Actor.findByIdAndUpdate(
      actorId,
      {
        name,
        slug: slugify(name),
      },
      { new: true }
    );
    res.json(actor);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};

export const remove = async (req, res) => {
  try {
    const removed = await Actor.findByIdAndDelete(req.params.actorId);
    res.json(removed);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};

export const list = async (req, res) => {
  try {
    const all = await Actor.find({});
    res.json(all);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};

export const read = async (req, res) => {
  try {
    const actor = await Actor.findOne({ _id: req.params.actorId });
    res.json(actor);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};
