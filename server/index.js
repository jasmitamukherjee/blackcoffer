import express from 'express';
import bodyParser from 'body-parser'
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import clientRoutes from './routes/client.js'
import generalRoutes from './routes/general.js'


//data
import Data from './models/Data.js'
import { dataset } from './data/index.js';



dotenv.config();
const app = express();
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({policy : "cross-origin"}));
app.use(morgan("common"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());

app.use("/client", clientRoutes);
app.use("/general",generalRoutes);
// app.use("/sales",salesRoutes);
// app.use("/management",managementRoutes)




const PORT = process.env.PORT || 9000;
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser : true,
  useUnifiedTopology : true,

}).then(()=>{
    app.listen(PORT, ()=> console.log(`Server Port: ${PORT}`));
    // Data.insertMany(dataset);
}).catch((error) => console.log(`${error} did not connect`))
