import dotenv from "dotenv";

dotenv.config();

export const STRIPE_CONFIG = {
  CODE_KEY: process.env.STRIPE_CODE_KEY,
  CURRENCY: "USD",
  SUCCESS_URL: process.env.SUCCESS_URL,
  CANCEL_URL: process.env.CANCEL_URL,
};

interface Config {
  port: number;
  nodeEnv: string;
}

const config: Config = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || "development",
};

export default config;

