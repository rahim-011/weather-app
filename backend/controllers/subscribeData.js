import sql from '../config/db.js';


export async function subscribe(req,res){
    try{
        const {email,userCoords} =  req.body;
        const {lat,lon} = userCoords ?? {};
        if (!email) return res.status(400).json({message:'Email cant be empty! '})
        
        const geoRes = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`);

        const cityRes = await geoRes.json();
        const city = cityRes.city || 'Golbal';
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

        const isExisted  = await sql `
            SELECT email FROM subscribers WHERE email = ${email}
        `
        if (isExisted.length > 0){
            return res.status(400).json({message:'Email already existed!'})
            
        }
        const userData = await sql`
            INSERT INTO subscribers (email,location,ip_address) VALUES(${email},${city},${ip}) RETURNING *
        `
        if (userData.length === 0) {
            return res.status(500).json('Something went wrong')
        }
        res.status(201).json({message:'Your location were saved successfuly!'})
        
    }
    catch(error){
        console.log(error)
        res.status(500).json({error:'Error on server!'})
    }
}