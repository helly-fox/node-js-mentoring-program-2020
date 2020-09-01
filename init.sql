-- Create users table if this table does not exists in DB.

CREATE TABLE IF NOT EXISTS users (
  id uuid DEFAULT uuid_generate_v4 (),
  login VARCHAR(50) NOT NULL,
  password VARCHAR(50) NOT NULL,
  age INT NOT NULL,
  PRIMARY KEY (id)
);

-- Fullfill the table with randomly generated users

INSERT INTO users(id, login, password, age)
SELECT
  uuid_generate_v4() AS id ,
  'user_' || seq AS login,
  'Passwor12' || seq AS password,
  27 AS age
FROM GENERATE_SERIES(1, 10) seq;
