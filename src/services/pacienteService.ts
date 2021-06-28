import repositorio from "../data/pacienteRepositorio";
import bcrypt from "bcryptjs";
import Usuario from '../interfaces/IUsuario'


async function RecuperaSenha(email: string, senha: string) {

    const LoginAtual: any = await repositorio.buscaPacientePorEmail(email);
    if (LoginAtual != undefined && LoginAtual.email != undefined) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(senha, salt);
        LoginAtual.senha = hashedPassword
        return await repositorio.atualizaSenha(LoginAtual);
    }
    else {
        return false;
    }
}

//its ok
async function buscaPacienteListaPacientes() {
    return repositorio.buscaPaciente();
};

//its ok
async function buscaPacientePorCpf(cpf: string) {
    return await repositorio.buscaPacientePorCpf(cpf);
};

//its ok
async function buscaUsuarioPaciente(usuario: any) {
    const UsuarioRetorno = await repositorio.buscaUsuarioPaciente(usuario);

    if (UsuarioRetorno != null && UsuarioRetorno.email != undefined && UsuarioRetorno.email == usuario.email && await bcrypt.compare(usuario.senha, UsuarioRetorno.senha)) {
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

function VerificaCadastro(usuario: any): boolean {
    if (
        usuario.altura != undefined &&
        usuario.cidade != undefined &&
        usuario.classificacao != undefined &&
        usuario.cpf != undefined &&
        usuario.dataNascimento != undefined &&
        usuario.email != undefined &&
        usuario.imc != undefined &&
        usuario.nome != undefined &&
        usuario.peso != undefined &&
        usuario.senha != undefined
    ) {
        return true
    }
    else {
        return false
    }
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

async function AtualizaCadastro(Cadastro: any) {
    let LoginAtual: Usuario = await repositorio.buscaPacientePorEmail(Cadastro.email);
    if (LoginAtual != undefined && LoginAtual.email != undefined) {
        LoginAtual.cpf = Cadastro.cpf
        LoginAtual.peso = Cadastro.peso
        LoginAtual.altura = Cadastro.altura
        LoginAtual.cidade = Cadastro.cidade
        LoginAtual.UF = Cadastro.UF
        LoginAtual.dataNascimento = Cadastro.dataNascimento
        LoginAtual.JaTeveCovid = Cadastro.JaTeveCovid
        LoginAtual.imc = imc(Cadastro.peso, Cadastro.altura)
        LoginAtual.classificacao = classificacao(LoginAtual.imc)
        return repositorio.atualizaPaciente(LoginAtual);
    }
    else {
        return false;
    }
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


function imc(peso: number, altura: number) {
    return peso / (altura * altura);
}

function classificacao(vlrIMC: any) {
    let classification: string = ''
    if (vlrIMC < 18.5) {
        classification = "Peso baixo"
    }
    else if (vlrIMC >= 18.5 && vlrIMC < 24.9) {
        classification = "Peso normal"
    }
    else if (vlrIMC >= 25.0 && vlrIMC < 29.9) {
        classification = "Sobrepeso"
    }
    else if (vlrIMC >= 30.0 && vlrIMC < 34.9) {
        classification = "Obesidade de primeiro grau"
    }
    else if (vlrIMC >= 35.0 && vlrIMC < 39.9) {
        classification = "Obesidade severa de segundo grau"
    }
    else if (vlrIMC >= 40.0) {
        classification = "Obesidade severa de terceiro grau"
    }
    return classification
}



export = {
    atualizaPaciente,
    buscaPacienteListaPacientes,
    AtualizaCadastro,
    removeUsuario,
    insereUsuario,
    buscaPacientePorEmail,
    buscaPacientePorCpf,
    RecuperaSenha,
    buscaUsuarioPaciente,
    VerificaCadastro
}

