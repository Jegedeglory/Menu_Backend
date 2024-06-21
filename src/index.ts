import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import "dotenv/config";
import { logger } from './utils/logger';
import { config } from './utils/config';
import { UserModel } from './models/users.schema';
import routes from './routes';
import protected


const app = express();
app.use(express.json());
app.use('/api', routes);

const corsVal = {
    origin: ['http://localhost:3000']
}

app.use(cors(corsVal))

mongoose.connect(config.MONGO_URL).then(() => {
    logger.log("Database Connected");
});



app.get(
    '/health',
    (request, response) => {
        response.json({
            message: "I am alive"
        });
    }
);

app.post(
    '/users',
    async (request, response) => {
        const { body } = request;
        logger.log(body, "users::body");
        const user = new UserModel(body);
        await user.save()
        return response.json(user);
    }
);

app.get(
    '/users',
    async (request, response) => {
        const users = await UserModel.find();
        return response.json(users);
    }
);

app.get(
    '/users',
    async (request, response) => {
        const users = await UserModel.find();
        return response.json(users);
    }
);

app.get(
    '/users/:id',
    async (request, response) => {
        const { id } = request.params;
        const users = await UserModel.findOne({ _id: id });
        return response.json(users);
    }
);

app.listen(config.PORT, () => {
    logger.log(`Server is running on http://localhost:${config.PORT}`);
});