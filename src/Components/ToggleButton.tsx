import React, { FC } from 'react';
import {useDispatch} from "react-redux";
import {toggleTheme} from "../Store/features/themeSlice";
import '../Styles/ToggleButton.css'
export const ToggleButton: FC = () =>{
    const dispatch = useDispatch();
    return(
        <div className="toggle-theme-wrapper">
            <span>☀️</span>
            <label className="toggle-theme" htmlFor="checkbox">
                <input
                    type="checkbox"
                    id="checkbox"
                    onClick={()=>
                        dispatch(toggleTheme())
                    }
                />
                <div className="slider round"></div>
            </label>
            <span>🌒</span>
        </div>
    )
}

