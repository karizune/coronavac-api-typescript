import * as dotenv from "dotenv";
dotenv.config({ path: "./src/Config/.env" })

import jwt from "jsonwebtoken";
const pacienteServico = require("./pacienteService");

const verificarToken = async (request: any, response: any, next: any) => {
    try {
        const token = request.header("Authorization").split(" ");
        if (token == undefined) {
            throw new Error();
        }
        const data = jwt.verify(token[1], process.env.JWT_KEY as string);
        const paciente = await pacienteServico.buscaPacientePorEmail(data);
        if (!paciente) {
            throw new Error();
        }
        request.user = paciente;
        request.token = token;
        next();
    } catch (error) {
        response.status(401).send({ error: "Não Autorizado" });
    }
};

const gerarToken = (email: string) => {
    if (email == null) {
        return { auth: false, token: null, message: "Error" };
    }
    const token = jwt.sign({ email: email }, process.env.JWT_KEY as string);
    return { auth: true, token: token, message: "OK!!" };
};

const verificaEmailSenha = async (email: string, senha: string) => {
    const paciente = await pacienteServico.verificaEmailSenha(email, senha);
    if (paciente != undefined) {
        return paciente.email;
    }
    return null;
};

export = {
    verificaEmailSenha,
    gerarToken,
    verificarToken
}