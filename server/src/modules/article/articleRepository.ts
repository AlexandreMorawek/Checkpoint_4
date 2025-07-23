import databaseClient from "../../../database/client";

import type { Rows } from "../../../database/client";

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
}

export default new ArticleRepository();
