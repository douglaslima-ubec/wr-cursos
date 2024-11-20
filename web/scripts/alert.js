var alertIndex = 1;
async function showAlert(type, message) {
    let alert = document.createElement("div");
    alert.classList.add('alert', `alert--${type}`);

    let alertId = `alert-n${alertIndex}`;
    alertIndex++;
    alert.id = alertId;

    alert.onclick = () => {
        closeAlert(alertId);
    };

    let alertIcon = document.createElement("img");
    if (type == "error") {
        alertIcon.setAttribute("src", "http://127.0.0.1:8081/img/icons/xmark-solid.svg");
    }
    if (type == "success") {
        alertIcon.setAttribute("src", "http://127.0.0.1:8081/img/icons/check-solid.svg");
    }
    if (type == "info") {
        alertIcon.setAttribute("src", "http://127.0.0.1:8081/img/icons/info-solid.svg");
    }
    alertIcon.setAttribute("alt", "Ícone do alerta");
    alertIcon.classList.add("alert__icon");

    let alertMessage = document.createElement("p");
    alertMessage.classList.add("alert__message");
    alertMessage.innerText = message;

    alert.appendChild(alertIcon);
    alert.appendChild(alertMessage);

    document.getElementById("alerts").appendChild(alert);

    setTimeout(() => {
        alert.style['opacity'] = 1;
    },500);

    setTimeout(() => {
        alert.style['opacity'] = 0;
        setTimeout(() => {
            hideAlert(alertId);
        },1500);
    },10000);
}

function closeAlert(alertId) {
    let alert = document.getElementById(alertId);
    alert.style['opacity'] = 0;

    setTimeout(() => {
        hideAlert(alertId);
    },1500);
}

function hideAlert(alertId) {
    let alert = document.getElementById(alertId);
    document.querySelector('.alerts').removeChild(alert);
}
