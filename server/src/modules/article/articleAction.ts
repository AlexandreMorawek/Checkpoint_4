import articleRepository from "./articleRepository";

import type { RequestHandler } from "express";

const browse: RequestHandler = async (req, res) => {
  const articles = await articleRepository.readAll();

  res.json(articles);
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const { title, content, category_id } = req.body;

    const newArticle = {
      title,
      content,
      category_id,
    };

    const insertId = await articleRepository.create(newArticle);

    res.status(201).json({ insertId, message: "Article crée avec succés" });
  } catch (err) {
    next(err);
  }
};

export default { browse, add };
