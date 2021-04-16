import {Router} from "express";
import connection from "../databases/mysql";
import fs from "fs";
import path from "path";

const router = Router();

router.get("/", (req, res) => {
    res.render("index.ejs", {
        title: "Home"
    })
});

router.get("/points", (req, res) => {
    res.render("points.ejs", {
        title: "Points"
    })
})

router.get("/update", (req, res) => {
    res.render("update.ejs", {
        title: "Update"
    })
});

router.post("/get-data", (req, res) => {
    const {data} = req.body;
    const getTableUser: any = req.headers["x-access-table"];
    const LS_getTable = JSON.parse(getTableUser);

    console.log(LS_getTable)

    if (data[0] === undefined || !data) return res.json({message: "Man no hay nada aka que queres hacer capo"});

    for (let i = 0; i < data.length; i++) {
        connection.query(`SELECT * FROM ${LS_getTable.tableDB} WHERE nickname = ?`, [data[i].nickname], (err, resp) => {
            if (err) return console.log(err);

            if (resp[0] === undefined) {
                connection.query(`INSERT INTO ${LS_getTable.tableDB} (nickname, points, totalKrowns, totalCash, match_played) VALUE (?,?,?,?,?)`, [data[i].nickname, data[i].points, data[i].krowns, data[i].money, 1], (err, resp) => {
                    if (err) return console.log(err);
                })
            }

            else {

                const addingPoints = resp[0].points + data[i].points;
                const addingKrowns = resp[0].totalKrowns + data[i].krowns;
                const addingMoney = resp[0].totalCash + data[i].money;
                const addingMatchPlayed = ++resp[0].match_played;

                if (data[i].prize) {
                    connection.query(`UPDATE ${LS_getTable.tableDB} SET points = ?, totalKrowns = ?, totalCash = ?, match_played = ? WHERE id = ?`, [addingPoints, addingKrowns, addingMoney, addingMatchPlayed, resp[0].id], (err, resp) => {
                        if (err) return console.log(err);
                    })
                }

                else {
                    connection.query(`UPDATE ${LS_getTable.tableDB} SET points = ?, match_played = ? WHERE id = ?`, [addingPoints, addingMatchPlayed, resp[0].id], (err, resp) => {
                        if (err) return console.log(err);
                    })
                }
            }
        })
    }

    res.json({message: "datas updated"})
});

router.get("/download-table/:tableNameDB", (req, res) => {

    const tableNameDB = req.params.tableNameDB;

    connection.query(`SELECT * FROM ${tableNameDB}`, (err, resp) => {
        if (err) {
            console.log(err);
            res.json({message: `no existe la database ${tableNameDB}`})
            return
        }

        else if (resp[0] === undefined) return res.json({message: "No hay nada guardado en la tabla papu"})

        let text: string = "";
        let fileName: string = `${tableNameDB}_draft-${Date.now()}.txt`

        const orderingTableByKrowns = resp.sort((a: any, b: any) => b.totalKrowns - a.totalKrowns);

        for (let i = 0; i < orderingTableByKrowns.length; i++) {
            text += `${orderingTableByKrowns[i].nickname}, ${orderingTableByKrowns[i].totalKrowns} Krowns, $${orderingTableByKrowns[i].totalCash} Cash\n`
        }

        fs.writeFileSync(path.join(__dirname, "../../public/files_txt/" + fileName), text);

        res.download(path.join(__dirname, "../../public/files_txt/" + fileName))


    })

});

export default router;