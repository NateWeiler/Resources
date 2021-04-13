-- Mock data for tests
INSERT INTO users (username, password)
VALUES ('test', 'pbkdf2:sha256:150000$ct53bP67$407a39b3f6601c67c19b5df8a1a98016fff036e98c7e3730e9fd3ed9e9a1c46e'),
       ('john', 'pbkdf2:sha256:150000$mnDlEpNj$eb636c0e67b68710c5a25d14c6bbab6a1f319e47689702f6ef257a36f3b6e54c');

INSERT INTO todos (description, completed, created_at, user_id)
VALUES ('clean room', FALSE, NOW(), 1),
       ('do homework', TRUE, NOW(), 1),
       ('get groceries', FALSE, NOW(), 1);
