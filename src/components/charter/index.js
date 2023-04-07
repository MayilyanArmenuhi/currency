import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

const Charter = ({setIsShowCharter}) =>{
    const [charterData, setCharterData] = useState([]);
    const charterRef = useRef();

    const {id} = useParams()
    useEffect(()=>{
        fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=3`)
        .then(res =>{
            return res.json()
        }).then((result)=>{
            setCharterData(result.prices.map(el => el[1]))
        })    
    }, [])

    const options = useMemo(()=>{
        return {
            title: {
              text: 'Currency price chart'
            },
            series: [{
              data: charterData
            }]
          }
    }, [charterData])


    const handleOutSideClick = useCallback((e)=>{
        if(!charterRef.current.contains(e.target)){
            setIsShowCharter(false)
        }
    },[charterRef])

    useEffect(()=>{
        document.addEventListener('click', handleOutSideClick)
        return ()=>{
            document.removeEventListener('click', handleOutSideClick)
        }
    }, [handleOutSideClick])

    return (
        <div ref={charterRef}>
            <HighchartsReact 
            highcharts={Highcharts}
            options={options}
            />
        </div>
    )
}
export default Charter