import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../core/constants";
import Loading from "./Loading";
import './Search.css';

const Search = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [currencies, setCurrencies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate()

    const fetchCurrencies = () => {
        fetch(API_URL).then((res) => {
            return res.json()
        }).then((result) => {
            setCurrencies(result)
        })
    }

    useEffect(() => {
        fetchCurrencies()
    }, [])

    const handleChangeInput = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        if (!query) {
            setSearchResult([]);
            return null
        }
        setIsLoading(true)
        const queryChars = query.split('');

        setTimeout(() => {
            const result = currencies.filter(el => {
                return queryChars.every(char => el.id.includes(char))
            })
            setSearchResult(result)
            setIsLoading(false)
        }, 500)
    }

    const renderSearchResult = () => {
        if (!searchQuery) {
            return null
        }
        if (searchResult.length) {
            return <div className="Search-result-container">
                {searchResult.map(result =>
                    <div 
                    key={result.id} 
                    className="Search-result"
                    onClick={()=>{
                        navigate(`/currency/${result.id}`)
                        setSearchQuery('')
                        setSearchResult([])
                    }}
                    >
                        {result.name} ({result.symbol})
                    </div>
                )}
            </div>
        }
        if (!isLoading) {
            return (
                <div className="Search-result-container">
                    <div className="Search-no-result">
                        No results found.
                    </div>
                </div>
            )
        }
    }

    return (
        <div className='Search'>
            <div>
                <span className="Search-icon" />
                <input
                    type="text"
                    className="Search-input"
                    placeholder="Currency name"
                    value={searchQuery}
                    onChange={handleChangeInput}
                />
                {
                    isLoading &&
                    <div className="Search-loading">
                        <Loading
                            width="12px"
                            height="12px"
                        />
                    </div>}
            </div>
            {renderSearchResult()}
        </div>
    )
}
export default Search