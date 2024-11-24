var formData;

/**
 * Habilita a edição do formulário, esconde os botões "Editar" e "Excluir", mostra os botões "Cancelar" e "Salvar".
 * 
 * Assume-se que o formulário tem 2 botões habilitados por padrão "Editar" e "Excluir"
 * e 2 botões escondidos "Cancelar" e "Salvar". A função `editForm(formId)` é chamada sempre que
 * o usuário clicar em "Editar".
 * 
 * **OBSERVAÇÃO**: O botão "Excluir" é opcional
 * 
 * Para o funcionamento correto da função é **obrigatório** definir o `id` dos botões da seguinte forma:
 * - `Editar`: edit-form
 * - `Excluir`: delete-form
 * - `Cancelar`: cancel-form
 * - `Salvar`: save-form
 * 
 * @param {*} formId id do formulário
 */
function editForm(formId) {
    formData = new CustomFormData(document.getElementById(formId));
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
 * @param enable se igual a `true` desabilita todos os campos do formulário (input, textarea e select), caso contrário habilita todos os campos do formulário.
 */
function disableForm(formId, enable) {
    let form = document.getElementById(formId); 
    let formFields = form.querySelectorAll("input, textarea, select");
    for (let formField of formFields) {
        formField.disabled = enable;
    }
}

function saveForm(formId) {
    disableForm(formId, true);
    document.getElementById('save-form').style.display = 'none';
    document.getElementById('cancel-form').style.display = 'none';
    document.getElementById('edit-form').style.display = 'inline-block';
    if (document.getElementById('delete-form')) {
        document.getElementById('delete-form').style.display = 'inline-block';
    }
}

/**
 * Cancela a edição do formulário e desabilita todos os campo.
 * 
 * Além disso, redefine o formulário para o estado anterior à edição.
 * @param {*} formId id do formulário 
 */
function cancelForm(formId) {
    let form = document.getElementById(formId);
    for (let formField of form.querySelectorAll("input, textarea, select")) {
        formField.value = formData.get(formField.id).value;
    }
    disableForm(formId, true);
    document.getElementById('save-form').style.display = 'none';
    document.getElementById('cancel-form').style.display = 'none';
    document.getElementById('edit-form').style.display = 'inline-block';
    if (document.getElementById('delete-form')) {
        document.getElementById('delete-form').style.display = 'inline-block';
    }
}

/**
 * Cria um novo objeto do tipo `CustomFormData` que armazena os dados do objeto DOM `form`.
 * 
 * @description Todos os campos do formulário devem ter um `id`!
 * @description Um objeto do tipo `CustomFormData` é imutável!
 * 
 * @example
 * let formData = new CustomFormData(form);
 * for (data of formData.entries) {
 *      console.log(data.key)
 *      console.log(data.value)
 * }
 * console.log(formData.get("nome"))
 */
class CustomFormData {

    #entries = [];

    /**
     * @param {*} form objeto do tipo `form`
     */
    constructor(form) {
        let formFields = form.querySelectorAll("input, textarea, select");
        for (let field of formFields) {
            this.#entries.push({
                key: field.id,
                value: field.value
            });
        }
    }

    /**
     * Retorna um `Array` contendo os dados do formulário em uma estrutura do tipo `key` e `value`.
     * @example
     * {
     *      key: "nome",
     *      value: "Gabriel"
     * }
     */
    get entries() {
        return this.#entries;
    }

    /**
     * Retorna o `valor` associado à `chave`. 
     * @param {*} key Chave que identifica o valor
     * @returns O valor associado à chave
     * @example
     * console.log(formData.get("nome")) // Gabriel
     */
    get(key) {
        for (let data of this.#entries) {
            if (key === data.key) {
                return data;
            }
        }
        return null;
    }
}