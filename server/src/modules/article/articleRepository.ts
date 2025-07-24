import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Article = {
  id: number;
  title: string;
  content: string;
  categories_id: number;
  user_id: number;
};

class ArticleRepository {
  async readAll(articleId?: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM article INNER JOIN categories ON article.categories_id = categories.id",
    );
    return rows as Article[];
  }

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM article INNER JOIN categories ON article.categories_id = categories.id WHERE article.id = ?",
      [id],
    );
    return rows[0] as Article;
  }

  async create(article: Omit<Article, "id">) {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO article (title, content, categories_id, user_id) VALUES (?, ?, ?, ?)",
      [article.title, article.content, article.categories_id, article.user_id],
    );

    return result.insertId;
  }

  async delete(id: number) {
    const [result] = await databaseClient.query<Result>(
      "DELETE FROM article WHERE id = ?",
      [id],
    );
    return result.affectedRows;
  }

  async update(article: Article) {
    const [result] = await databaseClient.query<Result>(
      "UPDATE ARTICLE SET title = ?, content = ? WHERE id = ?",
      [article.title, article.content, article.id],
    );
    return result.affectedRows;
  }
}

export default new ArticleRepository();
