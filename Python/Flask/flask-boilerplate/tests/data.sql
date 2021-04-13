-- Mock Data For Tests

INSERT INTO users (email, password)
VALUES ('user1@email.com', 'pbkdf2:sha256:150000$HTBD4Psq$cac0071a72297453131605c9de1e23f7a8e7641ad21d32963630e192b061d3c1'), -- password: qwerty
       ('user2@email.com', 'pbkdf2:sha256:150000$1Fsmcb3p$b0fc672e5b81a5bd7c5b66fba3060bda80f95ef5ba1f21f26e1d8d1d85452c92'); -- password: asdfgh

