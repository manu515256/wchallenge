import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import router from './src/routes';
import helmet from 'helmet';
import db from './src/db/db';
import dotenv from 'dotenv';

dotenv.config()
const app = express();

db.authenticate().then(()=>{console.log('Database running')}).catch((e)=>{console.log(e)});

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api',router);

app.set('port',process.env.PORT || 3000);
app.listen(app.get('port'),()=>{
console.log(`Server listening on port: ${app.get('port')}`);
});