import {Router} from "express";
import connection from "../databases/mysql";

const router = Router();

router.get("/create-table", (req, res) => {
    res.render("createTable.ejs", {
        title: "Create Table"
    })
});

router.post("/create-table", (req, res) => {
    const {table_name} = req.body;
    const verifyString = new RegExp(/^[A-Za-z0-9_\- ]+$/g);

    if (table_name === "" || table_name.startsWith(" ") || !table_name) return res.json({message: "Insert a name"});
    else if (!verifyString.test(table_name)) return res.json({message: "You table only can get letters, numbers, spaces, - and _"})

    const table_name_DB = table_name.replace(/[ -]/g, "_");

    connection.query("SHOW TABLES LIKE ?", [table_name_DB], (err, resp) => {
        if (err) return console.log(err);
        if (resp[0] !== undefined) return res.json({message: "Table already created"});

        connection.query("INSERT INTO my_tables_xd (name, tableName) VALUE (?,?)", [table_name, table_name_DB], (err, resp) => {
            if (err) return console.log(err);
    
            connection.query(`CREATE TABLE ${table_name_DB} (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, nickname TEXT NOT NULL, points INT NOT NULL, totalKrowns INT NOT NULL, totalCash INT NOT NULL, match_played INT NOT NULL)`, (err, resp2) => {
                if (err) return console.log(err);
    
                res.json({message: "Table Created"})
            })
        })
    })

    
});

router.get("/delete-table", (req, res) => {
    connection.query("SELECT * FROM my_tables_xd", (err, resp) => {
        if (err) return console.log(err);

        res.render("deleteTable.ejs", {
            title: "Delete Table",
            data: resp
        })
    })
})

export default router;