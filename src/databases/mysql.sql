CREATE DATABASE iw_ffs_draft_ruso;
USE iw_ffs_draft_ruso;

CREATE TABLE my_tables_xd (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    tableName VARCHAR(100) NOT NULL
);

CREATE TABLE players (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nickname TEXT NOT NULL,
    points INT NOT NULL,
    totalKrowns INT NOT NULL,
    totalCash INT NOT NULL,
    match_played INT NOT NULL
);