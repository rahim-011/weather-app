import { useEffect, useState } from 'react'
import styles from '../styles/searchBar.module.css'

import {RefreshCcw,MapPin} from 'lucide-react'
import { cities } from '../../../backend/models/countries';

export default function SearchBar({setCity}){

    const [searchInput,setSearchInput] = useState('');
    const [inputError,setInputError] = useState('');
    const [filtredSuggestions,setFiltredSuggestions] = useState([]);
    const [cursor,setCursor] = useState(-1)


    const handleClick = () =>{
        setInputError('')
        if (searchInput.trim() == ''){
            setInputError('Please enter a city!')
            setInputError('');
            return
        }
        if (!cities.some(city =>(
            city.toLowerCase() === searchInput.toLowerCase()))){
                return setInputError('City not found!')
            }
        setCity(searchInput.trim());
        setSearchInput('');
    }

    const handleKeyDown = (e) =>{
        if (e.key === 'ArrowUp'){
            e.preventDefault();
            setCursor(prevCursor =>
                prevCursor > 0 ? prevCursor - 1 : prevCursor
            )
        }
        else if (e.key === 'ArrowDown'){
            e.preventDefault();
            setCursor(prevCursor =>
                prevCursor < filtredSuggestions.length -1 ? prevCursor + 1 : prevCursor
            )
        }
        else if (e.key === 'Enter'){
            e.preventDefault();
            if (cursor >= 0 && cursor < filtredSuggestions.length){
                handleSuggestionClick(filtredSuggestions[cursor])
            }
            else {
                handleClick();
            }
        }
        else if (e.key === 'Escape'){
            e.preventDefault();
            setCursor(-1);
            setFiltredSuggestions([])
        }
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        handleClick();
    }

    const handleSuggestionClick = (suggestCity) =>{
        setCity(suggestCity);
        setSearchInput(suggestCity);
        setFiltredSuggestions([]);
    }



    useEffect(()=>{
        if (cursor>0){
            const selectedItem = document.querySelector(`.${styles.suggestionItem}.${styles.active}`)

            if (selectedItem){
                selectedItem.scrollIntoView({
                    behavior:'smooth',
                    block:'nearest'
                })
            }
        }
    },[cursor])

    const isShown  = filtredSuggestions.length > 0
    const showClass = isShown ? styles.showList : '';
    return(
        <div className={styles.searchContainer}>
            <div className={`${styles.searchBox} ${inputError ? styles.isError : ''} ${showClass}`}>
                <form onSubmit={handleSubmit}>
                    <input id="searched" type='search' placeholder="Search for cities" className={styles.input} spellCheck="false" 
                    autoComplete="off" onChange={(e)=>
                    { 
                        const value = e.target.value.toLowerCase();
                        setSearchInput(value)
                        if (inputError) setInputError('')
                        if (value.length >=2){
                            const suggestions = cities.filter((city)=>(
                                city.toLowerCase().startsWith(value)
                            ))
                            setFiltredSuggestions(suggestions);
                        }
                        else {
                            setFiltredSuggestions([])
                        }   
                    }     
                    } onKeyDown={handleKeyDown} value={searchInput} onBlur={()=>{
                        setTimeout(()=> setFiltredSuggestions([]),100)
                    }}></input>
                    {inputError && <span className={styles.error}>{inputError}</span>}
                </form>
                <MapPin size={20} style={{ color: 'var(--DARKER-MEDIUM)', opacity: 0.7 ,margin:'0 10px'}} />
                {isShown &&<ul className={`${styles.suggestionsContainer} ${showClass}`}>
                    {filtredSuggestions.map((suggestion,index) =>(
                        <li className={`${styles.suggestionItem} ${index == cursor ? styles.active : ''}`} onClick={()=>handleSuggestionClick(suggestion)} key={index} ><MapPin size={16} strokeWidth={2.5}/>{suggestion}</li>   
                    ))}                  
                </ul>}
            </div>
            <div className={styles.refreshContainer}>
                <button className={styles.refreshBtn}onClick={handleClick}><RefreshCcw size={17} strokeWidth={2.5}/>Refresh</button>
            </div>
        </div>
    )
}