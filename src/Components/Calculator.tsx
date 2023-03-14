import React, { FC, ReactElement } from 'react';
import {SingleButton} from "./Button";
import {ButtonTypes} from '../Types/ButtonTypes';
import '../Styles/Calculator.css';
import { store } from "../Store/store";
import {useSelector} from 'react-redux'
const Calculator: FC = (): ReactElement => {
    const buttonGroups = useSelector((state: ReturnType<typeof store.getState>) => state.theme.buttonGroup);
    const theme = useSelector((state: ReturnType<typeof store.getState>) => state.theme.theme);
    const sequence = useSelector((state: ReturnType<typeof store.getState>) => state.sequence.value);
    const answer = useSelector((state: ReturnType<typeof store.getState>) => state.answer.value);
    return(
        <section className={`container ${theme}`}>
            <div className={"inputsContainer"}>
                <input className={`${theme}`} type="text" value={sequence}/>
                <input className={`${theme}`} type="text" value={answer} />
            </div>
            <div className={"buttonsContainer"}>
            {
                buttonGroups.map((buttonGroup: any) =>
                    <div>
                        {
                            buttonGroup.map((button : ButtonTypes) =>
                                <SingleButton name={button.name} color={button.color} value={button.value} background={button.background}/>
                            )
                        }
                    </div>
                )
            }
            </div>
        </section>
    )
}
export default Calculator;
