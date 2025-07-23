import databaseClient from "../../../database/client";
import type { Rows } from "../../../database/client";

type Category = {
  id: number;
  name: string;
};

class CategoryRepository {
  async readAll(): Promise<Category[]> {
    const [rows] = await databaseClient.query<Rows>("SELECT * FROM categories");
    return rows as Category[];
  }
}

export default new CategoryRepository();
