async function login(e) {
    e.preventDefault();

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    const url = "http://127.0.0.1:8080/login";

    fetch(url, {
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({
            email: email,
            senha: password
        })
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        if (response.status == 400) {
            throw new Error("Preencha todos os campos obrigatórios!");
        }
        throw new Error("E-mail ou senha incorretos!");
    })
    .then(token => {
        //document.cookie = `token=${token}; path=/`;
        localStorage.setItem("token", token);
        window.location.href = "http://127.0.0.1:8081/pages/home/home?alertType=success&alertMessage=Login realizado com sucesso!"
    })
    .catch(error => {
        if (error instanceof Error) {
            showAlert("error", error.message);
            return;
        }
        console.log(error);
    });

}