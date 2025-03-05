CREATE TABLE posts (
  id SERIAL PRIMARY KEY, 
  title VARCHAR(50) NOT NULL, 
  image_url VARCHAR(1000) NOT NULL,
  post_description VARCHAR(255),
  likes INT
);

-- CREATE TABLE equipamiento (
--   id SERIAL, 
--   nombre VARCHAR(50)
--   );