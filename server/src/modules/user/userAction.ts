import type { RequestHandler } from "express";
import userRepository from "./userRepository";

const read: RequestHandler = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    const user = await userRepository.read(id);

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const newUser = {
      username: req.body.username,
      hashed_password: req.body.hashed_password,
      email: req.body.email,
    };

    const insertId = await userRepository.create(newUser);

    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

export default { read, add };
