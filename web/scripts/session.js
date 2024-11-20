function loadHeader() {
    let token = getCookie("token");
    if (token === null) {
        window.location.href = "http://127.0.0.1:8081";
    }
    let payload = extractPayloadFromToken(token);
    document.getElementById("username").innerText = payload.usuario;
    console.log(payload);
}