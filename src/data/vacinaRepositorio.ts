import repositorio from '../models/vacina'

async function buscaSolicitacoesVacina() {
    return await repositorio.find();
}

async function buscaPacientePorCpf(cpf: string) {
    return await repositorio.find({ cpf });
}


async function buscaSolicitacaoPorCpf(cpf: string) {
    return await repositorio.find({ cpf });
}

async function inserePacienteParaVacina(novaVacinacao: any) {
    const { nome, dataSolicitacao, dataPrevista, nroDose, flTomou, dataVacinacao, cpf } = novaVacinacao;
    const retornoVacina = await repositorio.create({ nome, dataSolicitacao, dataPrevista, nroDose, flTomou, dataVacinacao, cpf });
    return retornoVacina;
}

async function atualizaVacinacao(atualizaVacinacao: any) {
    const { nome, dataSolicitacao, dataPrevista, nroDose, flTomou, dataVacinacao, cpf } = atualizaVacinacao;
    const vacinaAtualizada = await repositorio.updateOne(
        { cpf },
        {
            $set:
            {
                nome
            }
        }
    );
    return vacinaAtualizada;
}

async function removeVacinacao(cpf: string) {
    return repositorio.deleteOne({ cpf });
}

async function verificaEmailSenha(email: string, senha: string) {
    return await repositorio.findOne({ email, senha });
}


export = {
    buscaSolicitacoesVacina,
    verificaEmailSenha,
    removeVacinacao,
    buscaPacientePorCpf,
    atualizaVacinacao,
    buscaSolicitacaoPorCpf,
    inserePacienteParaVacina
}