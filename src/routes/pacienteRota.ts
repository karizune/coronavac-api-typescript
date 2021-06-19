import { Router, request } from "express";
import bcrypt from "bcryptjs";
import pacienteServico from "../services/pacienteService";
import autenticacaoJWT from "../services/authService";
import { validate } from "../validators/validator";
import { PacienteValidationRules, RegistraUsuarioRules } from "../validators/pacienteValidator";

const routes = Router();

//ok
routes.get("/", async (request: any, response: any) => {
    const pacienteRetorno = await pacienteServico.buscaPaciente();
    return response.json(pacienteRetorno);
});

//ok
routes.get(
    "/:cpf",
    autenticacaoJWT.verificarToken,
    async (request: any, response: any) => {
        const { cpf } = request.params;
        const pacienteRetorno = await pacienteServico.buscaPacientePorCpf(cpf);
        return response.json(pacienteRetorno);
    }
);

// login funcionando corretamente (SEM JWT)
routes.post(
    "/Login",
    async (request: any, response: any) => {
        const { email, senha } = request.body;
        const usuario = { email, senha };
        const pacienteRetorno = await pacienteServico.buscaUsuarioPaciente(usuario);

        if (pacienteRetorno != null) {
            return response.status(200).json({ "auth": true, pacienteRetorno });
        }
        return response.status(404).json({ "Falha no Login": "Usuário ou senha incorretos" });
    }
);

// ok
routes.post("/Register", RegistraUsuarioRules(), validate, async (request: any, response: any) => {

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

routes.put("/AtualizaCadastro", async (request: any, response: any) => {
    const {
        nome,
        cpf,
        altura,
        peso,
        imc,
        classificacao,
        dataNascimento,
        cidade,
        UF,
        listaComorbidades,
        JaTeveCovid,
        email,
        senha
    } = request.body

    const AtualizaCadastro = {
        nome,
        cpf,
        altura,
        peso,
        imc,
        classificacao,
        dataNascimento,
        cidade,
        UF,
        listaComorbidades,
        JaTeveCovid,
        email,
        senha
    }

    const cadastroAtualizado = await pacienteServico.AtualizaCadastro(AtualizaCadastro)


});


//put section
routes.put("/:cpf", async (request: any, response: any) => {
    const { cpf } = request.params;
    const {
        nome,
        altura,
        peso,
        dataNascimento,
        cidade,
        UF,
        listaComorbidades,
        JaTeveCovid,
    } = request.body;
    const pacienteAtualizar = {
        nome,
        cpf,
        altura,
        peso,
        dataNascimento,
        cidade,
        UF,
        listaComorbidades,
        JaTeveCovid,
    };
    const pacienteRetorno = await pacienteServico.atualizaPaciente(
        pacienteAtualizar
    );
    if (!pacienteRetorno) {
        return response.status(404).json({ error: "Paciente não encontado!" });
    }
    return response.status(200).json({ ok: "Paciente Atualizado!" });
});


routes.delete(
    "/RemoveUsuario/:email",
    async (request: any, response: any) => {
        const { email } = request.params;
        const pacienteRetorno = await pacienteServico.removeUsuario(email);
        console.log(pacienteRetorno)
        if (!pacienteRetorno) {
            return response.status(404).json({ error: "usuario não encontrado!!" });
        }
        return response.status(200).json({ Message: `usuario ${email} removido` });
    }
);

export = routes;
