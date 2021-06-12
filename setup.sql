CREATE DATABASE IF NOT EXISTS customer;
CREATE TABLE IF NOT EXISTS contact
(
    name            VARCHAR(40)  NOT NULL,
    email           VARCHAR(100) NOT NULL,
    phone           VARCHAR(40)  NOT NULL,
    service         VARCHAR(100) NOT NULL,
    address         VARCHAR(255) NOT NULL,
    intervals       VARCHAR(40)  NOT NULL,
    message         TEXT         NOT NULL,
    submission_date DATE DEFAULT CURDATE(),
    PRIMARY KEY (name)
);
