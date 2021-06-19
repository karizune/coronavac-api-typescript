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

async function insereUsuario(usuario: Usuario) {
    return await repositorio.create(usuario);
}

async function removeUsuario(email: string) {
    return await repositorio.deleteOne({ email })
}

async function buscaPacientePorEmail(email: string) {
    return repositorio.findOne({ email });
};

async function atualizaPaciente(atualizaPaciente: any) {
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
        senha,
    } = atualizaPaciente;
    const PacienteAtualizado = await repositorio.updateOne(
        {
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
            senha,
        },
        {
            $set: {
                nome,
            },
        }
    );
    return PacienteAtualizado;
};

async function verificaEmailSenha(email: string, senha: string) {
    return repositorio.findOne({ email, senha });
};


export = {
    removeUsuario,
    insereUsuario,
    buscaUsuarioPaciente,
    buscaPacientePorCpf,
    buscaPaciente,
    atualizaPaciente,
    buscaPacientePorEmail,
    verificaEmailSenha
}
