import React from 'react'
import './button.css'

export default function(props){

    let classes = 'button '
    classes += props.operation ? 'operation' : ''
    classes += props.double ? 'double' : ''
    classes += props.triple ? 'triple' : ''

    return(
        <button 
            className={classes}
            onClick={e => props.click && props.click(props.label)}
        >
            {props.label}
        </button>
    )
}