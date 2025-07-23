import articleRepository from "./articleRepository";

import type { RequestHandler } from "express";

const browse: RequestHandler = async (req, res) => {
  const articles = await articleRepository.readAll();

  res.json(articles);
};

export default { browse };
