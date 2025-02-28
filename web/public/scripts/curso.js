async function listarCursos() {
    let token = localStorage.getItem("token");

    let response = await fetch("http://127.0.0.1:8080/curso", {
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

    let cursos = await response.json();

    if (cursos.length == 0) {
        document.getElementById("empty-table-message").style["display"] = "block";
    } else {
        document.getElementById("empty-table-message").style["display"] = "none";
    }

    let tabela = document.getElementById("courses");

    cursos.forEach(curso => {
        let linha = document.createElement("tr");

        let colunaEditar = document.createElement("td");
        let botaoEditar = document.createElement("a");
        botaoEditar.setAttribute("href", `http://127.0.0.1:8081/pages/curso/editar?cursoId=${curso?.cursoId}`);
        botaoEditar.classList.add("button", "button--edit");
        botaoEditar.innerText = "Editar";
        colunaEditar.appendChild(botaoEditar);
        linha.appendChild(colunaEditar);

        let colunaNome = document.createElement("td");
        colunaNome.innerText = curso?.nome;
        colunaNome.setAttribute("title", curso?.nome);
        linha.appendChild(colunaNome);

        let colunaDescricao = document.createElement("td");
        colunaDescricao.innerText = curso?.descricao;
        colunaDescricao.setAttribute("title", curso?.descricao);
        linha.appendChild(colunaDescricao);

        let colunaCH = document.createElement("td");
        colunaCH.innerText = curso?.cargaHoraria;
        colunaCH.setAttribute("title", curso?.cargaHoraria);
        linha.appendChild(colunaCH);

        let colunaPreco = document.createElement("td");
        colunaPreco.innerText = `R$ ${curso?.preco}`;
        colunaPreco.setAttribute("title", `R$ ${curso?.preco}`);
        linha.appendChild(colunaPreco);

        let colunaEstaPublicado = document.createElement("td");
        colunaEstaPublicado.innerText = curso?.estaPublicado ? 'SIM' : 'NÃO';
        colunaEstaPublicado.setAttribute("title", curso?.estaPublicado ? 'SIM' : 'NÃO');
        linha.appendChild(colunaEstaPublicado);

        tabela.appendChild(linha);
    });
}

async function cadastrarCurso(e) {
    e.preventDefault();

    let nome = document.getElementById("nome").value;
    let cargaHoraria = document.getElementById("ch").value;
    let preco = document.getElementById("preco").value;
    let descricao = document.getElementById("descricao").value;

    let token = localStorage.getItem("token");
    let payload = extractPayloadFromToken(token);

    let body = {
        nome: nome,
        cargaHoraria: cargaHoraria,
        preco: preco,
        descricao: descricao,
        criadoPor: payload.usuario.usuarioId
    };

    let response = await fetch("http://127.0.0.1:8080/curso/", {
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

    window.location.href = "http://127.0.0.1:8081/pages/curso/listar?alertType=success&alertMessage=Curso cadastrado com sucesso!";
}

async function pesquisarCurso() {
    let urlQueryString = window.location.search;
    let urlQueryParams = new URLSearchParams(urlQueryString);

    if (!urlQueryParams.has("cursoId")) {
        window.location.href = "http://127.0.0.1:8081/pages/curso/listar?alertType=info&alertMessage=É obrigatório informar o ID do curso nos parâmetros de busca da URL!";
    }

    let cursoId = urlQueryParams.get("cursoId");

    let token = localStorage.getItem("token");

    let response = await fetch(`http://127.0.0.1:8080/curso/${cursoId}`, {
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

    let curso = await response.json();
    document.getElementById("nome").value = curso?.nome;
    document.getElementById("ch").value = curso?.cargaHoraria;
    document.getElementById("preco").value = curso?.preco;
    document.getElementById("descricao").value = curso?.descricao;

    if (curso?.estaPublicado) {
        document.getElementById("publish").style["display"] = "none";
    } else {
        document.getElementById("unpublish").style["display"] = "none";
    }
}

async function atualizarCurso(e) {
    e.preventDefault();

    let urlQueryString = window.location.search;
    let urlQueryParams = new URLSearchParams(urlQueryString);

    if (!urlQueryParams.has("cursoId")) {
        window.location.href = "http://127.0.0.1:8081/pages/curso/listar?alertType=info&alertMessage=É obrigatório informar o ID do curso nos parâmetros de busca da URL!";
    }

    let cursoId = urlQueryParams.get("cursoId");
    let nome = document.getElementById("nome").value;
    let cargaHoraria = document.getElementById("ch").value;
    let preco = document.getElementById("preco").value;
    let descricao = document.getElementById("descricao").value;

    let token = localStorage.getItem("token");

    let body = {
        nome: nome,
        cargaHoraria: cargaHoraria,
        preco: preco,
        descricao: descricao
    };

    let response = await fetch(`http://127.0.0.1:8080/curso/${cursoId}`, {
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

    showAlert("success", "Curso atualizado com sucesso!");
}

async function publicarCurso() {
    let urlQueryString = window.location.search;
    let urlQueryParams = new URLSearchParams(urlQueryString);

    if (!urlQueryParams.has("cursoId")) {
        window.location.href = "http://127.0.0.1:8081/pages/curso/listar?alertType=info&alertMessage=É obrigatório informar o ID do curso nos parâmetros de busca da URL!";
    }
    
    let cursoId = urlQueryParams.get("cursoId");

    let body = {
        estaPublicado: true
    };

    let token = localStorage.getItem("token");

    let response = await fetch(`http://127.0.0.1:8080/curso/${cursoId}`, {
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
    
    document.getElementById("publish").style["display"] = "none";
    document.getElementById("unpublish").style["display"] = "inline-block";

    showAlert("info", "O curso foi publicado com sucesso!");
}

async function despublicarCurso() {
    let urlQueryString = window.location.search;
    let urlQueryParams = new URLSearchParams(urlQueryString);

    if (!urlQueryParams.has("cursoId")) {
        window.location.href = "http://127.0.0.1:8081/pages/curso/listar?alertType=success&alertMessage=É obrigatório informar o ID do curso nos parâmetros de busca da URL!";
    }
    
    let cursoId = urlQueryParams.get("cursoId");

    let body = {
        estaPublicado: false
    };

    let token = localStorage.getItem("token");

    let response = await fetch(`http://127.0.0.1:8080/curso/${cursoId}`, {
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
    
    document.getElementById("publish").style["display"] = "inline-block";
    document.getElementById("unpublish").style["display"] = "none";

    showAlert("info", "O curso foi despublicado com sucesso!");
}

async function excluirCurso() {
    let urlQueryString = window.location.search;
    let urlQueryParams = new URLSearchParams(urlQueryString);

    if (!urlQueryParams.has("cursoId")) {
        window.location.href = "http://127.0.0.1:8081/pages/curso/listar?alertType=success&alertMessage=É obrigatório informar o ID do curso nos parâmetros de busca da URL!";
    }

    let cursoId = urlQueryParams.get("cursoId");

    let token = localStorage.getItem("token");

    let response = await fetch(`http://127.0.0.1:8080/curso/${cursoId}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        method: "DELETE"
    });

    if (!response.ok) {
        showAlert("error", `Ocorreu um erro (${response.status}). Tente novamente mais tarde!`);
        return;
    }

    window.location.href = "http://127.0.0.1:8081/pages/curso/listar?alertType=success&alertMessage=Curso excluído com sucesso!";
}