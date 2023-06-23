import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
  type: 'sqlite',
  database: './src/database/Chatfy.db',
  migrations: ['./src/database/migrations/*.ts'],
  entities: ['./src/app/entities/*.ts'],
  synchronize: false,
});

export default AppDataSource;
