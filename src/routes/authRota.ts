import { Router } from 'express';
import authService from '../services/authService';


const Authroutes = Router();

Authroutes.post('/', async (request, response) => {
    const { email, senha } = request.body;
    const pacienteEmail: string = await authService.verificaEmailSenha(email, senha)
    const retornoToken: any = authService.gerarToken(pacienteEmail);
    return response.json(retornoToken);
});

export =  Authroutes;