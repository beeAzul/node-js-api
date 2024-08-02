import dotenv from "dotenv";
import { cleanEnv, host, num, port, str, testOnly } from "envalid";

dotenv.config();

export const env = cleanEnv(process.env, {
    NODE_ENV: str({ default: "development", choices: ["development", "production", "test"] }),
    HOST: host({ default: "localhost" }),
    PORT: port({ default: 3000 }),
    CORS_ORIGIN: str({ default: "http://localhost:3000" })
})
