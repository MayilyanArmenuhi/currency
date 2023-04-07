import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getCurrencyURL } from '../../core/constants'
import Loading from '../common/Loading'
import './Details.css'
import { renderChangePercent } from '../../core/helpers'
import Charter from '../charter'

const Details = () => {
    const [currency, setCurrency] = useState({})
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [isShowCharter, setIsShowCharter] = useState(false)
    const params = useParams();

    const fetchCurrencyInfo = ()=>{
        const { id } = params
        const url = getCurrencyURL(id);
        setLoading(true)
        fetch(url).then(res => {
            return res.json()
        }).then(result => {
            setLoading(false)
            setCurrency(result[0])
        }).catch((err)=>{
            setLoading(false);
            setError(err.message)
        })
    }

    useEffect(() => {
     fetchCurrencyInfo()
    }, [params.id])

    if(loading){
        return <div className='loading-container'><Loading/></div>
    }
    if(error){
        return <div>Error</div>
    }
    return (
        <>
        {
            isShowCharter && <Charter setIsShowCharter={setIsShowCharter}/>
        }
        <div className="Detail">
        <h1 className="Detail-heading">
            <img src={currency.image} alt="" onClick={(e)=>{
                e.stopPropagation()
                setIsShowCharter((prev)=>!prev)
            }}/>
            {currency.name} ({currency.symbol})
        </h1>

        <div className="Detail-container">
            <div className="Detail-item">
                Price
                <span className="Detail-value">
                    $ {currency.current_price}
                </span>
            </div>
        </div>
        <div className="Detail-container">
            <div className="Detail-item">
                Rank
                <span className="Detail-value">
                    {currency.market_cap_rank}
                </span>
            </div>
        </div>
        <div className="Detail-container">
            <div className="Detail-item">
                Price Change Percentage 24h
                <span className="Detail-value">
                    {renderChangePercent(
                        currency.price_change_percentage_24h
                    )}
                </span>
            </div>
        </div>
        <div className="Detail-container">
            <div className="Detail-item">
                24H Change
                <span className="Detail-value">
                    $ {currency.price_change_24h}
                </span>
            </div>
        </div>
        <div className="Detail-container">
            <div className="Detail-item">
                <span className="Detail-title">Market cap</span>
                <span className="Detail-dollar">$</span>
                {currency.market_cap}
            </div>
        </div>
        <div className="Detail-container">
            <div className="Detail-item">
                <span className="Detail-title">Total supply</span>
                {currency.total_supply}
            </div>
        </div>
    </div>
        </>
    )
}
export default Details