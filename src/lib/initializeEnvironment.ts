import { resolve } from 'path';
import { config } from 'dotenv';

const { NODE_ENV } = process.env;

export default function initializeEnvironment() {
  config({
    path: resolve(process.cwd(), `.env.${NODE_ENV}`),
  });
}
