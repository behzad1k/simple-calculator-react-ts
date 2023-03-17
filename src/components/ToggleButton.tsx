import React, { FC } from 'react';

interface props {
    theme:string
    setTheme: React.Dispatch<React.SetStateAction<any>>;
}
const ToggleButton: FC<props> = (props) =>{
    const toggleDarkClick = (e:React.MouseEvent<HTMLElement>,props:props) :void => {
        props.theme === "light" ? props.setTheme('dark') : props.setTheme('light')
    }
    return(
        <div className="toggle-theme-wrapper" onClick={(e:React.MouseEvent<HTMLElement>)=>
            toggleDarkClick(e,props)
        }>
            {props.theme === "light" ? '☀' : '🌒'}
        </div>
    )
}
export default ToggleButton;

