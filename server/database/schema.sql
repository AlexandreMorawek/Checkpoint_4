CREATE TABLE categories (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE user (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE article (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  user_id INT UNSIGNED NOT NULL,
  categories_id INT UNSIGNED NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(categories_id) REFERENCES categories(id),
  FOREIGN KEY(user_id) REFERENCES user(id)
);

INSERT INTO categories(id, name)
VALUES
(1, "Rock"),
(2, "Electro"),
(3, "Jazz"),
(4, "Rap/Hip-Hop"),
(5, "Pop");

INSERT INTO user(id, username, password)
VALUES
(1, "Alex", "BalooBaloo");

INSERT INTO article(id, title, content, user_id, categories_id)
VALUES
(1, "Concert du jour", "Le 11 juillet dernier, Linkin Park a enflammé le Stade de France lors d’un concert mémorable. Devant des dizaines de milliers de fans, le groupe a livré une performance puissante, mêlant classiques intemporels et titres récents. L’émotion était palpable, surtout lors des hommages à Chester Bennington, repris en chœur par le public. Une soirée chargée d’énergie, de nostalgie et d’unité, marquant le grand retour du groupe sur la scène française. Un moment inoubliable.", 1, 1)
