import {Router} from "express";
import connection from "../databases/mysql";
import fs from "fs";
import path from "path";

const router = Router();

router.get("/", (req, res) => {
    connection.query("SELECT * FROM players", (err, resp) => {
        if (err) return console.log(err);

        const orderingByKrowns = resp.sort((a: any, b: any) => b.totalKrowns - a.totalKrowns)

        res.render("index.ejs", {
            title: "Home",
            data: orderingByKrowns
        })
    })
});

router.get("/points", (req, res) => {
    connection.query("SELECT * FROM players", (err, resp) => {
        if (err) return console.log(err);

        const orderingByPoints = resp.sort((a: any, b: any) => b.points - a.points);

        res.render("points.ejs", {
            title: "Points",
            data: orderingByPoints
        })
    })
})

router.get("/update", (req, res) => {
    res.render("update.ejs", {
        title: "Update"
    })
});

router.post("/get-data", (req, res) => {
    const {data} = req.body;

    if (data[0] === undefined || !data) return res.json({message: "Man no hay nada aka que queres hacer capo"});

    for (let i = 0; i < data.length; i++) {
        connection.query("SELECT * FROM players WHERE nickname = ?", [data[i].nickname], (err, resp) => {
            if (err) return console.log(err);

            if (resp[0] === undefined) {
                connection.query("INSERT INTO players (nickname, points, totalKrowns, totalCash, match_played) VALUE (?,?,?,?,?)", [data[i].nickname, data[i].points, data[i].krowns, data[i].money, 1], (err, resp) => {
                    if (err) return console.log(err);
                })
            }

            else {

                const addingPoints = resp[0].points + data[i].points;
                const addingKrowns = resp[0].totalKrowns + data[i].krowns;
                const addingMoney = resp[0].totalCash + data[i].money;
                const addingMatchPlayed = ++resp[0].match_played;

                if (data[i].prize) {
                    connection.query("UPDATE players SET points = ?, totalKrowns = ?, totalCash = ?, match_played = ? WHERE id = ?", [addingPoints, addingKrowns, addingMoney, addingMatchPlayed, resp[0].id], (err, resp) => {
                        if (err) return console.log(err);
                    })
                }

                else {
                    connection.query("UPDATE players SET points = ?, match_played = ? WHERE id = ?", [addingPoints, addingMatchPlayed, resp[0].id], (err, resp) => {
                        if (err) return console.log(err);
                    })
                }
            }
        })
    }

    res.json({message: "datas updated"})
});

router.get("/download-table", (req, res) => {

    connection.query("SELECT * FROM players", (err, resp) => {
        if (err) return console.log(err);

        let text: string = "";
        let fileName: string = `draft_krowns_cash${Date.now()}.txt`

        const orderingTableByKrowns = resp.sort((a: any, b: any) => b.totalKrowns - a.totalKrowns);

        for (let i = 0; i < orderingTableByKrowns.length; i++) {
            text += `${orderingTableByKrowns[i].nickname}, ${orderingTableByKrowns[i].totalKrowns} Krowns, $${orderingTableByKrowns[i].totalCash} Cash\n`
        }

        fs.writeFileSync(path.join(__dirname, "../../public/files_txt/" + fileName), text);

        res.download(path.join(__dirname, "../../public/files_txt/" + fileName))


    })

})

export default router;