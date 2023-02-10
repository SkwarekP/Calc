import classes from "./Keypad.module.scss";
import {KeyPad} from "../App";
import React from "react";


interface Props {
    idTheme: number;
    keyPad: KeyPad[];
    currentVal: (currVal: string) => void;
    onSendOperation: (currOperation: string) => void;
    onSendIsEqual: () => void;
    onSendDelMark: () => void;
    onSendPointMark: () => void;
}

function Keypad({idTheme, keyPad, currentVal, onSendOperation, onSendIsEqual, onSendDelMark, onSendPointMark}: Props) {


    const digitsR1 = keyPad.filter(item => item.digits)
        .map(item => item.digits)[0]!
        .map(item => item).filter(item => item.row === 1);

    const operationsR1 = keyPad.filter(item => item.operations)
        .map(item => item.operations)[0]!
        .filter(item => item.row === 1);

    const digitsR2 = keyPad.filter(item => item.digits)
        .map(item => item.digits)[0]!
        .map(item => item).filter(item => item.row === 2);

    const operationsR2 = keyPad.filter(item => item.operations)
        .map(item => item.operations)[0]!
        .filter(item => item.row === 2);

    const digitsR3 = keyPad.filter(item => item.digits)
        .map(item => item.digits)[0]!
        .map(item => item).filter(item => item.row === 3);

    const operationsR3 = keyPad.filter(item => item.operations)
        .map(item => item.operations)[0]!
        .filter(item => item.row === 3);

    const digitsR4 = keyPad.filter(item => item.digits)
        .map(item => item.digits)[0]!
        .map(item => item).filter(item => item.row === 4);

    const operationsR4 = keyPad.filter(item => item.operations)
        .map(item => item.operations)[0]!
        .filter(item => item.row === 4);

    const operationsR5 = keyPad.filter(item => item.operations)
        .map(item => item.operations)[0]!
        .filter(item => item.row === 5);

    const sendDigit = (e: React.MouseEvent<HTMLButtonElement>) => {
        currentVal(e.currentTarget.value)

    }
    const sendOperation = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (e.currentTarget.value === "point") {
            onSendPointMark();
        } else onSendOperation(e.currentTarget.value);

    }


    const sendEqual = (): void => {
        onSendIsEqual();
    }

    const sendDelMark = () => {
        onSendDelMark();
    }


    return (
        <div className={classes.keypad__container}
             style={idTheme === 2 ? {background: "hsl(0, 5%, 81%)"} :
                 idTheme === 3 ? {background: "hsl(268, 71%, 12%)"} :
                     {background: "hsl(223, 31%, 20%)"}}>
            <div className={classes.row__flex}>
                {digitsR1.map(item => (
                    <button key={item.id}
                            value={item.keyValue}
                            className={idTheme === 3 ? classes.keypad__digit__op_arytmetic_theme3 : classes.keypad__digit__op_arytmetic}
                            onClick={sendDigit}>{item.keyValue}</button>
                ))}
                {operationsR1.map(item => (
                    <button key={item.id}
                            value={item.type}
                            onClick={sendDelMark}
                            className={` ${classes.keypad__digit__op_arytmetic} 
                            ${idTheme === 2 ? classes.keypad__del_theme2 :
                                idTheme === 3 ? classes.keypad__del_theme3 :
                                    classes.keypad__del}`}>{item.keyValue}
                    </button>
                ))}
            </div>
            <div className={classes.row__flex}>
                {digitsR2.map(item => (
                    <button key={item.id}
                            value={item.keyValue}
                            className={idTheme === 3 ? classes.keypad__digit__op_arytmetic_theme3 : classes.keypad__digit__op_arytmetic}
                            onClick={sendDigit}>{item.keyValue}</button>
                ))}
                {operationsR2.map(item => (
                    <button
                        key={item.id}
                        value={item.type}
                        onClick={sendOperation}
                        className={idTheme === 3 ? classes.keypad__digit__op_arytmetic_theme3 : classes.keypad__digit__op_arytmetic}>{item.keyValue}
                    </button>
                ))}
            </div>
            <div className={classes.row__flex}>
                {digitsR3.map(item => (
                    <button key={item.id}
                            value={item.keyValue}
                            className={idTheme === 3 ? classes.keypad__digit__op_arytmetic_theme3 : classes.keypad__digit__op_arytmetic}
                            onClick={sendDigit}>{item.keyValue}</button>
                ))}
                {operationsR3.map(item => (
                    <button
                        value={item.type}
                        onClick={sendOperation}
                        key={item.id}
                        className={idTheme === 3 ? classes.keypad__digit__op_arytmetic_theme3 : classes.keypad__digit__op_arytmetic}>{item.keyValue}
                    </button>
                ))}
            </div>
            <div className={classes.row__flex}>
                {digitsR4.map(item => (
                    <button key={item.id}
                            value={item.keyValue}
                            className={idTheme === 3 ? classes.keypad__digit__op_arytmetic_theme3 : classes.keypad__digit__op_arytmetic}
                            onClick={sendDigit}>{item.keyValue}</button>
                ))}
                {operationsR4.map(item => (
                    <button
                        value={item.type}
                        onClick={sendOperation}
                        key={item.id}
                        className={idTheme === 3 ? classes.keypad__digit__op_arytmetic_theme3 : classes.keypad__digit__op_arytmetic}>{item.keyValue}
                    </button>
                ))}
            </div>
            <div className={classes.row__flex}>
                {operationsR5.map(item => {
                        if (item.type === "clear") {
                            return <button
                                value={item.type}
                                onClick={sendOperation}
                                key={item.id} className={`${classes.keypad__reset}
                    ${idTheme === 2 ? classes.keypad__del_theme2 :
                                idTheme === 3 ? classes.keypad__del_theme3 :
                                    classes.keypad__del}`}>{item.keyValue}</button>
                        } else return <button
                            value={item.type}
                            onClick={sendEqual}
                            key={item.id} className={`${classes.keypad__equal} 
                       ${idTheme === 2 ? classes.keypad__equal__theme2 : idTheme === 3 ? classes.keypad__equal__theme3 : classes.keypad__equal}`}>
                            {item.keyValue} </button>

                    }
                )}
            </div>
        </div>
    )
}

export default Keypad;