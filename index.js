//* Dependencies
import express from 'express';
//import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import mongoose from 'mongoose'
//import router from './src/routes';
import helmet from 'helmet';

const app = express();

//* DB conection
mongoose.Promise = global.Promise
mongoose.connect("mongodb://localhost:27017/wchallenge", {useCreateIndex:true,useNewUrlParser:true,useUnifiedTopology:true})
.then(mongoose => console.log('DB conected on port 27017'))
.catch(err => console.log(err));
mongoose.set('useFindAndModify', false);

//* Middleware
//app.use(morgan(config.morgan));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
//app.use(express.static(path.join(__dirname,'uploads')));

//* Endpoints
//app.use('/api',router);

//* Port Config
app.set('port',process.env.PORT || 3000);
app.listen(app.get('port'),()=>{
console.log(`Listen on port: ${app.get('port')}`);
});