import  express  from 'express';
import productRouter from './routes/product.router.js'
import cartRouter from './routes/cart.router.js'
import viewsRouter from './routes/views.router.js'
import sessionRouter from './routes/session.router.js'
//import chatsRouter from './routes/chats.router.js'
//import loggerRouter from "./routes/logger.router.js";
//import mockingRouter from "./routes/mockingProducts.router.js"
import cookieRouter from './routes/cookie.router.js'
import { __dirname } from "./utils/utils.js"
import { Server } from "socket.io";
import { engine } from "express-handlebars";
//import { productsManager } from './DAL/daos/MongoDB/productManagerDB.js'
import session from "express-session";
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";
//import { messagesManager } from "./DAL/daos/MongoDB/messageManagerDB.js";
import "./DB/configDB.js";
import "./passport.js";
import passport from "passport";
import fileStore from "session-file-store";
import { logger } from "./utils/logger.js"
import  config  from "./config/config.js";
//import { authMiddleware } from './middlewares/auth.middleware.js';
import { errorMiddleware } from './middleware/error.middlware.js';
const FileStore = fileStore(session);

const app = express();
//const URI = config.mongo_uri;
app.use(
    session({
        store: new MongoStore({
            mongoUrl: "mongodb+srv://federicosegu:Abeyp231@cluster0.gjwkb4d.mongodb.net/teDeboUna?retryWrites=true&w=majority&appName=Cluster0",
            
        }),
        secret: "secretSession",
        cookie: { maxAge: 60000 },
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser("SecretCookie"));
app.use('/public', express.static('public'));
app.use(express.static(__dirname + "/public"));
// app.use(authMiddleware);



app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());


app.engine("handlebars", engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use('/api/products', productRouter);
//app.use('/api/mockingProducts', mockingRouter);
app.use('/api/cart', cartRouter);
app.use('/api/views', viewsRouter);
app.use("/api/cookie", cookieRouter);
app.use("/api/session", sessionRouter);
//app.use('/api/chat', chatsRouter);
//app.use('/api/loggerTest', loggerRouter);

app.use(errorMiddleware);

const httpServer = app.listen(8080, () => {
    logger.info('Escuchando al puerto 8080');
});
