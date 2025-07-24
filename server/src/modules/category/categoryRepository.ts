import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

type Category = {
  id: number;
  name: string;
};

class CategoryRepository {
  async readAll(): Promise<Category[]> {
    const [rows] = await databaseClient.query<Rows>("SELECT * FROM categories");
    return rows as Category[];
  }

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM category WHERE id = ?",
      [id],
    );

    return rows[0] as Category;
  }

  async update(category: Category) {
    const [result] = await databaseClient.query<Result>(
      "UPDATE categories SET name = ? WHERE id = ?",
      [category.name, category.id],
    );
    return result.affectedRows;
  }
}

export default new CategoryRepository();
