import React, { FC } from 'react';
import ButtonType from '../types/ButtonType';

const SingleButton: FC<ButtonType> = (props) =>{
    return(
        <button className={`btn ${props.name}`}
            onClick={(e) => props.clickFunc(props.value)}
            value={props.value}
        >
            {props.value}
        </button>
    )
}
export default SingleButton

