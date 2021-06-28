import { json } from 'express'
import repositorio from '../models/paciente'

interface Usuario {
    nome: string,
    cpf: string,
    peso: Number,
    altura: Number,
    imc: Number,
    classificacao: string,
    dataNascimento: Date,
    cidade: string,
    UF: string,
    listaComorbidades: string,
    JaTeveCovid: string,
    email: string,
    senha: string,
    urlImage: string
}


//#region Busca
async function buscaPaciente() {
    return await repositorio.find();
}

async function buscaPacientePorCpf(cpf: string) {
    return await repositorio.find({ cpf })
}

async function buscaUsuarioPaciente(usuario: Usuario) {
    let email: string = usuario.email
    return await repositorio.findOne({ email })
}

async function buscaPacientePorEmail(email: string) {
    return repositorio.findOne({ email });
};
//#endregion

//#region insere
async function insereUsuario(usuario: Usuario) {
    return await repositorio.create(usuario);
}
//#endregion


//#region atualiza
async function atualizaPaciente(atualizaPaciente: any) {
    console.log(atualizaPaciente)
    const {
        email,
        nome,
        cpf,
        peso,
        altura,
        dataNascimento,
        cidade,
        UF,
        JaTeveCovid,
        imc,
        classificacao
    } = atualizaPaciente;
    await repositorio.updateOne(
        {
            email,
            nome
        },
        {
            $set: {
                cpf,
                peso,
                altura,
                dataNascimento,
                cidade,
                UF,
                JaTeveCovid,
                imc,
                classificacao
            },
        }
    );
    return true;
};

async function atualizaSenha(usuarioAtualizado: any) {
    const { email, senha } = usuarioAtualizado

    await repositorio.updateOne(
        {
            email
        },
        {
            $set: { senha }
        }
    );

    return true;
}

//#endregion


//#region remove
async function removeUsuario(email: string) {
    return await repositorio.deleteOne({ email })
}
//#endregion


export = {
    removeUsuario,
    insereUsuario,
    buscaUsuarioPaciente,
    buscaPacientePorCpf,
    buscaPaciente,
    atualizaPaciente,
    buscaPacientePorEmail,
    atualizaSenha
}
