import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'intern_management',
  // entities: ['dist/**/*.entity.ts'],
  // Above is working to do migration, but fail to load entity on testing
  // entities: ['src/**/*.entity.ts'],
  // Above is working to load entity while testing, but failed to do migration
  // entities: ['dist/**/*.entity{.ts,.js}', 'src/**/*.entity{.ts,.js}'],
  // Above is failed to do migration and load entity on testing
  entities: [`${__dirname}/../**/**.entity{.ts,.js}`],
  // Finally. Above success on migration and testing, mantap
  migrations: [`${__dirname}/../**/database/migrations/*{.ts,.js}`],
  // eslint-disable-next-line max-len
  // This migration is used to load which migration file will be excecuted while running npm run migration:run
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
