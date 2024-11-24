async function listarUsuarios() {
    let token = localStorage.getItem("token");

    let response = await fetch("http://127.0.0.1:8080/usuario", {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        method: "GET"
    });

    if (!response.ok) {
        showAlert("error", `Ocorreu um erro (${response.status}). Tente novamente mais tarde!`);
        return;
    }

    let usuarios = await response.json();

    if (usuarios.length == 0) {
        document.getElementById("empty-table-message").style["display"] = "block";
    } else {
        document.getElementById("empty-table-message").style["display"] = "none";
    }

    let tabela = document.getElementById("users");

    usuarios.forEach(usuario => {
        let linha = document.createElement("tr");

        let colunaEditar = document.createElement("td");
        let botaoEditar = document.createElement("a");
        botaoEditar.setAttribute("href", `http://127.0.0.1:8081/pages/usuario/admin/editar?usuarioId=${usuario?.usuarioId}`);
        botaoEditar.classList.add("button", "button--edit");
        botaoEditar.innerText = "Editar";
        colunaEditar.appendChild(botaoEditar);
        linha.appendChild(colunaEditar);

        let colunaNome = document.createElement("td");
        colunaNome.innerText = usuario?.nome;
        colunaNome.setAttribute("title", usuario?.nome);
        linha.appendChild(colunaNome);

        let colunaUsuario = document.createElement("td");
        colunaUsuario.innerText = usuario?.usuario;
        colunaUsuario.setAttribute("title", usuario?.usuario);
        linha.appendChild(colunaUsuario);

        let colunaEmail = document.createElement("td");
        colunaEmail.innerText = usuario?.email;
        colunaEmail.setAttribute("title", usuario?.email);
        linha.appendChild(colunaEmail);

        let colunaEstaAtivo = document.createElement("td");
        colunaEstaAtivo.innerText = usuario?.estaAtivo ? 'SIM' : 'NÃO';
        colunaEstaAtivo.setAttribute("title", usuario?.estaAtivo ? 'SIM' : 'NÃO');
        linha.appendChild(colunaEstaAtivo);

        tabela.appendChild(linha);
    });
}

async function pesquisarUsuarioLogado() {
    let token = localStorage.getItem("token");
    let payload = extractPayloadFromToken(token);

    let response = await fetch(`http://127.0.0.1:8080/usuario/${payload.usuario.usuarioId}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        method: "GET"
    });

    if (!response.ok) {
        showAlert("error", `Ocorreu um erro (${response.status}). Tente novamente mais tarde!`);
        return;
    }
    
    let usuario = await response.json();
    document.getElementById("nome").value = usuario?.nome;
    document.getElementById("usuario").value = usuario?.usuario;
    document.getElementById("telefone").value = usuario?.telefone;
    document.getElementById("cep").value = usuario?.cep;
    document.getElementById("uf").value = usuario?.uf;
    document.getElementById("cidade").value = usuario?.cidade;
    document.getElementById("bairro").value = usuario?.bairro;
    document.getElementById("rua").value = usuario?.rua;

}

async function atualizarUsuarioLogado(e) {
    e.preventDefault();

    let token = localStorage.getItem("token");
    let payload = extractPayloadFromToken(token);

    let nome = document.getElementById("nome").value;
    let usuario = document.getElementById("usuario").value;
    let telefone = document.getElementById("telefone").value;
    let cep = document.getElementById("cep").value;
    let uf = document.getElementById("uf").value;
    let cidade = document.getElementById("cidade").value;
    let bairro = document.getElementById("bairro").value;
    let rua = document.getElementById("rua").value;

    let body = {
        nome: nome,
        usuario: usuario,
        telefone: telefone,
        cep: cep,
        uf: uf,
        cidade: cidade,
        bairro: bairro,
        rua: rua
    };

    let response = await fetch(`http://127.0.0.1:8080/usuario/${payload.usuario.usuarioId}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        method: "PUT",
        body: JSON.stringify(body)
    });

    if (!response.ok) {
        showAlert("error", `Ocorreu um erro (${response.status}). Tente novamente mais tarde!`);
        return;
    }

    showAlert("success", "As suas informações foram atualizadas com sucesso!");
}

