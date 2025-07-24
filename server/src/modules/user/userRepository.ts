import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

type User = {
  id: number;
  username: string;
  hashed_password: string;
  email: string;
};

class UserRepository {
  async read(id: number): Promise<User | null> {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT id, username FROM user WHERE id = ?",
      [id],
    );
    const user = rows[0] as User | undefined;
    return user ?? null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM user WHERE email = ?",
      [email],
    );
    return (rows[0] as User) ?? null;
  }

  async create(user: Omit<User, "id">) {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO user (username, hashed_password, email) VALUES (?, ?, ?)",
      [user.username, user.hashed_password, user.email],
    );
    return result.insertId;
  }
}

export default new UserRepository();
