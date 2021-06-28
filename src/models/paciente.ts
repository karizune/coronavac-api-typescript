import mongoose from 'mongoose'


const pacienteSchema: mongoose.Schema = new mongoose.Schema({
    nome: String,
    cpf: String,
    peso: Number,
    altura: Number,
    imc: Number,
    classificacao: String,
    dataNascimento: Date,
    cidade: String,
    UF: String,
    listaComorbidades: String,
    JaTeveCovid: Boolean,
    email: String,
    senha: String,
    urlImage: String
});

export = mongoose.model("Paciente", pacienteSchema);


