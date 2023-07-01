import app from './app/app';

import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.SERVER_PORT;

app.listen(PORT);

console.info(`Server is listening on port http//:localhost:${PORT}`)