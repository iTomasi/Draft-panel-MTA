const $form = document.querySelector(".iw_form");

$form.addEventListener("submit", async e => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const res = await axios.post("http://localhost:4000/admin/create-table", {
        table_name: formData.get("table_name")
    }, {headers: {"Content-Type": "application/json"}});

    if (res.data.message !== "Table Created") return console.log(res.data);

    setTimeout(() => window.location.href = "/", 1000)
})