async function cadastrarUsuario(e) {
    e.preventDefault();

    let nome = document.getElementById("nome").value;
    let usuario = document.getElementById("usuario").value;
    let email = document.getElementById("email").value;
    let senha = document.getElementById("senha").value;

    let body = {
        nome: nome,
        usuario: usuario,
        email: email,
        senha: senha,
        expiraEm: "2025-01-01"
    };

    let token = localStorage.getItem("token");
    
    let response = await fetch(`http://127.0.0.1:8080/usuario`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        method: "POST",
        body: JSON.stringify(body)
    });

    if (!response.ok) {
        showAlert("error", `Ocorreu um erro (${response.status}). Tente novamente mais tarde!`);
        return;
    }

    window.location.href = "http://127.0.0.1:8081/pages/usuario/admin/listar?alertType=success&alertMessage=Usuário cadastrado com sucesso!";
}

async function pesquisarUsuario() {
    let urlQueryString = window.location.search;
    let urlQueryParams = new URLSearchParams(urlQueryString);
    if (!urlQueryParams.has("usuarioId")) {
        window.location.href = "http://127.0.0.1:8081/pages/usuario/admin/listar?alertType=info&alertMessage=É obrigatório informar o ID do usuário nos parâmetros de busca da URL!";
    }
    let usuarioId = urlQueryParams.get("usuarioId");

    let token = localStorage.getItem("token");

    let response = await fetch(`http://127.0.0.1:8080/usuario/${usuarioId}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        method: "GET"
    });

    if (response.status === 404) {
        window.location.href = `http://127.0.0.1:8081/pages/usuario/admin/listar?alertType=info&alertMessage=Usuário de ID '${usuarioId}' não existe!`;
    }

    if (!response.ok) {
        showAlert("error", `Ocorreu um erro (${response.status}). Tente novamente mais tarde!`);
        return;
    }

    let usuario = await response.json();
    document.getElementById("nome").value = usuario?.nome;
    document.getElementById("usuario").value = usuario?.usuario;
    document.getElementById("telefone").value = usuario?.telefone;
    document.getElementById("cep").value = usuario?.cep;
    document.getElementById("uf").value = usuario?.uf;
    document.getElementById("cidade").value = usuario?.cidade;
    document.getElementById("bairro").value = usuario?.bairro;
    document.getElementById("rua").value = usuario?.rua;
    
    if (usuario?.estaAtivo) {
        document.getElementById("active").style["display"] = "none";
    } else {
        document.getElementById("inactive").style["display"] = "none";
    }
}

async function atualizarUsuario(e) {
    e.preventDefault();

    let urlQueryString = window.location.search;
    let urlQueryParams = new URLSearchParams(urlQueryString);
    if (!urlQueryParams.has("usuarioId")) {
        window.location.href = "http://127.0.0.1:8081/pages/usuario/admin/listar?alertType=info&alertMessage=É obrigatório informar o ID do usuário nos parâmetros de busca da URL!";
    }
    let usuarioId = urlQueryParams.get("usuarioId");

    let nome = document.getElementById("nome").value;
    let usuario = document.getElementById("usuario").value;
    let telefone = document.getElementById("telefone").value;
    let cep = document.getElementById("cep").value;
    let uf = document.getElementById("uf").value;
    let cidade = document.getElementById("cidade").value;
    let bairro = document.getElementById("bairro").value;
    let rua = document.getElementById("rua").value;

    let body = {
        nome: nome,
        usuario: usuario,
        telefone: telefone,
        cep: cep,
        uf: uf,
        cidade: cidade,
        bairro: bairro,
        rua: rua
    };

    let token = localStorage.getItem("token");

    let response = await fetch(`http://127.0.0.1:8080/usuario/${usuarioId}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        method: "PUT",
        body: JSON.stringify(body)
    });

    if (!response.ok) {
        showAlert("error", `Ocorreu um erro (${response.status}). Tente novamente mais tarde!`);
        return;
    }

    showAlert("success", "O usuário foi atualizado com sucesso!");
}

async function ativarUsuario() {
    let urlQueryString = window.location.search;
    let urlQueryParams = new URLSearchParams(urlQueryString);
    if (!urlQueryParams.has("usuarioId")) {
        window.location.href = "http://127.0.0.1:8081/pages/usuario/admin/listar?alertType=info&alertMessage=É obrigatório informar o ID do usuário nos parâmetros de busca da URL!";
    }
    let usuarioId = urlQueryParams.get("usuarioId");

    let body = {
        estaAtivo: true,
    };

    let token = localStorage.getItem("token");

    let response = await fetch(`http://127.0.0.1:8080/usuario/${usuarioId}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        method: "PUT",
        body: JSON.stringify(body)
    });

    if (!response.ok) {
        showAlert("error", `Ocorreu um erro (${response.status}). Tente novamente mais tarde!`);
        return;
    }
    
    document.getElementById("active").style["display"] = "none";
    document.getElementById("inactive").style["display"] = "inline-block";

    showAlert("success", "O usuário foi ativado com sucesso!");
}

