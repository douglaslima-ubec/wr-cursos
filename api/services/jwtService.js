const jwt = require('jsonwebtoken');
exports.SECRET_KEY = "2FAB00D652046FB187CEBA3ED1FCCAEE698154A0614B596C3B4F6E8A251F0690";

/**
 * Extrai o *token Bearer* do cabeçalho authorization da solicitação HTTP.
 * Chama o método `verify()` do módulo **jsonwebtoken** para validar o token recebido na solicitação.
 * @param request Objeto do tipo `Express.Request` que contém as informações da **solicitação HTTP**.
 * @param response Objeto do tipo `Express.Response` que contém as informações da **resposta HTTP**.
 * @param next Referência para o próximo *middleware*.
 * @returns 
 */
exports.validateToken = (request, response, next) => {
    let authorizationHeader = request.headers.authorization;
    if (!authorizationHeader) {
        return response.status(401).json("Acesso negado. É obrigatório informar o token no cabeçalho 'authorization'!");
    }
    let token = authorizationHeader.split(" ", 2);
    if (token[0] != "Bearer") {
        return response.status(401).json("Acesso negado. O token informado não é do tipo Bearer!")
    }
    try {
        jwt.verify(token[1], this.SECRET_KEY);
        return next();
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return response.status(401).json(`Acesso negado. O token expirou em ${error.expiredAt}!`);
        }
        return response.status(401).json("Acesso negado. Token inválido!");
    }
};