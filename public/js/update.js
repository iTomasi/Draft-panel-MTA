const $inputFile = document.querySelector("#inputFile");
const $spanFile = document.querySelector(".spanFile");
const $form = document.querySelector(".iw_form");

const prizes = [
    {
        krowns: 200,
        money: 0
    },
    {
        krowns: 150,
        money: 0,
    },
    {
        krowns: 100,
        money: 0,
    },
    {
        krowns: 0,
        money: 75000
    },
    {
        krowns: 0,
        money: 50000
    }

]


let getFile;
let extFile;

$inputFile.addEventListener("change", e => {
    const getFileName = e.currentTarget.files[0].name;
    getFile = e.currentTarget.files[0];
    extFile = e.currentTarget.files[0].name.split(".").pop();

    if (getFileName.length > 15) {
        $spanFile.textContent = getFileName.substring(0, 15) + "...";
    }

    else $spanFile.textContent = getFileName;

})

$form.addEventListener("submit", e => {
    e.preventDefault();

    if (extFile !== "txt") return console.log("Solo txt papi")

    const fr = new FileReader();

    fr.onload = async () => {
        let player_point = [];
        const arrayResult = fr.result.split("\n");
        
        for (let i = 0; i < arrayResult.length; i++) {
            const getPlayerAndPoint = arrayResult[i].split(" ");
            const removing_r = getPlayerAndPoint[1].replace("\r", "");

            if (i <= 4) {
                player_point = [...player_point, {
                    nickname: removing_r,
                    points: parseInt(getPlayerAndPoint[0]),
                    prize: true,
                    krowns: prizes[i].krowns,
                    money: prizes[i].money
                }]
            }

            else {
                player_point = [...player_point, {
                    nickname: removing_r,
                    points: parseInt(getPlayerAndPoint[0]),
                    prize: false,
                    krowns: 0,
                    money: 0
                }]
            }
        }

        const orderingArrayPlayers = player_point.sort((a, b) => b.points - a.points)

        const res = await axios.post("http://localhost:4000/get-data", {
            data: orderingArrayPlayers
        }, {
            headers: {"Content-Type": "application/json", "x-access-table": localStorage.getItem("table")}
        })

        if (res.data.message !== "datas updated") return console.log(res);

        window.location.href = "/"
    }
    
    fr.readAsText(getFile)
})