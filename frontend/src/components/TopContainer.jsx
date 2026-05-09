import LeftContainer from "./LeftContainer";
import SideBar from "./SideBar";
import styles from '../styles/topContainer.module.css'


export default function TopContainer({setCity,weatherdata,forecastdata,setError,isLoading}){
    return (
        <div className={styles.topContainer}>
            <LeftContainer setCity={setCity} weatherdata={weatherdata} forecastdata={forecastdata} setError={setError} isLoading={isLoading}/>
            <SideBar setCity={setCity} weatherdata={weatherdata} forecastdata={forecastdata} isLoading={isLoading}/>
        </div>
    )
}