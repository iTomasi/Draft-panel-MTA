import {Router} from "express";
import connection from "../databases/mysql";

const router = Router();

router.get("/tables", (req, res) => {
    connection.query("SELECT * FROM my_tables_xd", (err, resp) => {
        if (err) return console.log(err);

        res.json({tables: resp})
    })

});

router.get("/", (req, res) => {

    const getTableUser: any = req.headers["x-access-table"];
    const LS_getTable: any = JSON.parse(getTableUser);
    
    if (LS_getTable === null) return res.json({message: "Select a Table"})

    connection.query(`SELECT * FROM ${LS_getTable.tableDB}`, (err, resp) => {
        if (err) return console.log(err);

        const orderingByKrowns = resp.sort((a: any, b: any) => b.totalKrowns - a.totalKrowns)

        res.json({data: orderingByKrowns})
    })
});

router.get("/points", (req, res) => {

    const getTableUser: any = req.headers["x-access-table"];
    const LS_getTable = JSON.parse(getTableUser);

    connection.query(`SELECT * FROM ${LS_getTable.tableDB}`, (err, resp) => {
        if (err) return console.log(err);

        const orderingByPoints = resp.sort((a: any, b: any) => b.points - a.points);

        res.json({data: orderingByPoints, message: "Success"})
    })
});

router.delete("/table/:dbName", (req, res) => {
    const dbName = req.params.dbName;

    connection.query(`DROP TABLE ${dbName}`, (err, resp) => {
        if (err) {
            console.log(err);
            res.json({message: "NO existe la tabla"})
            return
        }

        connection.query("DELETE FROM my_tables_xd WHERE tableName = ?", [dbName], (err, resp2) => {
            if (err) return console.log(err);

            res.json({message: "Table Deleted"})

        })

    })
})

export default router;