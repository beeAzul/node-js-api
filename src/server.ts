import cors from "cors";
import express, { type Express } from "express";
import helmet from "helmet";
import { pino } from "pino";
import { env } from "@/common/utils/envConfig";
import {etablissementRouter} from "@/api/etablissement/etablissementRouter";
import requestLogger from "@/common/utils/requestLogger";

const logger = pino({ name: "server start" });
const app: Express = express();

// Set the application to trust the reverse proxy
app.set("trust proxy", true);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(helmet()); // Helmet helps secure Express apps by setting HTTP response headers.

// Request logging
app.use(requestLogger);

// Routes
app.use("/api", etablissementRouter);

app.use('/home', (req, res, next) => {
    res.send('<h1>The Home Page</h1>');
});

export { app, logger };
