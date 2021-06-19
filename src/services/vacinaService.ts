import repositorio from '../data/vacinaRepositorio';

async function buscaSolicitacoesVacina() {
    return repositorio.buscaSolicitacoesVacina();
}

async function buscaSolicitacaoPorCpf(cpf: string) {
    return repositorio.buscaSolicitacaoPorCpf(cpf);
}

async function inserePacienteParaVacina(novaVacinacao: any) {
    const vacinaRetorno = await repositorio.buscaSolicitacaoPorCpf(novaVacinacao.cpf);
    if (vacinaRetorno.length == 0) {
        return null;
    }
    return repositorio.inserePacienteParaVacina(novaVacinacao);
}

async function atualizaVacinacao(atualizaVacinacao: any) {
    const vacinaRetorno = await repositorio.buscaSolicitacaoPorCpf(atualizaVacinacao.cpf);
    if (vacinaRetorno.length == 0) {
        return false;
    }
    const resultadoVacina = await repositorio.atualizaVacinacao(atualizaVacinacao);
    return true;
}

async function removeVacinacao(cpf: string) {
    const vacinaRetorno = await repositorio.buscaSolicitacaoPorCpf(cpf);
    if (vacinaRetorno.length == 0) {
        return false;
    }
    const resultadoVacina = await repositorio.removeVacinacao(cpf);
    return true;
}

async function verificaEmailSenha(email: string, senha: string) {
    return repositorio.verificaEmailSenha(email, senha);
}

export = {
    verificaEmailSenha,
    removeVacinacao,
    atualizaVacinacao,
    buscaSolicitacoesVacina,
    inserePacienteParaVacina,
    buscaSolicitacaoPorCpf
}