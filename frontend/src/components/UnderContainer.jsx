import Subscribe from "./Subscribe";
import Conditions from "./Conditions";
import styles from '../styles/underContainer.module.css'


export default function UnderContainer({weatherdata,isLoading}){
    return(
        <div className={styles.underContainer}>
            <Conditions weatherdata={weatherdata} isLoading={isLoading}/>
            <Subscribe/>
        </div>
    )
}