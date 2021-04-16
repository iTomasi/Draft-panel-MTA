

const $i_cog = document.querySelector(".i__cog");
const $options = document.querySelector(".iw_header__right-setting-options");
const $selectTable = document.getElementById("selectTable");

const getDisplayOptions = getComputedStyle($options);

const showAllTables = async () => {

    try {
        const res = await axios.get("http://localhost:4000/api/tables");

        if (res.data.tables[0] === undefined) {
            const option = document.createElement("OPTION");
            option.setAttribute("disabled", "");
            option.setAttribute("selected", "");
            option.textContent = "No Tables created";
            $selectTable.appendChild(option);
            const currentPath = window.location.pathname;

            if (currentPath !== "/admin/create-table") {
                window.location.href = "/admin/create-table"
            }
        }

        let LS_getCurrentTable = JSON.parse(localStorage.getItem("table"));

        if (LS_getCurrentTable === null) {
            const option = document.createElement("OPTION");
            option.setAttribute("selected", "");
            option.setAttribute("disabled", "");
            option.textContent = "Select a Table...";

            $selectTable.appendChild(option)
            LS_getCurrentTable = {name: "", tableDB: ""}
        }

        else {
            const option = document.createElement("OPTION");
            option.value = LS_getCurrentTable.tableDB;
            option.textContent = LS_getCurrentTable.name;

            $selectTable.appendChild(option)
        }

        for (let i = 0; i < res.data.tables.length; i++) {
            const option = document.createElement("OPTION");
            option.value = res.data.tables[i].tableName;
            option.textContent = res.data.tables[i].name;

            if (res.data.tables[i].tableName !== LS_getCurrentTable.tableDB) {
                $selectTable.appendChild(option)
            }
        }
    }

    catch(e) {
        const option = document.createElement("OPTION");
        option.setAttribute("disabled", "");
        option.setAttribute("selected", "");
        option.textContent = "Editaste el LS";

        $selectTable.appendChild(option)
    }
    
}

$i_cog.addEventListener("click", () => {
    if (getDisplayOptions.display === "none") return $options.style.display = "flex";

    $options.style.display = "none";
});

window.addEventListener("click", e => {
    if (!e.target.classList.contains("i__cog") && getDisplayOptions.display === "flex") {
        $options.style.display = "none";
    }
});

$selectTable.addEventListener("change", e => {
    const getTableValue = e.currentTarget.value;
    const getTableText = e.currentTarget.options[e.currentTarget.selectedIndex].text;

    localStorage.setItem("table", JSON.stringify({
        name: getTableText,
        tableDB: getTableValue
    }));

    window.location.reload();
});

showAllTables();