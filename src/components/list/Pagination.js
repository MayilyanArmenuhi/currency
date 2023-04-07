import React from "react";
import './Pagination.css'

const Pagination = ({page, totalPages, handleChangePagination}) =>{
    return (
        <div className='Pagination'>
            <button 
            className = 'Pagination-button'
            onClick={()=>handleChangePagination(false)}
            disabled={page === 1}
            >
            &larr;
            </button>
            <span
            className = 'Pagination-info'
            >
             page <span>{page}</span> of <b>{totalPages}</b>   
            </span>
            <button
            className='Pagination-button'
            onClick={()=>handleChangePagination(true)}
            disabled={page === totalPages}
            >
             &rarr;
            </button>
        </div>
    )
}
export default Pagination