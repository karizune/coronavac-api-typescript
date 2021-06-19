import express from 'express'
import cors from 'cors';
import color from 'cli-color';

import Authroutes from './routes/authRota';
import pacienteRota from './routes/pacienteRota';
import vacinaRota from './routes/vacinaRota';

import { connectDB } from "./infra/database";
const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use("/auth", Authroutes);
app.use("/paciente", pacienteRota);
app.use("/vacina", vacinaRota);

export = app.listen(process.env.PORT || 3333, () => {
    console.log(color.greenBright("Servidor rodando ", color.blueBright("(☞ﾟヮﾟ)☞")));
});