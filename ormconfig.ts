module.exports = {
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost', // Asegúrate de que DATABASE_HOST sea utilizado
  port: parseInt(process.env.DATABASE_PORT, 10),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
};
