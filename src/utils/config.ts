interface Config {
    PORT: number;
    MONGO_URL: string;
}

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;

if (!PORT || !MONGO_URL) {
    throw new Error('Please provide a port number and mongo url in the .env file');
}

const config: Config = {
    PORT: Number(PORT),
    MONGO_URL
}


export { config }