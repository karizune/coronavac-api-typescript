import { body, validationResult } from "express-validator";
import { validarCPF } from "./cpfValidator";
import pacienteServico from "../services/pacienteService";
//funcao aplica validação


const LoginValidationRules = () => {
    let errors = [
        body("email").notEmpty().withMessage("Email obrigatório"),
        body("email").isEmail().withMessage("Email inválido"),
        body("senha").notEmpty().withMessage("Senha obrigatória")
    ]

    return errors
}



export {
    LoginValidationRules
};


