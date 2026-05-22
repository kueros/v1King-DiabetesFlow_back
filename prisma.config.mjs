import { config } from 'dotenv';

// Forzamos la carga del archivo .env al entorno de Node antes de exportar
config();

export default {
  datasource: {
    url: process.env.DATABASE_URL,
  }
};