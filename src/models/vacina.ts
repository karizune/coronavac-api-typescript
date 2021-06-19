import mongoose from "mongoose";

const vacinaSchema = new mongoose.Schema({
    nome: String,
    dataSolicitacao: Date,
    dataPrevista: Date,
    nroDose: Number,
    flTomou: String,
    dataVacinacao: Date,
    cpf: String
});

export = mongoose.model('Vacina', vacinaSchema);