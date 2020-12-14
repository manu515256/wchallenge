//* Dependencies
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import router from './src/routes';
import helmet from 'helmet';
import db from './src/db/db'

const app = express();

// DB
db.authenticate().then(()=>{console.log('Database running')}).catch((e)=>{console.log(e)})

//* Middleware
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//* Endpoints
app.use('/api',router);

//* Port Config
app.set('port',process.env.PORT || 3000);
app.listen(app.get('port'),()=>{
console.log(`Listen on port: ${app.get('port')}`);
});