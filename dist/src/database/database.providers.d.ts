import { Pool } from "pg";
export declare const databaseProviders: {
    provide: string;
    useFactory: () => Pool;
}[];
