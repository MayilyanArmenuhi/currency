import React, { useEffect, useMemo, useState } from "react";
import { API_URL } from "../../core/constants";
import Table from "./Table";
import Loading from "../common/Loading";
import './Table.css'
import Pagination from "./Pagination";
import { renderChangePercent } from "../../core/helpers";
import { useLocation, useNavigate } from "react-router-dom";

const totalPages = 5
const perPage = 20

const List = () => {
  const [currencies, setCurrencies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const {search} = useLocation();
  const navigate = useNavigate();

  const queryPage = useMemo(()=>{
    return +new URLSearchParams(search).get('page') || 1
  }, [search])

  useEffect(()=>{
    fetchCurrencies()
  }, [queryPage])

  useEffect(()=>{
    navigate(`/?page=${queryPage}`)
  }, [])

 const fetchCurrencies = () => {
    const url = `${API_URL}page=${queryPage}&per_page=${perPage}`
    setIsLoading(true)
    fetch(url).then(res => {
      if (res.status) {
        return res.json()
      }
      throw new Error('something went wrong')
    }).then((result) => {
      setIsLoading(false);
      setCurrencies(result)
    }).catch((err) => {
      setIsLoading(false);
      setError(err.message)
    })
  }

 const handleChangePagination = (isIncrement) => {
    const nextPage = queryPage + (isIncrement ? 1 : -1);
    navigate(`/?page=${nextPage}`)
  }

    if (isLoading) {
      return <div className="loading-container"><Loading /></div>
    }
    if (error) {
      return <div>{error}</div>
    }
    return (
      <>
        <Table
          currencies={currencies}
          renderChangePercent={renderChangePercent} />
        <Pagination
          page={queryPage}
          totalPages={totalPages}
          handleChangePagination={handleChangePagination}
        />
        </>
    )
  }
export default List