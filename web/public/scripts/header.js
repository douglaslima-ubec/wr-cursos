const headerDefault = `
<header class="header" id="header">
    <div class="header__logo">
        <img src="http://127.0.0.1:8081/img/logo.png" alt="Logo da Empresa">
        <h1>Painel do Administrador</h1>
    </div>
</header>
`

const headerLoggedUser = (usuario) => {
    return `
        <header class="header" id="header">
            <div class="header__logo">
                <img src="http://127.0.0.1:8081/img/logo.png" alt="Logo da Empresa">
                <h1>Painel do Administrador</h1>
            </div>
            <div class="header__logged-user">
                <span>${usuario.usuario}</span>
                <div class="header__user-picture" id="user-picture">
                    <img src="http://127.0.0.1:8081/img/icons/user-solid.svg" alt="Foto do usuário logado">
                    <ul class="header__user-options is-hidden" id="user-options">
                        <li>
                            <a href="http://127.0.0.1:8081/pages/usuario/editar?usuarioId=${usuario.usuarioId}">Alterar as minhas informações</a>
                        </li>
                        <li>
                            <a onclick="destroySession(event)">Sair</a>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
        `;
};

function loadHeader() {
    let token = localStorage.getItem("token");

    if (token == null) {
        document.body.insertAdjacentHTML("afterbegin", headerDefault);
        return;
    }
    
    let payload = extractPayloadFromToken(token);
    document.body.insertAdjacentHTML("afterbegin", headerLoggedUser(payload.usuario));

    var userPicture = document.getElementById("user-picture");
    var userOptions = document.getElementById("user-options");

    userPicture.addEventListener('click', () => {
        if(!userOptions.contains(event.target)){
            if(userOptions.classList.contains('is-hidden')){
                userOptions.classList.remove('is-hidden');
                userOptions.classList.add('is-visible');
            }else{
                userOptions.classList.remove('is-visible');
                userOptions.classList.add('is-hidden');
            }
        }
    });

    window.addEventListener('click', () => {
        if(!userPicture.contains(event.target)){
            userOptions.classList.remove('is-visible');
            userOptions.classList.add('is-hidden');
        }
    });

    window.document.onscroll = () => {
        userOptions.classList.remove('is-visible');
        userOptions.classList.add('is-hidden');
    };
}