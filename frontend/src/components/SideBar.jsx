import styles from '../styles/sideBar.module.css'
import Clouds from '../images/clouds.png'
import { useEffect } from 'react'
import { Icons } from '../constants/lucideIcons'
import { Fragment } from 'react'
import Skeleton from 'react-loading-skeleton'
import { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


export default function SideBar({forecastdata,isLoading}){
    const skeletonArray = Array(5).fill(null);
    if (isLoading) {
        return (
        <div className={styles.sideBarContainer}>
            <div className={styles.title}>
                <h3>5-DAY FORECAST</h3>
            </div>
            <div className={styles.weeklyInfoContainer}>
                <SkeletonTheme 
                            baseColor="#1a1f2b" 
                            highlightColor="#2c3546" 
                            borderRadius="0.5rem"
                            >
                {skeletonArray.map((_, index) => (
                        <div className={styles.dayInfoContainer} key={index}>
                            <Skeleton width={80} height={15} />
                            <Skeleton circle width={38} height={38} />
                            <Skeleton width={60} height={12} />
                            <Skeleton width={60} height={18} />
                        </div>
                ))}
                </SkeletonTheme>
            </div>
        </div>
    );
}

    if (!forecastdata ||!forecastdata.list) return null;

    const date = new Date();
    const currentDayName = date.toLocaleDateString('en-US',{weekday:'long'})

    let dailyForecast = [];
    if (forecastdata.list && forecastdata){
        for(let i=0;i<forecastdata.list.length;i+=8){
            const data = forecastdata.list[i];
            dailyForecast.push({
            dayName: new Date(data.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' }),
            temp: Math.round(data.main.temp),
            feels_like: Math.round(data.main.feels_like),
            condition: data.weather[0].main,
            humidity: data.main.humidity,
            icon: Icons[data.weather[0].main]
            });
        }
    }

    



    return (
        <div className={styles.sideBarContainer}>
            <div className={styles.title}>
                <h3>5-DAY FORECAST</h3>
            </div>
            <div className={styles.weeklyInfoContainer}>
                {dailyForecast.slice(0,5).map((day,index) =>{
                    const isCurrentDay = day.dayName.toLowerCase() === currentDayName.toLocaleLowerCase();
                    return (
                
                            <div className={`${styles.dayInfoContainer} ${isCurrentDay ? styles.currentDay: ''}`} key={index}>
                                <span className={styles.day}>{day.dayName}</span>
                                <span className="weatherIcon"><img src={day.icon} alt={`${day.condition} icon`}/></span>
                                <span className={styles.weatherCondition}>{day.condition}</span>
                                <span className="weatherTemp">{day.temp}° / <span className={styles.darker}>{day.feels_like}°</span></span>
                            </div>
                    )})}
            </div>
        </div>
    )
}