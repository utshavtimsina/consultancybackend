import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";


export const databaseConfig = (): PostgresConnectionOptions => ({
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: +process.env.DATABASE_PORT,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [
        __dirname + '/../**/*.entity{.ts,.js}',
    ],
    synchronize: process.env.DATABSE_SYNCHRONIZE === "true",
    migrationsTableName: "migrations",
    migrations: ["src/migrations/*.ts"],
    //@ts-ignore
    cli: {
        migrationsDir: "src/migrations"
    }
})