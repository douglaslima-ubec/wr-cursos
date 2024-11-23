function loadSession() {
    let token = localStorage.getItem("token");
    if (token === null) {
        window.location.href = "http://127.0.0.1:8081?alertType=info&alertMessage=Faça login para acessar o sistema!";
    }
    let payload = extractPayloadFromToken(token);
    document.getElementById("username").innerText = payload.usuario;
    console.log(payload);
}