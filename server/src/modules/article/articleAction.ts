import articleRepository from "./articleRepository";

import type { RequestHandler } from "express";

const browse: RequestHandler = async (req, res) => {
  const articles = await articleRepository.readAll();

  res.json(articles);
};

const read: RequestHandler = async (req, res) => {
  const articleId = Number(req.params.id);

  const article = await articleRepository.read(articleId);

  if (article != null) {
    res.json(article);
  } else {
    res.sendStatus(404);
  }
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

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const articleId = Number(req.params.id);

    await articleRepository.delete(articleId);

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const article = {
      id: Number(req.params.id),
      title: req.body.title,
      content: req.body.content,
      category_id: req.body.category_id,
    };

    const affectedRows = await articleRepository.update(article);
    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    next(err);
  }
};

export default { browse, read, add, destroy, edit };
