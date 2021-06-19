import * as dotenv from "dotenv";
dotenv.config({ path: "./src/Config/.env" })

import mongoose from "mongoose";
import color from "cli-color";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECTION as string, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });
        console.log(color.greenBright("Conectado ao cluster do MongoDB"));
    } catch (error) {
        console.error(color.redBright("Falha em conectar ao cluster do MongoDB"));
        process.exit(1);
    }
};

export {
    connectDB
}