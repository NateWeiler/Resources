DROP TABLE IF EXISTS items;

CREATE TABLE items (
    id bigserial PRIMARY KEY,
    text text NOT NULL,
    created_at timestamp NOT NULL,
    completed boolean NOT NULL
);

