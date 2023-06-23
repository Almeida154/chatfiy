import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
  type: 'sqlite',
  database: './src/database/chatfy-database',
  migrations: ['./src/database/migrations/*.ts'],
  entities: ['./src/app/entities/*.ts'],
  synchronize: false,
});

export default AppDataSource;

// AppDataSource.initialize()
//   .then(() => console.log('Data Source has been initialized!'))
//   .catch((err) => console.error('Error during Data Source initialization', err));
