const $btnDownload = document.getElementById("downloadBtn");
const $table = document.querySelector(".table");
const $table_players = document.querySelector(".table__players");

const getDatas = async () => {
    const res = await axios.get("http://localhost:4000/api/", {
        headers: {"x-access-table": localStorage.getItem("table")}
    })

    if (res.data.data[0] === undefined) {
        console.log(res.data);
        $table.style.display = "none";
        $btnDownload.style.display = "none";
        return
    }
    console.log(res.data.data)

    for (let i = 0; i < res.data.data.length; i++) {
        const player = document.createElement("DIV");
        player.classList.add("player");

        if (res.data.data[i].totalKrowns > 0 || res.data.data[i].totalCash > 0) {
            player.innerHTML = `
            <span class="player__nickname">${res.data.data[i].nickname}</span>
            <span class="player__points">${res.data.data[i].points}</span>
            <span class="player__krowns">
                <i class="i__crown fas fa-crown"></i>
                ${res.data.data[i].totalKrowns}
            </span>
            <span class="player__money">
                <i class="i__bill fas fa-money-bill"></i>
                ${res.data.data[i].totalCash}
            </span>`

            $table_players.appendChild(player);
        }
    }
}

$btnDownload.addEventListener("click", () => {
    try {
        const LS_TB = localStorage.getItem("table");
        const LS_PARSE = JSON.parse(LS_TB);
        
        window.open("/download-table/" + LS_PARSE.tableDB, "_blank")
    }

    catch(e) {
        window.location.href = "/admin/create-table"
    }
})

getDatas()