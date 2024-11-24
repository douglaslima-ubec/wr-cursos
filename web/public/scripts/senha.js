function confirmarSenha() {
    let senha = document.getElementById("senha").value;
    let confirmarSenha = document.getElementById("confirmar-senha").value;
    if (senha !== confirmarSenha) {
        document.getElementById("password-error").style["display"] = "inline-block";
        document.getElementById("password-error").classList.add("form__error--active");
        document.querySelector('button[type="submit"]').disabled = true;
    } else {
        document.getElementById("password-error").style["display"] = "none";
        document.getElementById("password-error").classList.remove("form__error--active");
    }
    if (document.getElementsByClassName("form__error--active").length == 0) {
        document.querySelector('button[type="submit"]').disabled = false;
    }
}