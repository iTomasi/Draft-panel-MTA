const $grid = document.querySelector(".grid");

$grid.addEventListener("click", async e => {
    if (e.target.classList.contains("deleteBtn")) {
        const getDBName = e.target.dataset.db;

        const res = await axios.delete("http://localhost:4000/api/table/" + getDBName)

        if (res.data.message !== "Table Deleted") return console.log(res.data);

        window.location.reload();
    }
})