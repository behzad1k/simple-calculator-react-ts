import React, { FC } from 'react';
import {updateSequence} from "../Store/features/sequenceSlice"
import {showAnswer} from "../Store/features/answerSlice"
import {ButtonTypes} from '../Types/ButtonTypes';
import '../Styles/Button.css'
import {useDispatch, useSelector} from "react-redux";
import {store} from "../Store/store";

export const SingleButton: FC<ButtonTypes> = ({name,color,value,background}) =>{
    const dispatch = useDispatch();
    const sequence = useSelector((state: ReturnType<typeof store.getState>) => state.sequence.value);
    const answer = useSelector((state: ReturnType<typeof store.getState>) => state.answer.value);
    /*
        receives a string and returns its last character
     */
    const getLastChar = (str:string) : string => {
        return str.charAt(str.length - 1);
    }
    /*
        checks if a value of any is cast-able to number (is types-aside a number or not)
     */
    const isNumber = (value: string | number): boolean =>
    {
        return ((value != null) &&
            (value !== '') &&
            !isNaN(Number(value.toString())));
    }
    /*
        receives a string of mixed operands and numbers and returns the last full number of the string
     */
    const getPostFullNum = (str:string) : string => {
        let i = 0;
        let newStr = ''
        while(isNumber(str.charAt(i)) || str.charAt(i) === '-'|| str.charAt(i) === '.'){
            newStr += str.charAt(i);
            i++;
        }
        return newStr;
    }
    /*
        receives a string of mixed operands and numbers and returns the last full number of the string
     */
    const getPreFullNum = (str:string) : string => {
        let i = str.length -1;
        let newStr = ''
        while(isNumber(str.charAt(i)) || str.charAt(i) === '-'|| str.charAt(i) === '.'){
            newStr += str.charAt(i);
            i--;
        }
        // @ts-ignore
        return [...newStr].reverse().join("");
    }
    /*
        receives a sequence of all operands and numbers combinations and outputs a string of only +,- and remaining numbers
     */
    const calculateMulDivPercent = (sequence:string) :string =>{
        let seq = sequence
        for (let i = 0; i < sequence.length; i++) {
            let postNum:string = '';
            let preNum: string = '';
            if (seq.charAt(i) === '') break
            switch (seq.charAt(i)) {
                case ('*'):
                    preNum = getPreFullNum(seq.slice(0,i))
                    postNum = getPostFullNum(seq.slice(i+1,seq.length))
                    const mul:number = Number(preNum) * Number(postNum);
                    seq = seq.slice(0,i-preNum.length) + mul.toString() + seq.slice(i+postNum.length+1,seq.length)
                    i = seq.slice(0,i-preNum.length).length + mul.toString().length -1
                    break;
                case ('/'):
                    preNum= getPreFullNum(seq.slice(0,i))
                    postNum = getPostFullNum(seq.slice(i+1,seq.length))
                    const div:number = Number(preNum) / Number(postNum);
                    seq = seq.slice(0,i-preNum.length) + div.toString() + seq.slice(i+postNum.length+1,seq.length)
                    i = seq.slice(0,i-preNum.length).length + div.toString().length -1
                    break;
                case ('%'):
                    preNum= getPreFullNum(seq.slice(0,i))
                    const percent:number = Number(preNum) / 100;
                    seq = seq.slice(0,i-preNum.length) + percent.toString() + seq.slice(i+postNum.length+1,seq.length)
                    i = seq.slice(0,i-preNum.length).length + percent.toString().length -1
                    break;
                default:
                    break;
            }
        }
        return seq;
    }
    /*
        receives one string of numbers and + and - operands and outputs the calculated sequence result
     */
    const calculateAddSub = (seq:string):number => {
        console.log(seq)
        for (let i = 0; i < seq.length; i++) {
            let postNum:string = '';
            let preNum: string = '';
            switch (seq.charAt(i)) {
                case('+'):
                    preNum= getPreFullNum(seq.slice(0,i))
                    postNum = getPostFullNum(seq.slice(i+1,seq.length))
                    const add = Number(preNum) + Number(postNum);
                    seq = add.toString() + seq.slice(i+postNum.length+1,seq.length)
                    i = seq.slice(0,i-preNum.length).length + add.toString().length -1
                    break;
                default:
                    break;
            }
        }
        return Number(seq);
    }
    const buttonClickHandler = (event: React.MouseEvent<HTMLButtonElement>, value: any) => {
        if (getLastChar(sequence) === '=' && value.value !== 'AC'&& value.value !== 'C'){
            dispatch(updateSequence({value: 'AC'}))
            dispatch(updateSequence({value: answer.toString() + value.value}))
            dispatch(showAnswer)
            return
        }
        if(value.value === '='){
            dispatch(updateSequence(value))
            /*
                Multiple, divide and percentage operands are calculated first and the add and subtract operands afterwards.
                The final answer gets dispatched
             */
            dispatch(showAnswer({value:calculateAddSub(calculateMulDivPercent(sequence))}))
            return
        }
        /*
            Validations are done here
         */
        if((sequence === '' &&
            (isNumber(getLastChar(sequence)) || isNumber(value.value))) ||
            value.value === 'C'||
            sequence === '' && value.value === '+'||
            sequence === '' && value.value === '-'
        )
            dispatch(updateSequence(value))
        else if(value.value === 'AC'){
            dispatch(updateSequence(value))
            dispatch(showAnswer({value:0}))
        }
        else if((!isNumber(getLastChar(sequence)) && !isNumber(value.value) && value.value !== '-' && value.value !== '.') ||
            (sequence === '' && value.value === '*') ||
            (sequence === '' && value.value === '/') ||
            (sequence === '' && value.value === '%')){
            alert("illegal operation")
        }
        else
            dispatch(updateSequence(value))
    }
    return(
        <button className={`btn ${name}`}
                style={{ backgroundColor: background,color: color}}
                onClick={(e) => buttonClickHandler(e, {value:value})}
                value={value}
        >
            {value}
        </button>
    )
}

