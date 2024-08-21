import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'intern_management_typeorm',
  entities: ['dist/**/*.entity.js', 'src/**/*.entity.ts'],
  migrations: ['dist/db/migrations/*.js', 'src/db/migrations/*.ts'],
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