async function desativarUsuario() {
    let urlQueryString = window.location.search;
    let urlQueryParams = new URLSearchParams(urlQueryString);
    if (!urlQueryParams.has("usuarioId")) {
        window.location.href = "http://127.0.0.1:8081/pages/usuario/admin/listar?alertType=info&alertMessage=É obrigatório informar o ID do usuário nos parâmetros de busca da URL!";
    }
    let usuarioId = urlQueryParams.get("usuarioId");

    let body = {
        estaAtivo: false,
    };

    let token = localStorage.getItem("token");

    let response = await fetch(`http://127.0.0.1:8080/usuario/${usuarioId}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        method: "PUT",
        body: JSON.stringify(body)
    });

    if (!response.ok) {
        showAlert("error", `Ocorreu um erro (${response.status}). Tente novamente mais tarde!`);
        return;
    }
    
    document.getElementById("active").style["display"] = "inline-block";
    document.getElementById("inactive").style["display"] = "none";

    showAlert("success", "O usuário foi desativado com sucesso!");
}

async function emailExiste() {
    let email = document.getElementById("email").value;

    if (email === null || email === "") {
        return;
    }

    let token = localStorage.getItem("token");

    let response = await fetch(`http://127.0.0.1:8080/usuario/emailExiste/${email}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        method: "GET"
    });

    if (!response.ok) {
        showAlert("error", `Ocorreu um erro (${response.status}). Tente novamente mais tarde!`);
        return;
    }

    let responseBody = await response.json();

    if (responseBody.emailExiste) {
        document.getElementById("email-error").style["display"] = "inline-block";
        document.getElementById("email-error").classList.add("form__error--active");
        document.querySelector('button[type="submit"]').disabled = true;
    } else {
        document.getElementById("email-error").style["display"] = "none";
        document.getElementById("email-error").classList.remove("form__error--active");
    }
    if (document.getElementsByClassName("form__error--active").length == 0) {
        document.querySelector('button[type="submit"]').disabled = false;
    }
}

async function usuarioExiste() {
    let usuario = document.getElementById("usuario").value;

    if (usuario === null || usuario === "" || usuario === formData?.get?.("usuario")?.value) {
        return; 
    }

    let token = localStorage.getItem("token");

    let response = await fetch(`http://127.0.0.1:8080/usuario/usuarioExiste/${usuario}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        method: "GET"
    });

    if (!response.ok) {
        showAlert("error", `Ocorreu um erro (${response.status}). Tente novamente mais tarde!`);
        return;
    }

    let responseBody = await response.json();
    
    if (responseBody.usuarioExiste) {
        document.getElementById("username-error").style["display"] = "inline-block";
        document.getElementById("username-error").classList.add("form__error--active");
        document.querySelector('button[type="submit"]').disabled = true;
    } else {
        document.getElementById("username-error").style["display"] = "none";
        document.getElementById("username-error").classList.remove("form__error--active");
    }
    if (document.getElementsByClassName("form__error--active").length == 0) {
        document.querySelector('button[type="submit"]').disabled = false;
    }
}