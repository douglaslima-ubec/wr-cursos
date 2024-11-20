const bcrypt = require('bcrypt');

/**
 * @param password A senha no formato de texto plano
 * @returns O hash da senha que foi gerado. Caso contrário retorna `null` se o argumento da função for igual a `null` ou `undefined`.
 */
exports.generatePasswordHash = (password) => {
    if (!password) {
        return null;
    }
    let salt =  bcrypt.genSaltSync();
    return bcrypt.hashSync(password, salt);
};

/**
 * Compara a senha no formato texto plano com o hash da senha armazenado no banco de dados.
 * @param password A senha no formato de texto plano
 * @param passwordHash O hash da senha
 * @returns `true` se a senha for válida, caso contrário `false`
 */
exports.verifyPasswordHash = (password, passwordHash) => {
    if (!password) {
        return false;
    }
    return bcrypt.compareSync(password, passwordHash);
};