import repositorio from "../data/pacienteRepositorio";
import bcrypt from "bcryptjs";


//its ok
async function buscaPaciente() {
    return repositorio.buscaPaciente();
};

//its ok
async function buscaPacientePorCpf(cpf: string) {
    return await repositorio.buscaPacientePorCpf(cpf);
};

//its ok
async function buscaUsuarioPaciente(usuario: any) {
    const UsuarioRetorno = await repositorio.buscaUsuarioPaciente(usuario);

    if (UsuarioRetorno.email != undefined && UsuarioRetorno.email == usuario.email && await bcrypt.compare(UsuarioRetorno.senha, usuario.senha)) {
        return UsuarioRetorno
    }
    else {
        return null
    }

};

//ok
async function buscaPacientePorEmail(email: string) {
    return await repositorio.buscaPacientePorEmail(email);
};

//ok
async function insereUsuario(novoUsuario: any) {
    const usuarioRetorno = await repositorio.buscaPacientePorEmail(novoUsuario.email);
    if (!usuarioRetorno) {
        return repositorio.insereUsuario(novoUsuario);
    }
    return null;
}


async function removeUsuario(email: string) {
    const pacienteRetorno = await repositorio.buscaPacientePorEmail(email);
    if (pacienteRetorno.length == 0) {
        return false;
    }
    await repositorio.removeUsuario(email)
    const retorno = await repositorio.buscaPacientePorEmail(email);
    return true
};

async function AtualizaCadastro(atualizaCadastro: any) {
    const CadastroAtualizado = await repositorio.buscaPacientePorEmail(atualizaCadastro.email);
    if (!CadastroAtualizado) {
        return null;
    }
    return repositorio.atualizaPaciente(atualizaCadastro);
}

async function atualizaPaciente(atualizaPaciente: any) {
    const pacienteRetorno = await repositorio.buscaPacientePorCpf(
        atualizaPaciente.cpf
    );
    if (pacienteRetorno.length == 0) {
        return false;
    }

    const resultadoPaciente = await repositorio.atualizaPaciente(
        atualizaPaciente
    );
    return true;
};


async function verificaEmailSenha(email: string, senha: string) {
    return await repositorio.verificaEmailSenha(email, senha);
};

export = {
    verificaEmailSenha,
    atualizaPaciente,
    buscaPaciente,
    AtualizaCadastro,
    removeUsuario,
    insereUsuario,
    buscaPacientePorEmail,
    buscaPacientePorCpf,
    buscaUsuarioPaciente
}

