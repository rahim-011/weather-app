import arcjet,{tokenBucket,detectBot,shield} from "@arcjet/node";
import dotenv from 'dotenv'



dotenv.config();

const aj = arcjet({
    key : process.env.ARCJET_KEY,
    characteristics: ["http.request.headers[x-forwarded-for]"],
    rules : [
        shield({mode :'LIVE'}),
        detectBot({
            mode:'LIVE',
            allow:["CATEGORY:SEARCH_ENGINE", "CATEGORY:MONITOR", "CATEGORY:PREVIEW"]
        }),
        tokenBucket({
            mode:'LIVE',
            interval:5,
            refillRate:30,
            capacity:20
        })
    ]
})
   
export default aj;