import styles from '../styles/subscribe.module.css';
import igIcon from '../images/ig.png';
import inIcon from '../images/in.png';
import githubIcon from '../images/github.png';
import fbIcon from '../images/fb.png';
import { useState } from 'react';

export default function Subscribe() {
    const [email,setEmail] = useState('');
    const [emailMessage,setEmailMessage] = useState('');
    const [messageType,setMessageType] = useState('');

    const [loadingSub,setLoadingSub] = useState('notLoading')

    const subscribe = async (e) =>{
        e.preventDefault();
        setLoadingSub('loading');
        try{
            if (!navigator.geolocation){
                setEmailMessage('Old borwsers does not support this feature');
                setMessageType('error');
            }

            const position = await new Promise((resolve,reject)=>{
                navigator.geolocation.getCurrentPosition(resolve,reject);
            })

            const userCoords = {
                lat:position.coords.latitude,
                lon:position.coords.longitude,
            };
            const response = await fetch('http://localhost:3000/api/subscribe',{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({email,userCoords})
            })
            const subResponse = await response.json();
            if (!response.ok){
                setEmailMessage(subResponse.message)
                setMessageType('error')
                setLoadingSub('result')
                return;
            }
                setLoadingSub('result');
                setEmailMessage('Your location were saved successfuly✅')
                setMessageType('success')
                setEmail('');
        }
        catch(error){
            console.log(error)
            setMessageType('error')
            setEmailMessage('Error on internal server')
        }

    }


    return (
        <div className={styles.subscribeContainer}>
            <div className={styles.newsLetterContainer}>
                <div className={styles.newsLetterInfo}>
                    <h4><span className={styles.darkerTitle}>Subscribe to our </span>Newsletter</h4>
                    <p>Weather Compass is our official newsletter. SUBSCRIBE NOW for get the latest news on your weather right inside your email as soon as possible.</p>
                    <form onSubmit={subscribe}>
                        <div className={styles.emailContainer}>
                            <input id='email' name='email'  type='email'  placeholder='Your email' onChange={(e)=>setEmail(e.target.value)}/>
                            <button type='submit' className={styles.subBtn}>{messageType === 'success'? 'subscribed ✅': 'subscribe'}</button>
                            {loadingSub === 'loading' &&
                                <p className={styles.analyzingSub}>Success! AI is analyzing your location...🔍</p> }{loadingSub === 'result' && <p className={messageType === 'error' ? styles.error: styles.success}>{emailMessage}</p>}
                        </div>
                    </form>
                </div>
            </div>
            <div className={styles.copyrightContainer}>
                <p>&copy; 2026 Weather Compass || All Rights Reserved</p>
                <div className={styles.mediaContainer}>
                    <span className={styles.mediaIcon}><a href="https://www.linkedin.com/in/rahim-rahim-031a69409/" target="_blank" 
                    rel="noopener noreferrer"><img src={fbIcon} alt='icon'/></a></span>
                    <span className={styles.mediaIcon}><a href="https://github.com/rahim-011" target="_blank" 
                    rel="noopener noreferrer"><img src={githubIcon} alt='icon'/></a></span>
                    <span className={styles.mediaIcon}><a href="https://www.instagram.com/rahim.1i/?hl=en" target="_blank" 
                    rel="noopener noreferrer"><img src={igIcon} alt='icon' /></a></span>
                    <span className={styles.mediaIcon}><a href="https://www.linkedin.com/in/rahim-rahim-031a69409/" target="_blank" 
                    rel="noopener noreferrer"><img src={inIcon} alt='icon'/></a></span>
                </div>
            </div>
        </div>
    );
}