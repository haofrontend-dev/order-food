import express, { NextFunction, Request, Response} from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";

// import controller
import adminRouter from "./routers/admin.route";

const app = express();

app.use(express.json());

app.use(function (req: Request, res: Response, next: NextFunction) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");

    next();
});

app.use(fileUpload({
    useTempFiles: true
}));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use(cookieParser());

app.use(cors());

app.get('/', (req: Request, res: Response) => {
    const health_check = {
        uptime: process.uptime(),
        message: 'OKE',
        timestamp: Date.now()
    }

    res.send(health_check)
});

// Cổng admin
app.use('/admin', adminRouter);

export default app