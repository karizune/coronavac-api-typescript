import { Router, request } from "express";
import bcrypt from "bcryptjs";
import pacienteServico from "../services/pacienteService";
import autenticacaoJWT from "../services/authService";
import { validate } from "../validators/validator";
import validations from "../validators/pacienteValidator";
import paciente from "../models/paciente";
import Usuario from '../interfaces/IUsuario'

const routes = Router();



//#region metodos adm




//ok (pegar lista de ususarios)
routes.get("/", async (request: any, response: any) => {
    const pacienteRetorno = await pacienteServico.buscaPacienteListaPacientes();
    return response.json(pacienteRetorno);
});

routes.post("/User", async (request: any, response: any) => {
    let { email } = request.body;
    const Usuario = await pacienteServico.buscaPacientePorEmail(email)
    return response.json(Usuario);
})

routes.delete(
    "/RemoveUsuario/:email",
    async (request: any, response: any) => {
        const { email } = request.params;
        const pacienteRetorno = await pacienteServico.removeUsuario(email);
        if (!pacienteRetorno) {
            return response.status(404).json({ error: "usuario não encontrado!!" });
        }
        return response.status(200).json({ Message: `usuario ${email} removido` });
    }
);

routes.put("/AtualizaCadastro", validations.CompleteRegisterValidationRules(), validate, async (request: any, response: any) => {
    const {
        nome,
        cpf,
        peso,
        altura,
        dataNascimento,
        cidade,
        UF,
        JaTeveCovid,
        email,
        urlImage
    } = request.body

    const AtualizaCadastro: Usuario = {
        nome,
        cpf,
        peso,
        altura,
        dataNascimento,
        cidade,
        UF,
        JaTeveCovid,
        email,
        urlImage
    }
    const cadastroAtualizado = await pacienteServico.AtualizaCadastro(AtualizaCadastro)
    if (cadastroAtualizado) {
        return response.status(200).json({ "Message": "Cadastro Atualizado" })
    }
    else {
        return response.status(404).json({ "Message": "Email não encontrado" })
    }

});
//#endregion

// login funcionando corretamente
routes.post("/Login", async (request: any, response: any) => {
    const { email, senha } = request.body;
    let usuario: any = { email, senha };
    let usuarioRetorno: Usuario = await pacienteServico.buscaUsuarioPaciente(usuario);
    if (usuarioRetorno != null) {
        if (pacienteServico.VerificaCadastro(usuarioRetorno)) {
            usuario = null;
            usuario = {
                email: usuarioRetorno.email,
                nome: usuarioRetorno.nome,
                urlImage: usuarioRetorno.urlImage != undefined ? usuarioRetorno.urlImage : ''
            }
            return response.status(200).json({ "auth": true, usuario });
        }
        else {
            return response.status(200).json({ "auth": true, "needMoreInfo": true, usuarioRetorno })
        }
    }
    return response.status(404).json({ "Falha no Login": "Usuário ou senha incorretos" });
}
);

// ok
routes.post("/Register", validations.RegistraUsuarioRules(), validate, async (request: any, response: any) => {

    const {
        nome,
        email,
        senha,
    } = request.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(senha, salt);

    const novoUsuario = {
        nome,
        email,
        senha: hashedPassword,
    };
    const usuarioRetorno = await pacienteServico.insereUsuario(novoUsuario);
    if (usuarioRetorno == null) {
        return response.status(500).json({ ERROR: "CPF Paciente já existe. Paciente não inserido" });
    }
    return response.status(201).json({ usuarioRetorno });
}
);

// perfect working
routes.put("/RecuperaSenha", validations.ResetaSenhaValidationRules(), validate, async (request: any, response: any) => {

    const { email, senha } = request.body

    const LoginAtualizado: boolean = await pacienteServico.RecuperaSenha(email, senha);


    if (LoginAtualizado) {
        return response.status(200).json({ "Message": "Cadastro Atualizado" })
    }
    else {
        return response.status(404).json({ "Message": "Email não encontrado" })
    }

});



export = routes;