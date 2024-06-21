import { MongoClient } from 'mongodb'
import { logger } from './logger';
import { config } from './config';

const client = new MongoClient(config.MONGO_URL);

export async function connectToMongodb() {
    try {
        //@ts-ignore
        console.log(global.name)
        const databaseName = 'market_square';
        await client.connect();
        const db = client.db(databaseName);
        logger.log("Database Connected", "connectToMongodb:success");
        logger.info("Database Info");
        return db;
    } catch (error) {
        logger.error(error, "connectToMongdoDb::error");
    }
}