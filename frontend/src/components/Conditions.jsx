import styles from '../styles/conditions.module.css'
import {Thermometer,Eye,Gauge,Droplet,Wind,Cloud} from 'lucide-react'
import Skeleton, { SkeletonTheme } from'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'




export default function Conditions({weatherdata,isLoading}){
    const skeletonArray = Array(3).fill(null);
    if (isLoading) {
        return (
            <div className={styles.conditionsContainer}>
            <h4>WEATHER CONDITIONS</h4>
            <div className={styles.conditionsInfosContainer}>  
                <SkeletonTheme 
                            baseColor="#1a1f2b" 
                            highlightColor="#2c3546"
                            borderRadius="0.5rem"
                >
                        {skeletonArray.map((pair,index)=>(
                            <div className={styles.mainContainer} key={index}>{[1,2].map((condition,conditionIndex)=>{
                                return (
                                    <div className={styles.envInfos} key={conditionIndex}>
                                        <span className={styles.info}>
                                        <Skeleton
                                        circle width={30} height={30} />
                                        <Skeleton width={104} height={27} />
                                        </span>
                                        <span className={styles.infoVal}>
                                        <Skeleton width={109} height={29} />
                                        </span>
                                    </div> 
                                )
                            })}               
                            </div>
                        ))}
                </SkeletonTheme>
            </div>
        </div>
    )
}
    if (!weatherdata || !weatherdata.main) return null;

    const {main,visibility,clouds,wind} = weatherdata;
    const {humidity,pressure,feels_like} = main;

    const weatherConditions = [
    {title:'Feels Like',Icon:Thermometer,value:`${feels_like}°C`},
    {title:'Clouds',Icon:Cloud,value:`${clouds.all}%`},
    {title:'Wind Speed',Icon:Wind,value:`${Math.round(wind.speed * 3.6)}km/h`},
    {title:'Humidity',Icon:Droplet,value:`${humidity}%`},
    {title:'Visibility',Icon:Eye,value:`${visibility/1000}km`},
    {title:'Pressure',Icon:Gauge,value:`${pressure}hPa`}
    ];

    return(
        <div className={styles.conditionsContainer}>
            <h4>WEATHER CONDITIONS</h4>
            <div className={styles.conditionsInfosContainer}>  
                    {weatherConditions.reduce((arr,el,i)=>{
                        if (i % 2 == 0){
                            arr.push(weatherConditions.slice(i,i+2))
                        }
                        return arr
                    },[])
                    
                        .map((pair,index)=>(
                            <div className={styles.mainContainer} key={index}>{pair.map((condition,conditionIndex)=>{
                                const LucideIcon = condition.Icon;
                                return (
                                    <div className={styles.envInfos} key={conditionIndex}>
                                        <span className={styles.info}><LucideIcon className={styles.lucideIcon} size={30} strokeWidth={2.7} style={{color:'var(--ACCENT-LIGHT)'}}/>{condition.title}</span>
                                        <span className={styles.infoVal}>{condition.value}</span>
                                    </div> 
                                )
                            })}               
                            </div>
                        ))
                    }
            </div>
        </div>
    )
}