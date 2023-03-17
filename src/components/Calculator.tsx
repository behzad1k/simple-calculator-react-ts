import React, {FC, ReactElement, useState} from 'react';
import SingleButton from "./SingleButton";
const Calculator: FC = (): ReactElement => {

    const [answer,setAnswer] = useState(0);
    const [sequence,setSequence] = useState("");

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
        return ((value !== null) &&
            (value !== '') &&
            (value !== '.') &&
            !isNaN(Number(value.toString())));
    }
    /*
        receives a string of mixed operands and numbers and returns the last full number of the string
     */
    const getPostFullNum = (str:string) : string => {
        let i = 0;
        let newStr = ''
        while(isNumber(str.charAt(i)) || (i === 0 && str.charAt(i) === '-') ||str.charAt(i) === '.'){
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
        while(isNumber(str.charAt(i)) || str.charAt(i) === '.'){
            newStr += str.charAt(i);
            i--;
        }
        if (str.charAt(i) === '-') newStr += str.charAt(i);
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
                    if (Number(preNum) < 0 && Number(postNum) < 0)
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
                case('-'):
                    preNum= getPreFullNum(seq.slice(0,i))
                    postNum = getPostFullNum(seq.slice(i+1,seq.length))
                    const sub = Number(preNum) - Number(postNum);
                    seq = sub.toString() + seq.slice(i+postNum.length+1,seq.length)
                    i = seq.slice(0,i-preNum.length).length + sub.toString().length -1
                    break;
                default:
                    break;
            }
        }
        return Number(seq);
    }
    const validation = (value:string): boolean => {
        const lastChar = getLastChar(sequence)
        if(value === '+' || value === '-' || value === '.' || isNumber(value))
            return true;
        else if(value === '-' && !isNumber(lastChar)){

        }
        else if(!isNumber(value) && !isNumber(lastChar)) {
            return false
        }
        return true
    }
    const defaultClick = (value:string) :void => {
        validation(value) ? setSequence(sequence + value) : alert('Invalid Operation')
    }
    const clearClick = () => {
        setSequence('')
        setAnswer(0)
    }
    const removeClick = () : void => {
        setSequence(sequence.substring(0,sequence.length - 1))
    }
    const equalClick = (value:string) :void => {
        setSequence(sequence + value)
        setAnswer(calculateAddSub(calculateMulDivPercent(sequence)))
        return ;
    }


    return(
        <section className={"container"}>
            <div className={"inputsContainer"}>
                <input type="text" value={sequence}/>
                <input type="text" value={answer} />
            </div>
            <div className={"buttonsContainer"}>
                    <SingleButton name={'clear'} value={'AC'} clickFunc={clearClick}/>
                    <SingleButton name={'clear'} value={'C'} clickFunc={removeClick}/>
                    <SingleButton name={'operator'} value={'/'} clickFunc={defaultClick}/>
                    <SingleButton name={'operator'} value={'%'} clickFunc={defaultClick}/>
                    <SingleButton name={'nine'} value={'9'} clickFunc={defaultClick}/>
                    <SingleButton name={'eight'} value={'8'} clickFunc={defaultClick}/>
                    <SingleButton name={'seven'} value={'7'} clickFunc={defaultClick}/>
                    <SingleButton name={'operator'} value={'-'} clickFunc={defaultClick}/>
                    <SingleButton name={'six'} value={'6'} clickFunc={defaultClick}/>
                    <SingleButton name={'five'} value={'5'} clickFunc={defaultClick}/>
                    <SingleButton name={'four'} value={'4'} clickFunc={defaultClick}/>
                    <SingleButton name={'operator'} value={'*'} clickFunc={defaultClick}/>
                    <SingleButton name={'one'} value={'1'} clickFunc={defaultClick}/>
                    <SingleButton name={'two'} value={'2'} clickFunc={defaultClick}/>
                    <SingleButton name={'three'} value={'3'} clickFunc={defaultClick}/>
                    <SingleButton name={'operator'} value={'+'} clickFunc={defaultClick}/>
                    <SingleButton name={'zero'} value={'0'} clickFunc={defaultClick}/>
                    <SingleButton name={'dot'} value={'.'} clickFunc={defaultClick}/>
                    <SingleButton name={'equal'} value={'='} clickFunc={equalClick}/>
            </div>
        </section>
    )
}
export default Calculator;
