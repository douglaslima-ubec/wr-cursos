function loadSession() {
    let token = localStorage.getItem("token");
    if (token === null) {
        window.location.href = "http://127.0.0.1:8081?alertType=info&alertMessage=Faça login para acessar o sistema!";
    }
    let payload = extractPayloadFromToken(token);
    if (new Date(Date.now()) > new Date(payload.exp * 1000)) {
        localStorage.removeItem("token");
        window.location.href = "http://127.0.0.1:8081?alertType=info&alertMessage=Sua sessão expirou. Faça login novamente para acessar o sistema!";
    }
    return payload.usuario;
}

function destroySession(e) {
    e.preventDefault();
    localStorage.removeItem("token");
    window.location.href = "http://127.0.0.1:8081?alertType=info&alertMessage=Você saiu do sistema!";
}