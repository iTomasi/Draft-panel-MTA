CREATE DATABASE iw_ffs_draft_ruso;
USE iw_ffs_draft_ruso;

CREATE TABLE players (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nickname TEXT NOT NULL,
    points INT NOT NULL,
    totalKrowns INT NOT NULL,
    totalCash INT NOT NULL,
    match_played INT NOT NULL
);