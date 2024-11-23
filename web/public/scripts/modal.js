function openModal(title, description, handlerEvent) {
    let modal = document.getElementById("modal");
    modal.querySelector(".modal__title").innerHTML = title;
    modal.querySelector(".modal__description").innerText = description;
    document.getElementById("cancel").onclick = closeModal;
    document.getElementById("confirm").onclick = () => {
        handlerEvent();
        closeModal();
    };
    modal.classList.remove("is-hidden");
    modal.classList.add("is-visible");
}

function closeModal() {
    modal.classList.remove("is-visible");
    modal.classList.add("is-hidden");
}