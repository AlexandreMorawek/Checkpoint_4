import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Article = {
  id: number;
  title: string;
  content: string;
  category_id: number;
};

class ArticleRepository {
  async readAll(articleId?: number) {
    const [rows] = await databaseClient.query<Rows>("select * from article");
    return rows as Article[];
  }

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM article WHERE id = ?",
      [id],
    );
    return rows[0] as Article;
  }

  async create(article: Omit<Article, "id">) {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO article (title, content, category_id) VALUES (?, ?, ?)",
      [article.title, article.content, article.category_id],
    );

    return result.insertId;
  }
}

export default new ArticleRepository();
