import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan';
import helmet, { contentSecurityPolicy } from 'helmet';
import aj from './lib/arcjet.js';
import cors from 'cors'
import { router } from './routes/dataRouter.js';
import subscribeRouter from './routes/subscribeRouter.js';
import sql from './config/db.js'


dotenv.config();


const PORT = process.env.PORT || 3001 ;
const app = express();
app.use(cors({
    origin: ['http://localhost:5173',
            'https://madjidouzik.app.n8n.cloud',
            'https://weather-app-1-d6k5.onrender.com',
            'https://weather-app-427p.onrender.com'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(express.json());
app.use(morgan('dev'));
app.use(helmet(
    {contentSecurityPolicy : false}
))
app.set('trust proxy', true);


app.use(async (req,res,next)=>{
    const decision = await aj.protect(req,{
        ip: req.ip || "127.0.0.1", ///
        request:1
    })
    try{
        if (decision.isDenied()){
            if (decision.reason.isBot()){
                return res.status(403).json({error:'Bots doesn not have access'})
            }
            else if (decision.reason.isRateLimit()){
                return res.status(429).json({error:'To many requests please try again'})
            }
            else {
                return res.status(403).json({error:'Forbidden'})
            }
        }
        if (decision.results.some(result => result.isBot() && result.isSpoofed())){
            return res.status(403).json({error: 'Spoofed bot detected!'})
        }
        next()
    }
    catch(error){
        res.status(500).json({error:'Something went wrong!'})
        console.log('Something went wrong!',error)
    }
})



app.use('/api',router)
app.use('/api',subscribeRouter)


const initializeDb = async () =>{
    try{
        await sql `
        CREATE TABLE IF NOT EXISTS subscribers (
            id SERIAL PRIMARY KEY ,
            email VARCHAR(200) UNIQUE NOT NULL,
            ip_address VARCHAR(50),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            location VARCHAR(50) NOT NULL
        )
    `
    console.log('Database initalized successfuly!')
    }
    catch(error){
        console.log('Error on initializing database',error);
    }
    
}

initializeDb().then(app.listen(PORT,()=> console.log(`Server connected to port: ${PORT}`)))






