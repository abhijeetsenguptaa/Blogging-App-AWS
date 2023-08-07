import React from 'react'
import { Link } from 'react-router-dom'


export default function ButtonsOnNavBar(props) {
    return (
        <>
            <Link to={props.link}><div className='border rounded bg-black text-white p-2 m-2 hover:cursor-pointer'>
                <button onClick={props.handleClick}>{props.name}</button>
            </div></Link>
        </>

    )
}
