import styles from '../styles/display.module.css'
import fog from '../images/fog.png'
import { Icons } from '../constants/lucideIcons';
import Skeleton, { SkeletonTheme } from'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


export default function Display({weatherdata,isLoading}){
    if (isLoading){
        return(
            <SkeletonTheme 
                            baseColor="#1a1f2b" 
                            highlightColor="#2c3546" 
                            borderRadius="0.5rem"
            >
            <div className={styles.displayContainer}>
                <div className={styles.infoContainer}>
                    <div className={styles.cityInfo}>
                        <Skeleton width={129} height={57} ></Skeleton>
                        <Skeleton width={133} height={17} style={{marginTop:'10px'}}></Skeleton>
                    </div>
                    <div className={styles.tempInfo}>
                        <Skeleton width={73} height={52} style={{ marginTop: '15px' }}></Skeleton>
                    </div>
                </div>
                <div className={styles.imgWrapper}>
                    <Skeleton circle width={150} height={150}></Skeleton>
                </div>
        </div>
        </SkeletonTheme>
        )
    }
    if (!weatherdata || !weatherdata.main) return null;
    const {main,name,weather} = weatherdata;
    const {humidity,temp} = main;
    const weatherConditions = weather[0].main;
    return (
        <div className={styles.displayContainer}>
            <div className={styles.infoContainer}>
                <div className={styles.cityInfo}>
                    <h2>{name.split(' ')[0]}</h2>
                    <span className={styles.humidity}>Humidity level: {humidity}%</span>
                </div>
                <div className={styles.tempInfo}>
                    <span className={styles.temp}>{Math.round(temp)}°</span>
                </div>
            </div>
            <div className={styles.imgWrapper}>
                <img src={Icons[weatherConditions]} alt={`${weatherConditions} icon`}></img>
            </div>
        </div>
    )
}