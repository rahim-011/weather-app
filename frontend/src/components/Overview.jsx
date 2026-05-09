import styles from '../styles/overview.module.css'
import '../index.css'
import { Icons } from '../constants/lucideIcons';
import { Fragment } from 'react';
import Skeleton, { SkeletonTheme } from'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'



export default function Overview({forecastdata,isLoading}){
    const skeletonArray = Array(8).fill(null);
    if (isLoading) {
        return (
            <div className={styles.overviewContainer}>
            <h3>TODAY'S FORECAST</h3>
            <div className={styles.daysInfosContainer}>
                <SkeletonTheme 
                            baseColor="#1a1f2b" 
                            highlightColor="#2c3546" 
                            borderRadius="0.5rem"
                >
            {skeletonArray.map((_,index)=>{
                return (
                    <div className={styles.dayInfos} key={index}>
                        <Skeleton height={20} width={65}></Skeleton>
                        <div className="weatherIcon"><Skeleton circle height={44} width={40}></Skeleton></div>
                        <Skeleton height={20} width={27}></Skeleton>
                    </div>
                    )})}
                    </SkeletonTheme>
                </div>
        </div>
        )
    }
    if (!forecastdata || !forecastdata.list) return ;
    let dayForecastData = [];
    const date = new Date();
    const currentHour = date.getHours();

    const convertToHours = (timeStr) =>{
        if (!timeStr) return 0;
        let [time,change]  = timeStr.split(' ');
        let hour = parseInt(time.split(':')[0] ,10) ;

        if (change.toUpperCase() === 'PM' && hour < 12) hour+= 12;
        else if (change.toUpperCase() === 'AM' && hour === 12) hour = 0;
        
        return hour;
    }


    for (let i=0 ; i<8;i++){
        const data = forecastdata.list[i];
        dayForecastData.push({
            temp: Math.round(data.main.temp),
            icon:Icons[data.weather[0].main] || sunIcon,
            description:data.weather[0].description,
            time: new Date(data.dt_txt).toLocaleTimeString('en-US',{
                hour:'numeric',
                minute:'2-digit',
                hour12:true
            })
        })
    }
    return (
        <div className={styles.overviewContainer}>
            <h3>TODAY'S FORECAST</h3>
            <div className={styles.daysInfosContainer}>
            {dayForecastData.map((item,index)=>{
                const convertedHour = convertToHours(item.time);
                const isCurrent = (currentHour >= convertedHour) && (currentHour < convertedHour + 3);
                return (
                    <div className={`${styles.dayInfos} ${isCurrent ? styles.currentDay : ''}`} key={index}>
                        <div>{item.time}</div>
                        <div className="weatherIcon"><img src={item.icon} alt={`${item.description} icon`}></img></div>
                        <div className='weatherTemp'>{item.temp}°</div>
                    </div>
                    )})}
                </div>
        </div>
    )
}