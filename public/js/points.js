const $content = document.querySelector(".content");

const getPoints = async () => {

    const res = await axios.get("http://localhost:4000/api/points", {
        headers: {"x-access-table": localStorage.getItem("table")}
    })

    if (res.data.message !== "Success") return console.log(res.data);

    for (let i = 0; i < res.data.data.length; i++) {
        const createH3 = document.createElement("H3");
        createH3.textContent = `${res.data.data[i].points} ${res.data.data[i].nickname} (${res.data.data[i].match_played})`;

        $content.appendChild(createH3);
    }


};

getPoints();