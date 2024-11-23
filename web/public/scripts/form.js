// Função para habilitar a edição dos campos
function editForm(formId) {
    disableForm(formId, false);
    document.getElementById('save-form').style.display = 'inline-block';
    document.getElementById('cancel-form').style.display = 'inline-block';
    document.getElementById('edit-form').style.display = 'none';
    if (document.getElementById('delete-form')) {
        document.getElementById('delete-form').style.display = 'none';
    }
}

/**
 * @param formId id do formulário
 * @param enable se igual a `true` habilita a edição do formulário, caso contrário desabilita o formulário 
 */
function disableForm(formId, enable) {
    let form = document.getElementById(formId); 

    let inputs = form.getElementsByTagName("input");
    for (input of inputs) {
        input.disabled = enable;
    }

    let textareas = form.getElementsByTagName("textarea");
    for (textarea of textareas) {
        textarea.disabled = enable;
    }

    let selects = form.getElementsByTagName("select");
    for (select of selects) {
        select.disabled = enable;
    }
}

// Função para salvar as alterações
function saveForm(formId) {
    disableForm(formId, true);
    document.getElementById('save-form').style.display = 'none';
    document.getElementById('cancel-form').style.display = 'none';
    document.getElementById('edit-form').style.display = 'inline-block';
    if (document.getElementById('delete-form')) {
        document.getElementById('delete-form').style.display = 'inline-block';
    }
}

// Função para cancelar a edição
function cancelForm(formId) {
    disableForm(formId, true);
    document.getElementById('save-form').style.display = 'none';
    document.getElementById('cancel-form').style.display = 'none';
    document.getElementById('edit-form').style.display = 'inline-block';
    if (document.getElementById('delete-form')) {
        document.getElementById('delete-form').style.display = 'inline-block';
    }
}