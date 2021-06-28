import { body, validationResult } from "express-validator";
import { validarCPF } from "./cpfValidator";
import pacienteServico from "../services/pacienteService";


//funcao aplica validação
function RegistraUsuarioRules() {
    const Errors = [
        body("nome")
            .notEmpty()
            .withMessage("Nome é obrigatório"),

        body("email")
            .isEmail()
            .withMessage("Email inválido/obrigatório"),

        body("senha")
            .notEmpty()
            .withMessage("Senha é obrigatória"),

        body("email")
            .custom(async (email: string) => {
                await pacienteServico.buscaPacientePorEmail(email).then((response: any) => {
                    if (response != null) {
                        throw new Error("Email já cadastrado");
                    }
                });
                return false;
            })
    ]

    return Errors;
}

function CompleteRegisterValidationRules() {
    let errors = [
        body("cpf").custom((value: any) => {
            if (!validarCPF(value)) throw new Error("CPF: inválido!");
            return true;
        }).withMessage("CPF: inválido!"),
        body("peso").isLength({ min: 1, max: Infinity }).withMessage("Peso: precisa ser maior que 0"),
        body("altura").isLength({ min: 1, max: Infinity }).withMessage("Altura: precisa ser maior que 0"),
        body("cidade").notEmpty().withMessage("Cidade: obrigatória"),
        body("UF").notEmpty().withMessage("Estado: Obrigatório"),
        body("dataNascimento").notEmpty().withMessage("Data de nascimento: Obrigatório"),
        body("JaTeveCovid").isBoolean().withMessage("COVID: precisa informar se já teve covid")
    ]
    return errors
}

function ResetaSenhaValidationRules() {
    const Errors = [
        body("email").isEmail().withMessage("Email inválido/obrigatório"),
        body("senha").notEmpty().withMessage("Senha é obrigatória")
    ]
    return Errors
}

function PacienteValidationRules() {
    return [
        body("nome").notEmpty().withMessage("Nome: Obrigatório"),
        body("nome")
            .isLength({ min: 4, max: 100 })
            .withMessage("Nome: Mínimo 4 caracteres e Máximo 100 caracteres"),
        body("cpf")
            .isLength({ min: 11, max: 11 })
            .withMessage("CPF deve ter tamanho de 11 caracteres"),
        body("cpf").notEmpty().withMessage("CPF: obrigatório"),
        body("cpf").custom((value: any) => {
            if (!validarCPF(value)) throw new Error("CPF: inválido!");
            return true;
        })
            .withMessage("Cpf: inválido"),
        body("cpf").custom(async (value: any) => {
            const resultadoPaciente = await pacienteServico.buscaPacientePorCpf(
                value
            );
            if (resultadoPaciente != null) {
                let Erro: string = "CPF já existe, cadastro não permitido!"
                return JSON.parse(Erro);
            }
            return true;
        }),
        body("email")
            .custom(async (value: any) => {
                const resultadoPaciente = await pacienteServico.buscaPacientePorEmail(
                    value
                );
                if (resultadoPaciente != null) {
                    return false
                }
                return true;
            })
            .withMessage("Email já existe , cadastro não permitido"),
        body("email").isEmail().withMessage("E-mail: inválido"),
        body("email").notEmpty().withMessage("E-mail: obrigatório!!"),
        body("peso")
            .notEmpty()
            .isLength({ min: 1, max: Infinity })
            .withMessage("Peso: Obrigatório"),
        body("altura")
            .notEmpty()
            .isLength({ min: 1, max: Infinity })
            .withMessage("Altura: obritatório"),
        body("senha").notEmpty().withMessage("Senha: obrigatória!!"),





        /*
        body("dataNascimento")
          .notEmpty()
          .withMessage("Data de Nascimento é obrigatória!!"),
        */



    ];
};

export default {
    PacienteValidationRules,
    RegistraUsuarioRules,
    ResetaSenhaValidationRules,
    CompleteRegisterValidationRules
};
