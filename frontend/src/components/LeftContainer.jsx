import Display from "./Display";
import SearchBar from "./SearchBar";
import styles from '../styles/leftContainer.module.css'
import Overview from "./Overview";


export default function LeftContainer({weatherdata,forecastdata,setCity,isLoading}){
    return (
        <div className={styles.leftContainer}>
            <SearchBar setCity={setCity}/>
            <Display weatherdata={weatherdata} isLoading={isLoading}/>
            <Overview forecastdata={forecastdata} isLoading={isLoading}/>
        </div>
    )
}